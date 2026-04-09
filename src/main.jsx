import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import React from 'react'
import { ResumeProvider } from "./helper/ResumeContext.jsx";
createRoot(document.getElementById('root')).render(
  <ResumeProvider>
    <App />
  </ResumeProvider>,
)
