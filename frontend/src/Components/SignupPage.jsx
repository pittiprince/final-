import React from 'react';
import { auth, signInWithPopup, GoogleAuthProvider } from '../config/firebase';
import { Toaster, toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';


const SignupPage = () => {
  const navigate = useNavigate();

  const handleGoogleSignUp = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // Set flag in localStorage
      localStorage.setItem('loginSuccess', 'true');

      // Show success notification
      toast.success(`Successfully signed up, ${user.displayName}!`);

      // Navigate to the main page
      navigate('/Mainpage');
    } catch (error) {
      // Show error notification
      toast.error(`Failed to sign up with Google: ${error.message}`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col md:flex-row relative">
      <Toaster /> {/* For notifications */}

      {/* Left Side: Globe Animation */}
      <div className="w-full md:w-1/2 flex items-center justify-center bg-gray-800 p-8 relative">
        <div className="absolute inset-0 z-0 h-full w-full">
          
        </div>
        <h1 className="text-5xl sm:text-7xl font-extrabold text-white text-center relative z-10">
          ACE
        </h1>
      </div>

      {/* Right Side: Signup Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-4">
        <div className="bg-gray-800 p-6 sm:p-8 rounded-lg shadow-lg w-full max-w-md">
          <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-white text-center">Sign Up</h2>

          <button
            type="button"
            onClick={handleGoogleSignUp}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg focus:outline-none focus:shadow-outline transition duration-200 ease-in-out w-full"
          >
            Sign Up with Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
