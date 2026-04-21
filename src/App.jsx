import React from 'react'
import Home from './component/page/Home'
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'
import Navbar from './component/Navbar'
import Footer from './component/Footer'
import ProfilePage from './component/MyProfile'
import LanginfPage from './component/page/LangingPage'
import './App.css'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
 
import AboutUs from './component/AboutUs'
import HelpPage from './component/Hepl'
import ProtectedRoute from "./api/ProtectedRout";
import NotFound from "./component/page/NotFound"; 
import { ResumeProvider } from "./helper/ResumeContext.jsx";
 
function AppLayout() {
  const location = useLocation();

  const validPaths = ["/", "/home","/about", "/help", "/myresume"];
  const isNotFound = !validPaths.includes(location.pathname);

  return (
    <>
      {!isNotFound && <Navbar />}

      <Routes>
        <Route path='/about' element={<AboutUs />} />
        <Route path='/help' element={<HelpPage />} />
        <Route path='/' element={<LanginfPage />} />
        
        <Route path='/home' element={ 
            <Home /> 
        } />
        <Route path='/myresume' element={
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
        } />

        <Route path='*' element={<NotFound />} />
      </Routes>

      {!isNotFound && <Footer />}
 
<ToastContainer 
  position="top-right" 
  autoClose={3000} 
  theme="light"
  style={{ zIndex: 99999 }} // <--- Ye add karein
/>    </>
  );
}
 
function App() {
  return (
    <BrowserRouter>
    <ResumeProvider>
      <AppLayout />
    </ResumeProvider>
    </BrowserRouter>
  );
}


export default App;