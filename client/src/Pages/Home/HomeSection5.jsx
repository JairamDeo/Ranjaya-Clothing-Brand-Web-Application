import { useState, useEffect, useRef } from 'react';
// Import desktop images
import banner1 from '../../assets/HomeImg/sucessStorydesktop.webp';
// Import mobile-optimized images
import banner1Mobile from '../../assets/HomeImg/sucessStorymobile.webp';

export default function HomeSection5() {

  // Set up responsive images based on screen size
  const bannerImages = [
    { desktop: banner1, mobile: banner1Mobile },
  ];

  return (
    <div
      className="py-3 relative w-full overflow-hidden"
    >
      <div
      >
        {bannerImages.map((image, index) => (
          <div key={index} className="min-w-full relative">
            {/* Image container with appropriate dimensions */}
            <div className="w-full relative">
              {/* Mobile image - shown only on smaller screens */}
              <img
                src={image.mobile}
                alt={`Banner image ${index + 1}`}
                className="w-full md:hidden object-fit"
                style={{ height: '600px' }}
              />

              {/* Desktop image - hidden on mobile */}
              <img
                src={image.desktop}
                alt={`Banner image ${index + 1}`}
                className="w-full hidden md:block object-fit"
                style={{ height: '475px' }}
              />

            </div>
          </div>
        ))}
      </div>

    </div>
  );
}