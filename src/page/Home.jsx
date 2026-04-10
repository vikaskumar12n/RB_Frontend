import React, { useEffect } from 'react' 
import HeroSection from '../component/HeroSection'
import CategoryNav from '../component/Category'
import Builder from './Builder' 
import ResumeBuilderCTA from '../component/ResumeBuilderCTA'
import { useLocation } from 'react-router-dom'
// import ResumeHeroSection from './ResumeHeroSection'
import ResumeTipsSection from '../component/ResumeTipSection'

const Home = () => {
    const location = useLocation();
  useEffect(() => { 
    if (location.hash) { 
      const id = location.hash.replace("#", "");
      const el = document.getElementById(id); 
      if (el) { 
        setTimeout(() => {
          el.scrollIntoView({ 
            behavior: "smooth", 
            block: "start"  
          });
        }, 100);
      }
    } else { 
      window.scrollTo(0, 0);
    }
  }, [location]);
  return (
   <>
   
    <HeroSection/> 
    <div id="category"> 
    <CategoryNav/>
    </div> 
    <div id="builder">
    <Builder/>
    </div> 
    <ResumeBuilderCTA/>
    <ResumeTipsSection/>
    <ResumeBuilderCTA/>
   </>
  )
}

export default Home