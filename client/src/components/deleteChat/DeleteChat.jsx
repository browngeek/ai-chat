import { useState } from 'react';
import './deleteChat.css'
import { FaTrash } from 'react-icons/fa';


const DeleteChat = ({data}) => {
    //const [clicked, setClicked] = useState (null); // Track the clicked item

    const handleClick = () => {
      //setClicked(clicked === item ? null : item); // Toggle clicked state
      alert(`You clicked on ${data._id}`); // Action on click
    };
  
    return (
      <div className='deleteChat'>
        <p
          className="icon-container"
          style={{ display: 'inline-block', cursor: 'pointer', margin: '1px' }}
          onClick={() => handleClick()}
        >
          <FaTrash className="icon" />
          
        </p>
      </div>
    );
}

export default DeleteChat