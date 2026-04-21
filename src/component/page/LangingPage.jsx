import HeroSection from "../LandingPage/HeroSection";
import ResumeBuilder from "../LandingPage/BuildResume";
import React from 'react'
import SliderSection from "../LandingPage/SliderSection";
import ResumeSlider from "../LandingPage/ResumeSlider"; 
import WhySection from "../LandingPage/servicesSection";
import ResumeHeroSection from "../LandingPage/ResumeHeroSection"; 
const LanginfPage = () => {
  return (
     <>
        <HeroSection/>
        <ResumeBuilder/>
        <SliderSection/>
        <ResumeSlider/>
        <WhySection/>
      
        <ResumeHeroSection/>
 
     </>
  )
}

export default LanginfPage