import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import AOS from 'aos';
import 'aos/dist/aos.css';
import OwnerImg1 from '../assets/AboutUsImg/AboutUs1.webp';
import OwnerImg2 from '../assets/AboutUsImg/AboutUs2.webp';

const AboutUs = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: false,
    });
  }, []);

  return (
    <div className="bg-cream px-4 py-3 md:px-6 lg:px-12">
      {/* Heading */}
      <motion.h1 
        className="text-3xl md:text-4xl lg:text-5xl font-bold text-center text-darkBrown mb-12 py-3"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        ABOUT US
      </motion.h1>

      {/* First section - Dream with Legacy */}
      <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-8 mb-16">
        {/* Left side content */}
        <div 
          className="md:w-1/2 px-2 py-1 md:px-4 md:py-3" 
          data-aos="fade-right"
        >
          <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold text-maroon mb-4">
            A DREAM WOVEN WITH LEGACY
          </h2>
          <p className="text-darkBrown leading-relaxed">
            While the new generation stopped wearing Sarees, Pironi is a wave of traditions, and the art of draping a saree for new India. Founded by Mehek Mandhana, our brand is a celebration of artistry and tradition handed down through generations. Guided by the wisdom and experience of her father, a master in the textile industry, Mehek set out to weave her own narrative of excellence and creativity. At Pironi, every thread tells a story—a story of heritage, craftsmanship, and timeless elegance.
          </p>
        </div>

        {/* Right side image - Slightly larger */}
        <div 
          className="md:w-1/2 flex justify-center p-2"
          data-aos="fade-left"
        >
          <div className="relative overflow-hidden rounded-lg shadow-custom group w-full max-w-md">
            <img 
              src={OwnerImg1} 
              alt="Mehek Mandhana - Founder of Pironi" 
              className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105" 
            />
            <div className="absolute inset-0 bg-maroon bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-500"></div>
          </div>
        </div>
      </div>

      {/* Two boxes section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        {/* First box */}
        <div 
          className="bg-cream border border-maroon-20 rounded-xl px-5 py-3 md:px-4 md:py-3 shadow-custom hover:shadow-lg transition-all duration-300 group"
          data-aos="fade-up"
          data-aos-delay="100"
        >
          <h3 className="text-xl font-semibold text-maroon mb-3 group-hover:text-darkMaroon transition-colors duration-300">
            Innovation and Tradition: A Harmonious Blend
          </h3>
          <p className="text-darkBrown">
            At Pironi, we believe that every garment we create is part of a larger narrative, one that includes our customers. Each piece is designed to resonate deeply with the wearer, becoming a cherished part of their personal journey. By choosing Pironi, our customers become part of our story, where their individual experiences and memories intertwine with our brand's legacy of craftsmanship and innovation.
          </p>
          <div className="w-16 h-1 bg-maroon mt-4 group-hover:w-24 transition-all duration-500"></div>
        </div>

        {/* Second box */}
        <div 
          className="bg-cream border border-maroon-20 rounded-xl px-5 py-3 md:px-4 md:py-3 shadow-custom hover:shadow-lg transition-all duration-300 group"
          data-aos="fade-up"
          data-aos-delay="200"
        >
          <h3 className="text-xl font-semibold text-maroon mb-3 group-hover:text-darkMaroon transition-colors duration-300">
            A Shared Story
          </h3>
          <p className="text-darkBrown">
            At Pironi, we believe that every garment we create is part of a larger narrative, one that includes our customers. Each piece is designed to resonate deeply with the wearer, becoming a cherished part of their personal journey. By choosing Pironi, our customers become part of our story, where their individual experiences and memories intertwine with our brand's legacy of craftsmanship and innovation.
          </p>
          <div className="w-16 h-1 bg-maroon mt-4 group-hover:w-24 transition-all duration-500"></div>
        </div>
      </div>

      {/* Second image and text section */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-8">
        {/* Left side image */}
        <div 
          className="md:w-1/2 flex justify-center order-2 md:order-1 p-2"
          data-aos="fade-right"
        >
          <div className="relative overflow-hidden rounded-lg shadow-custom group w-full max-w-md">
            <img 
              src={OwnerImg2} 
              alt="Sustainable Practices at Pironi" 
              className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105" 
            />
            <div className="absolute inset-0 bg-maroon bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-500"></div>
          </div>
        </div>

        {/* Right side content */}
        <div 
          className="md:w-1/2 order-1 md:order-2 px-2 py-1 md:px-4 md:py-3"
          data-aos="fade-left"
        >
          <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold text-maroon mb-4">
            A RESPONSIBLE LEGACY
          </h2>
          <p className="text-darkBrown leading-relaxed">
            At Pironi, we are dedicated to excellence and sustainability. True luxury respects both people and the planet. We adhere to ethical production methods, ensuring our creations are both responsible and beautiful. By choosing sustainable packaging, we protect our planet while upholding our values of elegance and responsibility.
          </p>
          <button className="mt-6 px-3 py-2 bg-cream text-maroon border border-maroon rounded-full hover:bg-lightPink transition-all duration-300">
            Learn More
          </button>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;