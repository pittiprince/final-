import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles.css'; // Import the CSS file for animations

const ChatIcon = () => {
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();

  const handleClick = () => {
    setIsVisible(!isVisible); // Toggle card visibility
  };

  const handleNavigate = () => {
    navigate('/chatroom'); // Navigate to the chat page
    setIsVisible(false); // Hide the card when navigating
  };

  return (
    <div>
      <div
        className="fixed bottom-4 right-4 bg-blue-600 p-4 rounded-full shadow-lg cursor-pointer z-50 transform transition-transform hover:scale-110"
        onClick={handleClick}
      >
        <span className="text-white text-3xl">💬</span> {/* Chat Icon */}
      </div>
      {isVisible && (
        <div className="fixed bottom-16 right-4 bg-gray-800 p-4 rounded-lg shadow-lg transition-transform transform translate-y-0 opacity-100 z-50 animate-card">
          <h3 className="text-white text-xl font-semibold mb-2">Chat</h3>
          <p className="text-gray-400 mb-4">Start chatting with others in your area.</p>
          <button
            className="w-full p-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
            onClick={handleNavigate}
          >
            Go to Chat
          </button>
        </div>
      )}
    </div>
  );
};

export default ChatIcon;
