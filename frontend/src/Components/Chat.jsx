import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import WeatherInfo from './Widget'; // Import the WeatherInfo component
import NaturalDisasterWidget from './Natural'; // Import the NaturalDisasterWidget component
import Chat from './Chatroom'
// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAzBJs7gjLFFydpoG8YQ-vbLDM0TsJ6VzA",
    authDomain: "teamace-4e45f.firebaseapp.com",
    projectId: "teamace-4e45f",
    storageBucket: "teamace-4e45f.appspot.com",
    messagingSenderId: "231821369549",
    appId: "1:231821369549:web:d65af7c54fa6c427fa4984",
    measurementId: "G-T3WT782EC5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Connect to the socket server
const socket = io('http://localhost:4000'); // Replace with your server URL

const ChatRoom = ({ userLocation }) => {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [userName, setUserName] = useState('Anonymous');
    const [userCount, setUserCount] = useState(0);

    useEffect(() => {
        // Get user name from Firebase
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUserName(user.displayName || 'Anonymous');
            }
        });

        // Join the room based on location
        if (userLocation) {
            socket.emit('joinRoom', userLocation);
        }

        // Listen for incoming messages
        socket.on('message', (msg) => {
            setMessages((prevMessages) => [...prevMessages, msg]);
        });

        // Listen for user count updates
        socket.on('userCount', (count) => {
            setUserCount(count);
        });

        // Cleanup on component unmount
        return () => {
            unsubscribe();
            socket.off('message');
            socket.off('userCount');
        };
    }, [userLocation]);

    const handleSend = () => {
        if (message.trim()) {
            socket.emit('chatMessage', { message, userName, userLocation });
            setMessage('');
        }
    };

    return (
        <div className="flex h-[140vh]">
            {/* Chat Room */}
            <div className="flex-1 flex flex-col border-r border-gray-800 bg-gray-900 text-gray-100">
                <Chat />
            </div>

            {/* Weather Information */}
            <div className="w-1/3 p-4 bg-gray-900 text-gray-100">
                <div className="flex flex-col">
                    <div className="mb-4">
                        <WeatherInfo userLocation={userLocation} />
                    </div>
                    <div>
                        <NaturalDisasterWidget />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChatRoom;
