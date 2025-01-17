import { Link } from 'react-router-dom'
import './chatList.css'
import { useQuery } from '@tanstack/react-query'
import DeleteChat from '../deleteChat/DeleteChat'

const ChatList = () => {

  const { isPending, error, data } = useQuery({
    queryKey: ['userChats'],
    queryFn: () =>
      fetch(`${import.meta.env.VITE_API_URL}/api/userchats`, {
        credentials: 'include'
      }).then((res) =>
        res.json(),
      ),
  })

  return (
    <div className='chatList'>
        <span className='title'>DASHBOARD</span>
        <Link to='/dashboard'>Create New Chat</Link>
        <Link to='/'>Explore</Link>
        <Link to='/'>Contact</Link>
        <hr/>
        <span className='title'>RECENT CHATS</span>
        
        <div className="list">
          {isPending
            ? "Loading..."
            : error
            ? "Something went wrong!"
            : data?.map((chat) => (
                <Link to={`/dashboard/chats/${chat._id}`} key={chat._id}>
                  {chat.title}
                  <DeleteChat data={chat}/>
                </Link>
                
              ))}
        </div>
        <div className="upgrade">
            <img src='/logo.png'></img>
            <div className="texts">
                <span>Upgrade to Lama AI Pro</span>
                <span>Get unlimited access to all features</span>
            </div>
        </div>    
    </div>
    
    
  )
}

export default ChatList