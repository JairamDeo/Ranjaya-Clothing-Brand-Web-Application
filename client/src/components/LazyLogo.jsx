import React from 'react';
import Logo from '../assets/Logo.webp'

// Import logo with explicit width and height
// Adjust the path to match your actual logo location
const LazyLogo = () => {
  return (
    <img 
      src={Logo} 
      alt="Ranjaya" 
      width="96" 
      height="64" 
      className="h-16" 
    />
  );
};

export default LazyLogo;