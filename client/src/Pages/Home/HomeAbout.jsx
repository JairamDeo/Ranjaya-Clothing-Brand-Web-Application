import React from 'react';
import { Link } from 'react-router-dom';

import OwnerImg from '../../assets/AboutUsImg/HomeAbout.webp';

const HomeAbout = () => {
  return (
    <section className="py-16 bg-cream" aria-labelledby="about-us-heading">
      <div className="container mx-auto px-4 md:px-6 lg:px-12">
        <div className="flex flex-col-reverse md:flex-row md:items-center md:gap-12">
          {/* Image Section */}
          <div
            className="w-full md:w-1/2 mt-8 md:mt-0"
            data-aos="fade-right"
            data-aos-duration="800"
          >
            <div
              className="relative w-full max-w-[500px] h-[300px] md:h-[500px] mx-auto overflow-hidden rounded-lg shadow-custom"
              role="img"
              aria-label="Founder Mehek Mandhana"
            >
              <img
                src={OwnerImg}
                alt="Founder Mehek Mandhana"
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-maroon/10 hover:bg-maroon/0 transition-colors duration-300" />
            </div>
          </div>

          {/* Text Content */}
          <div
            className="w-full md:w-1/2"
            data-aos="fade-left"
            data-aos-duration="800"
          >
            <h2
              id="about-us-heading"
              className="text-center md:text-left text-darkBrown text-3xl md:text-4xl font-semibold mb-6"
              data-aos="fade-up"
            >
              ABOUT US
            </h2>
            <p className="text-darkBrown mb-6 text-base text-justify md:text-lg leading-relaxed">
              Welcome to Ranjaya, a brand founded by Mehek Mandhana. She seamlessly blended her father's 30 years of expertise with her own passion for design and storytelling to create Ranjaya. Her unique vision and dedication transformed their rich legacy into a brand that celebrates heritage with a modern twist.
            </p>
            <div className="text-center md:text-left">
              <Link
                to="/about-us"
                className="inline-block px-6 py-3 bg-maroon text-cream rounded hover:bg-darkMaroon transition-colors duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-maroon focus:ring-offset-2"
                data-aos="fade-up"
                data-aos-delay="200"
              >
                Read More
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeAbout;
