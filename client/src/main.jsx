import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import AOS from 'aos';
import 'aos/dist/aos.css'; // Import AOS styles

// Initialize AOS globally
AOS.init({
  duration: 800,
  once: false, // Set to false to animate elements each time they enter the viewport
  easing: 'ease-in-out'
});

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
