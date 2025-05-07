// No changes to imports, comments, or design
import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import ProductCard from './ProductCard';

export default function ProductCarouselSection({ title, products, viewAllLink }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const carouselRef = useRef(null);

  const getItemsPerSlide = () => {
    if (typeof window !== 'undefined') {
      if (window.innerWidth >= 1280) return 4;
      if (window.innerWidth >= 1024) return 3;
      if (window.innerWidth >= 768) return 2;
      return 1;
    }
    return 4;
  };

  const [itemsPerSlide, setItemsPerSlide] = useState(getItemsPerSlide());

  useEffect(() => {
    const handleResize = () => {
      setItemsPerSlide(getItemsPerSlide());
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const totalSlides = Math.ceil(products.length / itemsPerSlide);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? totalSlides - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev === totalSlides - 1 ? 0 : prev + 1));
  };

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
    <section className="bg-cream px-4 py-6 md:px-6 lg:px-12" aria-label={title}>
      <div className="container mx-auto">
        {/* Section Heading */}
        <h2 
          className="text-center text-darkBrown text-3xl md:text-4xl font-semibold mb-8"
          data-aos="fade-down"
        >
          {title}
        </h2>

        {/* Carousel Container */}
        <div 
          className="relative"
          ref={carouselRef}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          data-aos="fade-up"
          data-aos-delay="100"
          role="region"
          aria-roledescription="carousel"
          aria-label={`${title} carousel`}
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
                  role="group"
                  aria-roledescription="slide"
                  aria-label={`Slide ${slideIndex + 1} of ${totalSlides}`}
                >
                  {products.slice(
                    slideIndex * itemsPerSlide, 
                    (slideIndex + 1) * itemsPerSlide
                  ).map((product) => (
                    <ProductCard 
                      key={product.id} 
                      product={product}
                      aria-label={`Product: ${product.name || 'Unnamed Product'}`}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* Carousel Controls */}
          <button 
            onClick={handlePrev}
            className="absolute top-1/2 left-2 -translate-y-1/2 bg-cream/90 p-2 rounded-full shadow-custom text-maroon hover:text-darkMaroon focus:outline-none focus:ring-2 focus:ring-maroon z-10"
            aria-label="Previous Slide"
          >
            <ChevronLeft size={28} />
          </button>

          <button 
            onClick={handleNext}
            className="absolute top-1/2 right-2 -translate-y-1/2 bg-cream/90 p-2 rounded-full shadow-custom text-maroon hover:text-darkMaroon focus:outline-none focus:ring-2 focus:ring-maroon z-10"
            aria-label="Next Slide"
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
                } focus:outline-none focus:ring-1 focus:ring-maroon`}
                aria-label={`Go to slide ${index + 1}`}
                aria-current={activeIndex === index}
              />
            ))}
          </div>
        </div>

        {/* View All Button */}
        <div className="flex justify-center mt-8">
          <Link 
            to={viewAllLink}
            className="px-6 py-3 bg-maroon text-cream rounded hover:bg-darkMaroon transition-colors font-medium focus:outline-none focus:ring-2 focus:ring-maroon"
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
