import React, { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';

// Assuming these images are in your assets folder
import collection1Img from '../../assets/HomeImg/trendingcollection1.webp';
import collection2Img from '../../assets/HomeImg/trendingcollection2.webp';
import collection3Img from '../../assets/HomeImg/trendingcollection3.webp';
import collection4Img from '../../assets/HomeImg/trendingcollection4.webp';
import collection5Img from '../../assets/HomeImg/trendingcollection5.webp';

export default function HomeSection2({ 
  title = "New Trending Collection!",
  collections = [
    {
      id: 1,
      name: "UNSTITCHED SUIT",
      image: collection1Img || "/api/placeholder/213/350", // Fallback to placeholder if import fails
      path: "/collection/unsticked-suit"
    },
    {
      id: 2,
      name: "NAZAAKAT",
      image: collection2Img || "/api/placeholder/213/350",
      path: "/collection/nazakat"
    },
    {
      id: 3,
      name: "SHOR-SHARABA",
      image: collection3Img || "/api/placeholder/213/350",
      path: "/collection/shor-sharaba"
    },
    {
      id: 4,
      name: "SPRING-FLING",
      image: collection4Img || "/api/placeholder/213/350",
      path: "/collection/spring-fling"
    },
    {
      id: 5,
      name: "RUT-BAHAR",
      image: collection5Img || "/api/placeholder/213/350",
      path: "/collection/rut-bahar"
    }
  ]
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const carouselRef = useRef(null);

  // Initialize AOS
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      easing: 'ease-in-out'
    });
  }, []);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? collections.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev === collections.length - 1 ? 0 : prev + 1));
  };

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
          {title}
        </h2>

        {/* Desktop View - Always visible on larger screens */}
        <div 
          className="hidden md:flex justify-center gap-2 lg:gap-3 mb-8"
          data-aos="fade-up"
          data-aos-delay="100"
          ref={carouselRef}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {collections.map((collection, index) => (
            <CollectionBox 
              key={collection.id}
              collection={collection}
              index={index}
            />
          ))}
        </div>

        {/* Mobile View - Carousel */}
        <div 
          className="relative md:hidden flex justify-center items-center" 
          ref={carouselRef}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          data-aos="fade-up"
          data-aos-delay="100"
        >
          <div className="overflow-hidden w-full max-w-xs">
            <div 
              className="flex transition-transform duration-300 ease-in-out" 
              style={{ transform: `translateX(-${activeIndex * 100}%)` }}
            >
              {collections.map((collection, index) => (
                <div key={collection.id} className="w-full flex-shrink-0 flex justify-center">
                  <CollectionBox 
                    collection={collection}
                    index={index}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Carousel Controls */}
          <button 
            onClick={handlePrev}
            className="absolute top-1/2 left-0 -translate-y-1/2 bg-cream/80 p-2 rounded-full shadow-custom text-maroon hover:text-darkMaroon"
            aria-label="Previous collection"
          >
            <ChevronLeft size={24} />
          </button>
          
          <button 
            onClick={handleNext}
            className="absolute top-1/2 right-0 -translate-y-1/2 bg-cream/80 p-2 rounded-full shadow-custom text-maroon hover:text-darkMaroon"
            aria-label="Next collection"
          >
            <ChevronRight size={24} />
          </button>

          {/* Carousel Indicators */}
          <div className="flex justify-center mt-4 gap-2 w-full absolute bottom-[-20px]">
            {collections.map((_, index) => (
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
      </div>
    </section>
  );
}

function CollectionBox({ collection, index }) {
  return (
    <Link 
      to={collection.path}
      className="w-full max-w-[213px] h-[400px] flex flex-col group"
      data-aos="fade-up"
      data-aos-delay={100 + (index * 50)}
    >
      <div className="flex-grow overflow-hidden bg-lightPink rounded mb-3">
        <img 
          src={collection.image} 
          alt={collection.name}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
        />
      </div>
      
      {/* Collection Name Button */}
      <Link 
        to={collection.path}
        className="w-full py-2 px-3 bg-maroon text-cream rounded hover:bg-darkMaroon transition-colors font-medium flex items-center justify-center gap-2"
      >
        <span>{collection.name}</span>
        <ArrowRight size={16} className="inline-block" />
      </Link>
    </Link>
  );
}