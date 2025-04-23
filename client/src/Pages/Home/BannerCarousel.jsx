import { useState, useEffect, useRef } from 'react';
// Import desktop images
import banner1 from '../../assets/HomeImg/topbanner1.jpg';
import banner2 from '../../assets/HomeImg/topbanner2.jpg';
import banner3 from '../../assets/HomeImg/topbanner3.jpg';
import banner4 from '../../assets/HomeImg/topbanner4.jpg';
// Import mobile-optimized images
import banner1Mobile from '../../assets/HomeImg/topbanner1mobile.jpg';
import banner2Mobile from '../../assets/HomeImg/topbanner2mobile.jpg';
import banner3Mobile from '../../assets/HomeImg/topbanner3mobile.jpg';
import banner4Mobile from '../../assets/HomeImg/topbanner4mobile.jpg';

export default function BannerCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const carouselRef = useRef(null);
  
  // Set up responsive images based on screen size
  const bannerImages = [
    { desktop: banner1, mobile: banner1Mobile },
    { desktop: banner2, mobile: banner2Mobile },
    { desktop: banner3, mobile: banner3Mobile },
    { desktop: banner4, mobile: banner4Mobile }
  ];

  // Check screen size for responsive image selection
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768); // 768px is standard md breakpoint
    };
    
    // Initial check
    checkScreenSize();
    
    // Add listener for window resize
    window.addEventListener('resize', checkScreenSize);
    
    // Cleanup
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // Auto-rotate carousel
  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentSlide((prevSlide) => (prevSlide === bannerImages.length - 1 ? 0 : prevSlide + 1));
    }, 8000); // 8 seconds
    
    return () => clearTimeout(timer);
  }, [currentSlide, bannerImages.length]);

  // Navigate to previous slide
  const prevSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide === 0 ? bannerImages.length - 1 : prevSlide - 1));
  };

  // Navigate to next slide
  const nextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide === bannerImages.length - 1 ? 0 : prevSlide + 1));
  };

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') {
        prevSlide();
      } else if (e.key === 'ArrowRight') {
        nextSlide();
      }
    };
    
    // Add keyboard event listener when component mounts
    window.addEventListener('keydown', handleKeyDown);
    
    // Cleanup event listener when component unmounts
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // Handle touch events for mobile swipe
  const handleTouchStart = (e) => {
    setTouchStart(e.touches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 100) {
      // Swipe left - next slide
      nextSlide();
    }
    
    if (touchStart - touchEnd < -100) {
      // Swipe right - previous slide
      prevSlide();
    }
  };

  return (
    <div 
      className="pb-3 relative w-full overflow-hidden"
      ref={carouselRef}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      tabIndex={0} // Make div focusable to capture keyboard events
    >
      <div 
        className="flex transition-transform duration-700 ease-in-out" 
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {bannerImages.map((image, index) => (
          <div key={index} className="min-w-full relative">
            {/* Image container with appropriate dimensions */}
            <div className="w-full relative">
              {/* Mobile image - shown only on smaller screens */}
              <img 
                src={image.mobile} 
                alt={`Banner image ${index + 1}`}
                className="w-full md:hidden object-cover"
                style={{ height: '680px' }}
              />
              
              {/* Desktop image - hidden on mobile */}
              <img 
                src={image.desktop} 
                alt={`Banner image ${index + 1}`}
                className="w-full hidden md:block object-cover" 
                style={{ height: '680px' }}
              />
              
              {/* Overlay for "Shop Now" button */}
              <div className="absolute inset-0 flex items-center justify-center">
                <button className="bg-maroon hover:bg-darkMaroon text-cream py-2 px-4 sm:py-3 sm:px-8 rounded-md font-semibold shadow-custom transition-colors duration-300">
                  Shop Now
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button 
        onClick={prevSlide}
        className="absolute left-2 sm:left-4 top-1/2 transform -translate-y-1/2 bg-cream bg-opacity-50 hover:bg-opacity-70 text-maroon p-1 sm:p-2 rounded-full focus:outline-none transition-all duration-300"
        aria-label="Previous slide"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-6 sm:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      
      <button 
        onClick={nextSlide}
        className="absolute right-2 sm:right-4 top-1/2 transform -translate-y-1/2 bg-cream bg-opacity-50 hover:bg-opacity-70 text-maroon p-1 sm:p-2 rounded-full focus:outline-none transition-all duration-300"
        aria-label="Next slide"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-6 sm:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Slide Indicator */}
      <div className="absolute bottom-2 sm:bottom-4 left-1/2 transform -translate-x-1/2 bg-cream bg-opacity-50 px-2 py-0.5 sm:px-3 sm:py-1 rounded-full text-xs sm:text-sm text-darkBrown">
        {currentSlide + 1}/{bannerImages.length}
      </div>

      {/* Dots Navigation */}
      <div className="absolute bottom-6 sm:bottom-10 left-0 right-0 flex justify-center space-x-2">
        {bannerImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${
              currentSlide === index ? 'bg-maroon w-4 sm:w-6' : 'bg-darkBrown bg-opacity-30'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}