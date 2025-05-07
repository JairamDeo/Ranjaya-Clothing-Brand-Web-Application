import React, { useRef, useEffect } from 'react';
import { register } from 'swiper/element/bundle';
// Import videos directly
import video1 from '../../assets/HomeImg/video1.webm';
import video2 from '../../assets/HomeImg/video2.webm';

register();

const HomeSection6 = () => {
  const swiperRef = useRef(null);

  useEffect(() => {
    // Initialize Swiper for mobile only
    const swiperContainer = swiperRef.current;
    
    // Swiper parameters
    const swiperParams = {
      slidesPerView: 1.2,
      spaceBetween: 10,
      breakpoints: {
        640: {
          slidesPerView: 2.2,
          spaceBetween: 15,
        }
      },
      pagination: {
        clickable: true
      }
    };

    // Apply parameters
    Object.assign(swiperContainer, swiperParams);
    
    // Initialize Swiper
    swiperContainer.initialize();
  }, []);

  // Video items array with imported video paths
  const videoItems = [
    { id: 1, title: "Summer Collection", video: video1 },
    { id: 2, title: "Autumn Styles", video: video2 },
  ];

  return (
    <section className="py-16 bg-cream">
      <div className="container mx-auto px-4 md:px-6 lg:px-12">
        <h2 
          className="text-center text-darkBrown text-3xl md:text-4xl font-semibold mb-8"
          data-aos="fade-down"
        >
          SHOP THE LOOK
        </h2>

        {/* Desktop View - Row of 4 boxes */}
        <div className="hidden md:grid md:grid-cols-2 gap-6">
          {videoItems.map((item) => (
            <div 
              key={item.id}
              className=" relative overflow-hidden rounded-lg shadow-custom h-[468px] transition-transform duration-300 hover:scale-[1.02]"
              data-aos="fade-up"
              data-aos-delay={item.id * 100}
            >
              <div className="w-full h-full">
                <video 
                  className="w-full h-full object-cover"
                  autoPlay 
                  muted 
                  loop
                  playsInline
                >
                  <source src={item.video} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-darkBrown/70 to-transparent">
                <h3 className="text-cream text-xl font-medium">{item.title}</h3>
                <button className="mt-2 text-cream hover:text-lightPink transition-colors duration-300 text-sm flex items-center">
                  Shop Now
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile View - Swiper Carousel */}
        <div className="md:hidden">
          <swiper-container 
            ref={swiperRef}
            init="false"
            class="mySwiper"
          >
            {videoItems.map((item) => (
              <swiper-slide key={item.id}>
                <div className="relative overflow-hidden rounded-lg shadow-custom h-[263px]">
                  <div className="w-full h-full">
                    <video 
                      className="w-full h-full object-cover object-center"
                      autoPlay 
                      muted 
                      loop
                      playsInline 
                      preload="auto"
                    >
                      <source src={item.video} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-darkBrown/70 to-transparent">
                    <h3 className="text-cream text-lg font-medium">{item.title}</h3>
                    <button className="mt-2 text-cream hover:text-lightPink transition-colors duration-300 text-sm flex items-center">
                      Shop Now
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                </div>
              </swiper-slide>
            ))}
          </swiper-container>
        </div>
      </div>
    </section>
  );
};

export default HomeSection6;