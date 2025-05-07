import React from 'react';
import ProductCarouselSection from '../../components/ProductCarouselSection';

export default function HomeSection4() {
  // Products data - This will be replaced with API data from backend
  // Sample product for development purposes
  const products = [
    {
      id: 1,
      name: "", // Placeholder name come from backend
      price: null, // Placeholder price come from backend
      image: "/api/placeholder/300/400", // Placeholder image come from backend
      path: "/product/ranjaya-favourite" // Placeholder path
    }
    // Backend will populate this array with actual products
    // Additional products will appear in the carousel automatically
  ];
  
  return (
    <ProductCarouselSection 
      title="RANJAYA FAVOURITES"
      products={products}
      viewAllLink="/collections/all"
    />
  );
}