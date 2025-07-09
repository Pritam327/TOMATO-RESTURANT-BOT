

import React, { useState } from 'react';
import './ChatBot.css';

const ChatBot = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { type: 'bot', text: 'Hi! Welcome to FoodDel . How can I help you today?' },
  ]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { type: 'user', text: input }];
    let botResponse = '';

    if (input.toLowerCase().includes('reservation')) {
      botResponse = "Sorry, today is fully booked for reservations. But don’t worry—you can still place a food order, and we’ll deliver it to you!";
    } else {
      botResponse = "I’m here to help! You can ask about menu, orders, or delivery.";
    }

    newMessages.push({ type: 'bot', text: botResponse });
    setMessages(newMessages);
    setInput('');
  };

  return (
    <>
      {!open && (
        <div className="chat-icon" onClick={() => setOpen(true)}>
          
        </div>
      )}

      {open && (
        <div className="chatbot-window">
          <div className="chatbot-header">
            <span> FoodBot</span>
            <button onClick={() => setOpen(false)} className="close-btn">✖</button>
          </div>
          <div className="chatbot-messages">
            {messages.map((msg, idx) => (
              <div key={idx} className={`chatbot-message ${msg.type}`}>
                {msg.text}
              </div>
            ))}
          </div>
          <div className="chatbot-input">
            <input
              type="text"
              placeholder="Type a message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            />
            <button onClick={handleSend}>Send</button>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatBot;
