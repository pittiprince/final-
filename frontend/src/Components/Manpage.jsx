import React, { useState, useEffect } from 'react';
import WeatherWidget from './Widget';
import AirQualityWidget from './News';
import NaturalDisasterWidget from './Natural';
import { useRecoilState } from 'recoil';
import { locationAtom } from '../atoms/atoms';
import { Toaster, toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import ChatIcon from './ChatIcon'; // Import the ChatIcon component

// import NavBar from './NavBar';

const Mainpage = () => {
  const [location, setLocation] = useState({ lat: null, long: null });
  const [loc, setValue] = useRecoilState(locationAtom);

  useEffect(() => {
    // Check if Geolocation is available
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // Store latitude and longitude in the state
          const userLocation = {
            lat: position.coords.latitude,
            lon: position.coords.longitude,
          };
          setValue(userLocation);
          console.log("User Location:", userLocation); // Log the location to the console
        },
        (error) => {
          console.error("Error getting location:", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }, [location]);

  useEffect(() => {
    // Check for login success flag in localStorage
    const loginSuccess = localStorage.getItem('loginSuccess');
    if (loginSuccess === 'true') {
      toast.success('Login Successful!');
      localStorage.removeItem('loginSuccess'); // Clear the flag after showing notification
    }
  }, []);

  return (
    <div className="bg-gray-900 min-h-screen text-white">
      <Toaster /> {/* For notifications */}

      <div className="container mx-auto px-4 py-6">
        <div className="mb-6">
          {/* NavBar positioned at the top */}
          <NavBar />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="p-4 rounded-lg bg-gray-800 shadow-md">
            <WeatherWidget location={location} />
          </div>
          <div className="p-4 rounded-lg bg-gray-800 shadow-md col-span-1 lg:col-span-2">
            <AirQualityWidget location={location} />
          </div>
          <div className="col-span-1 lg:col-span-3 p-4 rounded-lg bg-gray-800 shadow-md">
            <NaturalDisasterWidget location={location} />
          </div>
        </div>
      </div>

      <ChatIcon /> {/* Add the ChatIcon component */}
    </div>
  );
};

const NavBar = () => {
  const navigate = useNavigate(); 
  const handleLogout = () => {
    // Implement your logout logic here
    alert("Logged out");
  };

  return (
    <nav className="p-4 rounded-xl bg-gray-800 text-white shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center text-lg font-semibold">
          <div className='mr-5 text-4xl font-bold'>
            ACE
          </div>
          <div className="hidden md:flex ml-6 space-x-8 text-xl">
            <a  className="hover:text-gray-400 cursor-pointer"  onClick={()=>{
                    navigate("/Precautions")
            }}>Precautions</a>
            <a  className="cursor-pointer hover:text-gray-400" onClick={()=>{
                    navigate("/videoeducation")
            }}>Education</a>
            <a  className="cursor-pointer hover:text-gray-400" onClick={()=>{
                    navigate("/chatroom")
            }}>Live-Chat</a>
            <a  className="cursor-pointer hover:text-gray-400">About</a>
          </div>
        </div>
        <button 
          className="md:hidden p-2 bg-gray-700 rounded-full text-lg"
          onClick={handleLogout}
        >
          ☰
        </button>
      </div>
    </nav>
  );
};

export default Mainpage;
