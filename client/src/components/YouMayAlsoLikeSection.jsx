// src/components/YouMayAlsoLikeSection.jsx
import React, { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import ProductCard from './ProductCard';

/**
 * YouMayAlsoLikeSection component displays related products
 * @param {Object} props - Component props
 * @param {string|number} props.currentProductId - ID of the current product to exclude from recommendations
 * @returns {JSX.Element} - The related products section
 */
export default function YouMayAlsoLikeSection({ currentProductId }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const carouselRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);
  
  // Recommended products - This will be fetched from backend based on current product
  // These are placeholder values that will be replaced with backend data
  const [recommendedProducts, setRecommendedProducts] = useState([
    {
      id: 'rec1',
      name: "", // Will come from backend
      price: null, // Will come from backend
      image: "/api/placeholder/300/400", // Will come from backend
      path: "/product/recommended-1"
    },
    {
      id: 'rec2',
      name: "", // Will come from backend
      price: null, // Will come from backend
      image: "/api/placeholder/300/400", // Will come from backend
      path: "/product/recommended-2"
    },
    {
      id: 'rec3',
      name: "", // Will come from backend
      price: null, // Will come from backend
      image: "/api/placeholder/300/400", // Will come from backend
      path: "/product/recommended-3"
    },
    {
      id: 'rec4',
      name: "", // Will come from backend
      price: null, // Will come from backend
      image: "/api/placeholder/300/400", // Will come from backend
      path: "/product/recommended-4"
    },
    {
      id: 'rec5',
      name: "", // Will come from backend
      price: null, // Will come from backend
      image: "/api/placeholder/300/400", // Will come from backend
      path: "/product/recommended-5"
    },
    {
      id: 'rec6',
      name: "", // Will come from backend
      price: null, // Will come from backend
      image: "/api/placeholder/300/400", // Will come from backend
      path: "/product/recommended-6"
    }
  ]);

  // Check viewport width for responsive layout
  useEffect(() => {
    const checkWidth = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkWidth();
    window.addEventListener('resize', checkWidth);
    
    return () => window.removeEventListener('resize', checkWidth);
  }, []);

  // Initialize AOS with custom settings for this component
  useEffect(() => {
    if (typeof AOS !== 'undefined') {
      // Refresh AOS to detect new elements
      AOS.refresh();
    }
  }, [recommendedProducts]);

  // Navigation functions
  const scrollPrev = () => {
    if (activeIndex > 0) {
      setActiveIndex(activeIndex - 1);
    }
  };

  const scrollNext = () => {
    const maxIndex = Math.max(0, recommendedProducts.length - getItemsPerView());
    if (activeIndex < maxIndex) {
      setActiveIndex(activeIndex + 1);
    }
  };

  // Determine how many items should be visible based on screen size
  const getItemsPerView = () => {
    if (window.innerWidth < 640) {
      return 1; // Mobile
    } else if (window.innerWidth < 1024) {
      return 2; // Tablet
    } else {
      return 4; // Desktop
    }
  };

  // Calculate if we're at the beginning or end of the carousel
  const isAtStart = activeIndex === 0;
  const isAtEnd = activeIndex >= recommendedProducts.length - getItemsPerView();

  return (
    <section className="bg-cream px-4 md:px-6 lg:px-12 py-8" data-aos="fade-up" data-aos-once="true" data-aos-duration="1000">
      <div className="container mx-auto">
        {/* Section heading */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl md:text-3xl font-semibold text-darkBrown">
            You May Also Like
          </h2>
          
          {/* Desktop navigation controls */}
          <div className="hidden md:flex items-center gap-2">
            <button 
              className={`p-2 rounded-full ${isAtStart ? 'bg-lightPink text-darkBrown/40 cursor-not-allowed' : 'bg-maroon text-cream hover:bg-darkMaroon shadow-custom'} transition-all duration-300`}
              onClick={scrollPrev}
              disabled={isAtStart}
              aria-label="Previous products"
            >
              <ChevronLeft size={20} />
            </button>
            <button 
              className={`p-2 rounded-full ${isAtEnd ? 'bg-lightPink text-darkBrown/40 cursor-not-allowed' : 'bg-maroon text-cream hover:bg-darkMaroon shadow-custom'} transition-all duration-300`}
              onClick={scrollNext}
              disabled={isAtEnd}
              aria-label="Next products"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
        
        {/* Product carousel */}
        <div className="relative">
          {/* Mobile navigation controls - positioned at bottom */}
          <div className="md:hidden flex justify-center items-center gap-4 mt-4">
            <button 
              className={`p-2 rounded-full ${isAtStart ? 'bg-lightPink text-darkBrown/40 cursor-not-allowed' : 'bg-maroon text-cream hover:bg-darkMaroon shadow-custom'} transition-all duration-300`}
              onClick={scrollPrev}
              disabled={isAtStart}
              aria-label="Previous products"
            >
              <ChevronLeft size={20} />
            </button>
            <button 
              className={`p-2 rounded-full ${isAtEnd ? 'bg-lightPink text-darkBrown/40 cursor-not-allowed' : 'bg-maroon text-cream hover:bg-darkMaroon shadow-custom'} transition-all duration-300`}
              onClick={scrollNext}
              disabled={isAtEnd}
              aria-label="Next products"
            >
              <ChevronRight size={20} />
            </button>
          </div>
          
          {/* Carousel container with overflow handling */}
          <div 
            ref={carouselRef}
            className="overflow-hidden"
          >
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ 
                transform: `translateX(-${activeIndex * (100 / getItemsPerView())}%)`,
                width: `${(recommendedProducts.length / getItemsPerView()) * 100}%`
              }}
            >
              {recommendedProducts.map((product, index) => (
                <div 
                  key={product.id} 
                  className="px-2"
                  style={{ width: `${100 / recommendedProducts.length * getItemsPerView()}%` }}
                >
                  <ProductCard 
                    product={product} 
                    index={index}
                  />
                </div>
              ))}
            </div>
          </div>
          
          {/* Carousel dots/indicators for mobile */}
          <div className="flex justify-center mt-4 md:hidden">
            {Array.from({ length: Math.ceil(recommendedProducts.length / getItemsPerView()) }).map((_, index) => (
              <button
                key={index}
                className={`h-2 mx-1 rounded-full transition-all duration-300 ${
                  index === activeIndex ? 'w-6 bg-maroon' : 'w-2 bg-maroon/30'
                }`}
                onClick={() => setActiveIndex(index)}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}