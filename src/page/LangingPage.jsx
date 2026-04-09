import HeroSection from "../LandingPage/HeroSection";
import ResumeBuilder from "../LandingPage/BuildResume";
import React from 'react'
import SliderSection from "../LandingPage/SliderSection";
import ResumeSlider from "../LandingPage/ResumeSlider"; 
import WhySection from "../LandingPage/servicesSection";
const LanginfPage = () => {
  return (
     <>
        <HeroSection/>
        <ResumeBuilder/>
        <SliderSection/>
        <ResumeSlider/>
        <WhySection/>
 
     </>
  )
}

export default LanginfPage