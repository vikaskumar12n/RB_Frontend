import React, { useEffect } from 'react' 
import HeroSection from '../CreatResume/HeroSection'
import CategoryNav from '../CreatResume/Category'
import Builder from './Builder' 
import ResumeBuilderCTA from '../CreatResume/ResumeBuilderCTA'
import { useLocation } from 'react-router-dom'
// import ResumeHeroSection from './ResumeHeroSection'
import ResumeTipsSection from '../CreatResume/ResumeTipSection'
import { SearchProvider } from "../../helper/SearchContext";
import ResumeSliderWhitPhoto from '../CreatResume/PhotoTempleteSection'

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
   <SearchProvider> 
    <HeroSection/> 
    <div id="category"> 
    <CategoryNav/>
    </div> 
   </SearchProvider>
   <ResumeSliderWhitPhoto/>
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