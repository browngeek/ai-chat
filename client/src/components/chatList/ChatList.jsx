import { Link } from 'react-router-dom'
import './chatList.css'

const ChatList = () => {
  return (
    <div className='chatList'>
        <span className='title'>DASHBOARD</span>
        <Link to='/dashboard'>Create New Chat</Link>
        <Link to='/'>Explore</Link>
        <Link to='/'>Contact</Link>
        <hr/>
        <span className='title'>RECENT CHATS</span>
        
        <div className="list">
            <Link to='/'>Chat1</Link>
            <Link to='/'>Chat1</Link>
            <Link to='/'>Chat1</Link>
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