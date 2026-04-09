import React, { useEffect } from 'react' 
import HeroSection from '../component/HeroSection'
import CategoryNav from '../component/Category'
import Builder from './Builder' 
import ResumeBuilderCTA from '../component/ResumeBuilderCTA'
import { useLocation } from 'react-router-dom'
// import ResumeHeroSection from './ResumeHeroSection'

const Home = () => {
    const location = useLocation();
   useEffect(() => {
    if (location.hash === "#builder") {
      const el = document.getElementById("builder"); 
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: "smooth" });
        }, 0);
      }
    }
  }, [location]);
  return (
   <>
   
    <HeroSection/>  
    <CategoryNav/>
    <div id="builder">
    <Builder/>
    </div> 
    <ResumeBuilderCTA/>
   </>
  )
}

export default Home