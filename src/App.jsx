 import React from 'react'
 import Home from './component/page/Home'
 import { BrowserRouter,Route ,Routes } from 'react-router-dom'
 import ResumeBuilder from './component/page/CreateResume' 
 import Navbar from './component/Navbar'
 import Footer from './component/Footer' 
 import ProfilePage from './component/MyProfile'
  import LanginfPage from './component/page/LangingPage'
import './App.css'
import Register from "../src/Auth/Register"
import Login from "../src/Auth/Login"
import AboutUs from './component/AboutUs'
import HelpPage from './component/Hepl'
function App() {
  

  return (
    <>
    <BrowserRouter>
    <Navbar/>
      <Routes>
      <Route path='/about' element={<AboutUs/>}/>
      <Route path='/help' element={<HelpPage/>}/>
        <Route path='/' element={<LanginfPage/>}/> 
        <Route path='/home' element={<Home/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/create' element={<ResumeBuilder/>}/>
        <Route path='/myresume' element={<ProfilePage/>}/>
       
      </Routes>
      <Footer/> 
    </BrowserRouter>
    </>
   )
}

export default App
