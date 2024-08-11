import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

const App = () => {
  const [socket] = useState(io('https://ace-backend-eta.vercel.app/'));
  const [room, setRoom] = useState('');
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState([]);
  const [username, setUsername] = useState('');
  const [hasJoinedRoom, setHasJoinedRoom] = useState(false);

  useEffect(() => {
    socket.on('message', (msg) => {
      console.log('Received message:', msg);
      setChat((prevChat) => [...prevChat, msg]);
    });

    socket.on('notification', (data) => {
      if (data.user !== username) { // Ensure the sender does not receive their own notification
        console.log('Notification received:', data);
        toast(`New message from ${data.user}: ${data.message}`, {
          icon: '📩', // Optional: Add an icon
          style: {
            borderRadius: '10px',
            background: '#333',
            color: '#fff',
          },
        });
      }
    });

    return () => {
      socket.off('message');
      socket.off('notification');
    };
  }, [socket, username]);

  const joinRoom = () => {
    if (room && username) {
      socket.emit('joinRoom', room);
      socket.emit('setName', username);  // Set the username
      setHasJoinedRoom(true);
      setChat([]);
      console.log('Joined room:', room);
    }
  };

  const sendMessage = (e) => {
    e.preventDefault();
    if (hasJoinedRoom && message.trim()) {
      socket.emit('chatMessage', { room, user: username, message });
      console.log('Sent message:', { room, user: username, message });
      setMessage('');
    }
  };

  const fetchLocationAndSetRoom = async () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          const response = await axios.get('https://api.opencagedata.com/geocode/v1/json', {
            params: {
              q: `${latitude}+${longitude}`,
              key: '7ef6eb6b6630491e8a77f303aabd56e6' // Replace with your OpenCage API key
            }
          });
          const locationName = response.data.results[0]?.formatted || 'Unknown Location';
          const arrayOfString = response.data.results[0].formatted;
          let arr = arrayOfString.split(",");
          console.log(arr[1]);
          setRoom(arr[1]);
          console.log('Set room based on location:', locationName);
        } catch (error) {
          console.error('Error fetching location:', error);
        }
      });
    } else {
      alert('Geolocation is not supported by this browser.');
    }
  };

  useEffect(() => {
    fetchLocationAndSetRoom();
  }, []);

  return (
    <div className="flex flex-col items-center bg-gray-900 text-white h-[200vh] overflow-hidden p-6">
      <h1 className="text-4xl font-extrabold mb-6">Chat Application</h1>
      {!hasJoinedRoom ? (
        <div className="flex flex-col items-center bg-gray-800 p-6 rounded-lg shadow-lg">
          <input
            type="text"
            placeholder="Enter your name"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="mb-4 p-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
          />
          <button onClick={joinRoom} className="p-3 bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors shadow-md">
            Join Room
          </button>
        </div>
      ) : (
        <div className="w-full max-w-2xl bg-gray-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-4">Location: {room}</h2>
          <div className="h-[70vh] overflow-auto bg-gray-700 p-4 mb-6 rounded-lg">
            {chat.map((msg, index) => (
              <div key={index} className="mb-3 text-sm">
                {msg.message ? (
                  <div>
                    <strong className="text-blue-400">{msg.user}:</strong> {msg.message}
                  </div>
                ) : null}
              </div>
            ))}
          </div>
          <form onSubmit={sendMessage} className="flex">
            <input
              type="text"
              placeholder="Enter message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="flex-1 p-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 transition-colors"
            />
            <button type="submit" className="p-3 bg-green-600 rounded-lg hover:bg-green-700 transition-colors shadow-md ml-3">
              Send
            </button>
          </form>
        </div>
      )}
      <Toaster />
    </div>
  );
};

export default App;
