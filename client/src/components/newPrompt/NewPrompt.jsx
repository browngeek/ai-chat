import { useEffect, useRef, useState } from 'react';
import './newPrompt.css'
import Upload from '../upload/Upload';
import { IKImage } from 'imagekitio-react';
import model from '../../lib/gemini';
import Markdown from 'react-markdown';

const NewPrompt = () => {
  const endRef = useRef(null);
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
  }, [prompt, answer, img.dbData]);

  

  const add = async (prompt) => {
    setPrompt(prompt);
    
    const result = await chat.sendMessageStream(Object.entries(img.aiData).length ? [img.aiData, prompt] : [prompt]);

    let accumulatedText = '';    
    for await (const chunk of result.stream) {
      const chunkText = chunk.text();
      accumulatedText += chunkText;
      setAnswer(accumulatedText);

    }

    setImg({
      isLoading: false,
      error: "",
      dbData: {},
      aiData: {},
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const prompt = e.target.chattext.value;
    
    if (!prompt) { return; }

    add(prompt);
  };


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
        <form className='newForm' onSubmit={handleSubmit}>
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