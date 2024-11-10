import { useEffect, useRef, useState } from 'react';
import './newPrompt.css'
import Upload from '../upload/Upload';
import { IKImage } from 'imagekitio-react';
import model from '../../lib/gemini';
import Markdown from 'react-markdown';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const NewPrompt = ({data}) => {
  const endRef = useRef(null);
  const formRef = useRef(null);
  const [prompt, setPrompt] = useState("");
  const [answer, setAnswer] = useState("");
  const [img, setImg] = useState({
    isLoading: false,
    error: "",
    dbData: {},
    aiData: {},
  });
  
  const chat = model.startChat({
    history: [ 
      {
        role: "user",
        parts: [{ text: "Hello" }],
      },
      {
        role: "model",
        parts: [{ text: "Great to meet you. What would you like to know?" }],
      },
    ],
  });

  useEffect(() => {
    endRef.current.scrollIntoView({behavior: 'smooth'})
  }, [data, prompt, answer, img.dbData]);

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: () => {
      
      return fetch(`${import.meta.env.VITE_API_URL}/api/chats/${data._id}`, {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          question: prompt.length ? prompt : undefined,
          answer,
          img: img.dbData?.filePath || undefined,
        }),
      }).then((res) => res.json());
    },
    onSuccess: () => {
      queryClient
        .invalidateQueries({ queryKey: ["chat", data._id] })
        .then(() => {
          formRef.current.reset();
          setPrompt("");
          setAnswer("");
          setImg({
            isLoading: false,
            error: "",
            dbData: {},
            aiData: {},
          });
        });
    },
    onError: (err) => {
      console.log(err);
    },
  });

  const add = async (prompt, isInitial) => {
    if (!isInitial) setPrompt(prompt);
    
    try {

      const result = await chat.sendMessageStream(Object.entries(img.aiData).length ? [img.aiData, prompt] : [prompt]);

      let accumulatedText = '';    
      for await (const chunk of result.stream) {
        const chunkText = chunk.text();
        accumulatedText += chunkText;
        setAnswer(accumulatedText);

      }

      mutation.mutate();

    } catch (err) {
      console.log(err);
      
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const prompt = e.target.chattext.value;
    
    if (!prompt) { return; }

    add(prompt);
  };


  // IN PRODUCTION WE DON'T NEED IT
  const hasRun = useRef(false);

  useEffect(() => {
    if (!hasRun.current) {
      if (data?.history?.length === 1) {
        add(data.history[0].parts[0].text, true);
      }
    }
    hasRun.current = true;
  }, []);
  
  return (
    <>
    {/* ADD NEW CHAT */}
    {img.isLoading && <div className="">Loading...</div>}
      {img.dbData?.filePath && (
        <IKImage
          urlEndpoint={import.meta.env.VITE_IMAGE_KIT_ENDPOINT}
          path={img.dbData?.filePath}
          width="380"
          transformation={[{ width: 380 }]}
        />
      )}

    {prompt && <div className="message user" >{prompt}</div>}
    {answer && <div className="message " ><Markdown>{answer}</Markdown></div>}

    <div className="endChat" ref={endRef}></div>
    <div className='newPrompt'>
        <form className='newForm' onSubmit={handleSubmit} ref={formRef}>
            <Upload setImg={setImg}/>
            <input type="file" id="file" name="file" hidden  />
            <input type="text" name='chattext'/>
            <button>
                <img src="/arrow.png" alt="" />
            </button>
        </form>
    </div>
    </>
  )
}

export default NewPrompt