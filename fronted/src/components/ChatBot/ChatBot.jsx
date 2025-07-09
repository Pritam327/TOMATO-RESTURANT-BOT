import React, { useState } from 'react';
import './ChatBot.css'; 

const ChatBot = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { type: 'bot', text: 'Hi! Welcome to FoodDel 😋. How can I help you today?' }
  ]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (!input.trim()) return; 

    const newUserMessage = { type: 'user', text: input };
    setMessages((prev) => [...prev, newUserMessage]); 

    const messageToProcess = input; 
    setInput(''); 

    setTimeout(() => {
      const botReply = getBotReply(messageToProcess); 
      setMessages((prev) => [...prev, { type: 'bot', text: botReply }]); 
    }, 600);
  };

  // This getBotReply function will produce multiple responses if multiple keywords are found.
  const getBotReply = (message) => {
    const msg = message.toLowerCase();
    const replies = []; 

    // 1. Check for Greetings First (and add if found)
    const isGreeting = msg.includes('hi') || msg.includes('hello');
    if (isGreeting) {
      if (!replies.some(reply => reply.includes("Hello! "))) {
        replies.unshift("Hello!"); // unshift adds to the beginning
      }
    }


    const reservationKeywords = ['reservation', 'book', 'booking', 'table', 'reserve'];
    if (reservationKeywords.some(keyword => msg.includes(keyword))) {
      replies.push("Sorry, today is fully booked for reservations. But don’t worry—you can still place a food order, and we’ll deliver it to you!");
    }

    if (msg.includes('menu')) {
      replies.push("You should go to the menu section.");
    }

    if (msg.includes('order')) {
      replies.push("You can go to the order page where you can check your order.");
    }

    if (msg.includes('delivery')) {
      replies.push("The food will reach soon.");
    }

    
    if (replies.length === 0) {
      // If nothing at all was matched, provide the general "didn't get that" fallback
      replies.push("Sorry, I didn’t get that. Try asking about menu, orders, delivery, or reservations.");
    } else if (isGreeting && replies.length === 1 && replies[0].includes("Hello! 👋")) {
      
      replies.push("How can I assist you today?");
    }

    
    return replies.join(' ');
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
            <span>FoodBot</span>
            <button className="close-btn" onClick={() => setOpen(false)}>✖</button>
          </div>
          <div className="chatbot-messages">
            {messages.map((msg, index) => (
              <div key={index} className={`chatbot-message ${msg.type}`}>
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
              onKeyDown={(e) => e.key === 'Enter' && handleSend()} // Send on Enter key
            />
            <button onClick={handleSend}>Send</button>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatBot;