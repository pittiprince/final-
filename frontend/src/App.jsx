import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './Components/SignupPage'
import Mainpage from './Components/Manpage';
import { RecoilRoot } from 'recoil';
import SideBar from './Components/Helpline';
import ChatRoom from './Components/Chat';
import DisasterVideos from './Components/VIdeoEducation';

function App() {

  return (
    <RecoilRoot>
      <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/Mainpage" element={<Mainpage />} />
        <Route path="/Precautions" element={<SideBar />} />
        {/* <Route path="/Chat" element={<ChatRoom />} /> */}
        <Route path="/Chatroom" element={<ChatRoom />} />
        <Route path="/videoeducation" element={<DisasterVideos />} />
      </Routes>
    </Router>
    </RecoilRoot>
  )
}

export default App
