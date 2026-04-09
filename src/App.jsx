 import React from 'react'
 import Home from './page/Home'
 import { BrowserRouter,Route ,Routes } from 'react-router-dom'
 import ResumeBuilder from './page/CreateResume' 
 import Navbar from './component/Navbar'
 import Footer from './component/Footer' 
 import ProfilePage from './component/MyProfile'
  import LanginfPage from './page/LangingPage'
import './App.css'

function App() {
  

  return (
    <>
    <BrowserRouter>
    <Navbar/>
      <Routes>
        <Route path='/' element={<LanginfPage/>}/> 
        <Route path='home' element={<Home/>}/>
        <Route path='create' element={<ResumeBuilder/>}/>
        <Route path='myresume' element={<ProfilePage/>}/>
       
      </Routes>
      <Footer/> 
    </BrowserRouter>
    </>
   )
}

export default App
