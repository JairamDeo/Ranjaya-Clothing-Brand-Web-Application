import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, ShoppingCart } from 'lucide-react';
import AOS from 'aos';
import 'aos/dist/aos.css';

// Import product images from assets folder
import product1 from '../../assets/HomeImg/Ranjayafavimg1.webp';
import product2 from '../../assets/HomeImg/Ranjayafavimg2.webp';
import product3 from '../../assets/HomeImg/Ranjayafavimg3.webp';
import product4 from '../../assets/HomeImg/Ranjayafavimg4.webp';
import product5 from '../../assets/HomeImg/Ranjayafavimg5.webp';
import product6 from '../../assets/HomeImg/Ranjayafavimg6.webp';
import product7 from '../../assets/HomeImg/Ranjayafavimg7.webp';
import product8 from '../../assets/HomeImg/Ranjayafavimg8.webp';

export default function HomeSection4() {
  const [activeIndex, setActiveIndex] = useState(0);
  const carouselRef = useRef(null);
  
  // Initialize AOS
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      easing: 'ease-in-out'
    });
  }, []);
  
  // Products data
  const products = [
    {
      id: 1,
      name: "COTTON CANDY",
      price: 2300,
      image: product1 || "/api/placeholder/300/400",
      path: "/product/elegant-maroon-suit"
    },
    {
      id: 2,
      name: "MINT MAJESTY",
      price: 2300,
      image: product2 || "/api/placeholder/300/400",
      path: "/product/floral-embroidered-dress"
    },
    {
      id: 3,
      name: "AMBER GLOW",
      price: 2300,
      image: product3 || "/api/placeholder/300/400",
      path: "/product/traditional-silk-saree"
    },
    {
      id: 4,
      name: "VERY BERRY",
      price: 2316,
      image: product4 || "/api/placeholder/300/400",
      path: "/product/designer-anarkali"
    },
    {
      id: 5,
      name: "BLUE BREEZE",
      price: 2027,
      image: product5 || "/api/placeholder/300/400",
      path: "/product/festive-lehenga"
    },
    {
      id: 6,
      name: "LAVENDER DREAM",
      price: 2027,
      image: product6 || "/api/placeholder/300/400",
      path: "/product/classic-chanderi-kurta"
    },
    {
      id: 7,
      name: "COOL CRIMSON JAMDANI",
      price: 2300,
      image: product7 || "/api/placeholder/300/400",
      path: "/product/handcrafted-gown"
    },
    {
      id: 8,
      name: "CRIMSON",
      price: 2300,
      image: product8 || "/api/placeholder/300/400",
      path: "/product/bridal-collection-dress"
    }
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
          data-aos="fade-up"
        >
          RANJAYA FAVOURITES
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

function ProductCard({ product }) {
  return (
    <Link 
      to={product.path}
      className="w-full max-w-[300px] flex flex-col group mb-6"
    >
      {/* Product Image */}
      <div className="w-full h-[400px] overflow-hidden bg-lightPink rounded-t">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      
      {/* Product Details */}
      <div className="p-4 border-x border-b border-maroon-20 rounded-b bg-cream">
        <h3 className="text-lg font-medium text-darkBrown">{product.name}</h3>
        <p className="text-maroon font-semibold mt-1">₹{product.price.toLocaleString()}</p>
        
        {/* Add to Cart Button */}
        <button 
          className="w-full py-2 px-3 bg-maroon text-cream rounded hover:bg-darkMaroon transition-colors font-medium mt-3 flex items-center justify-center gap-2"
          onClick={(e) => {
            e.preventDefault();
            // Add to cart logic would go here
            console.log(`Added ${product.name} to cart`);
          }}
        >
          <ShoppingCart size={18} />
          <span>ADD TO CART</span>
        </button>
      </div>
    </Link>
  );
}