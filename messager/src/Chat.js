import React, { useState } from 'react';

const Chat = ({ userId, selectedUser }) => {
  const [message, setMessage] = useState('');
  const [conversation, setConversation] = useState([]);

  const sendMessage = async () => {
    await fetch('http://localhost:3001/message', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from_user: userId,
        to_user: selectedUser,
        message,
      }),
    });
    // Add message to conversation and clear input
    setConversation([...conversation, { from_user: userId, message }]);
    setMessage('');
  };

  return (
    <div>
      <ul>
        {conversation.map((m, index) => (
          <li key={index}>{m.message}</li>
        ))}
      </ul>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

export default Chat;
