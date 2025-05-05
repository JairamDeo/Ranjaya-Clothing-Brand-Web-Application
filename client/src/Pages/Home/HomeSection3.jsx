import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import ProductCard from '../../components/ProductCard';

export default function HomeSection3() {
  const [activeIndex, setActiveIndex] = useState(0);
  const carouselRef = useRef(null);
  
  // Products data - This will be replaced with API data from backend
  // Sample product for development purposes
  const products = [
    {
      id: 1,
      name: "", // Placeholder name come from backend
      price: null, // Placeholder price come from backend
      image: "/api/placeholder/300/400", // Placeholder image come from backend
      path: "/product/featured-product" // Placeholder path
    }
    
    // Backend will populate this array with actual products
    // Additional products will appear in the carousel automatically
  ];

  // Calculate items per slide based on screen size
  const getItemsPerSlide = () => {
    if (typeof window !== 'undefined') {
      if (window.innerWidth >= 1280) return 4; // xl screens
      if (window.innerWidth >= 1024) return 3; // lg screens
      if (window.innerWidth >= 768) return 2; // md screens
      return 1; // sm screens
    }
    return 4; // Default for SSR
  };
  
  const [itemsPerSlide, setItemsPerSlide] = useState(getItemsPerSlide());
  
  // Update items per slide on window resize
  useEffect(() => {
    const handleResize = () => {
      setItemsPerSlide(getItemsPerSlide());
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  // Calculate total slides
  const totalSlides = Math.ceil(products.length / itemsPerSlide);
  
  // Handle carousel navigation
  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? totalSlides - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev === totalSlides - 1 ? 0 : prev + 1));
  };
  
  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') {
        handlePrev();
      } else if (e.key === 'ArrowRight') {
        handleNext();
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [totalSlides]);
  
  // Handle touch swipe
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };
  
  const handleTouchEnd = (e) => {
    touchEndX.current = e.changedTouches[0].clientX;
    
    const diff = touchStartX.current - touchEndX.current;
    const threshold = 50;
    
    if (diff > threshold) {
      handleNext();
    } else if (diff < -threshold) {
      handlePrev();
    }
  };
  
  return (
    <section className="bg-cream px-4 py-6 md:px-6 lg:px-12">
      <div className="container mx-auto">
        {/* Section Heading */}
        <h2 
          className="text-center text-darkBrown text-3xl md:text-4xl font-semibold mb-8"
          data-aos="fade-down"
        >
          FEATURED COLLECTION
        </h2>
        
        {/* Carousel Container */}
        <div 
          className="relative"
          ref={carouselRef}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          data-aos="fade-up"
          data-aos-delay="100"
        >
          <div className="overflow-hidden">
            <div 
              className="flex transition-transform duration-500 ease-in-out" 
              style={{ transform: `translateX(-${activeIndex * 100}%)` }}
            >
              {/* Generate slides */}
              {Array.from({ length: totalSlides }).map((_, slideIndex) => (
                <div 
                  key={slideIndex} 
                  className="w-full flex-shrink-0 flex flex-wrap justify-center gap-4"
                >
                  {products.slice(
                    slideIndex * itemsPerSlide, 
                    (slideIndex + 1) * itemsPerSlide
                  ).map((product) => (
                    <ProductCard 
                      key={product.id} 
                      product={product} 
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>
          
          {/* Carousel Controls */}
          <button 
            onClick={handlePrev}
            className="absolute top-1/2 left-2 -translate-y-1/2 bg-cream/90 p-2 rounded-full shadow-custom text-maroon hover:text-darkMaroon z-10"
            aria-label="Previous slide"
          >
            <ChevronLeft size={28} />
          </button>
          
          <button 
            onClick={handleNext}
            className="absolute top-1/2 right-2 -translate-y-1/2 bg-cream/90 p-2 rounded-full shadow-custom text-maroon hover:text-darkMaroon z-10"
            aria-label="Next slide"
          >
            <ChevronRight size={28} />
          </button>
          
          {/* Carousel Indicators */}
          <div className="flex justify-center mt-6 gap-2">
            {Array.from({ length: totalSlides }).map((_, index) => (
              <button 
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  activeIndex === index ? 'w-4 bg-maroon' : 'bg-maroon/20'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
        
        {/* View All Button */}
        <div className="flex justify-center mt-8">
          <Link 
            to="/collections/all"
            className="px-6 py-3 bg-maroon text-cream rounded hover:bg-darkMaroon transition-colors font-medium"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            View All
          </Link>
        </div>
      </div>
    </section>
  );
}