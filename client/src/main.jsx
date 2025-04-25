import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import AOS from 'aos';
import 'aos/dist/aos.css'; // Import AOS styles

import '@fontsource/comic-neue';
import '@fontsource/comic-neue/400-italic.css';
import '@fontsource/comic-neue/700.css';

// Initialize AOS globally
AOS.init();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
