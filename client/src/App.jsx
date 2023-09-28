import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Error from "./pages/Error";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import { ToastContainer } from 'react-toastify';
import Journal from "./pages/Journal";
import Forum from "./pages/Forum";
import ChatApp from "./chats/ChatApp";
import { initializeApp } from "firebase/app";
import firebaseConfig from '../firebaseConfig';
import MyForum from "./pages/MyForum";
import ForumID from "./pages/ForumID";

// Initialize Firebase
initializeApp(firebaseConfig);

function App() {
  return (
    <>
    <ToastContainer />
    
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/journal" element={<Journal />} />
          <Route path="/forum" element={<Forum />} />
          <Route path="/forum/:id" element={<ForumID /> } />
          <Route path="/myforum/:id" element={<MyForum />} />
          <Route path="/messages" element={<ChatApp /> } />
          <Route path="*" element={<Error />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
