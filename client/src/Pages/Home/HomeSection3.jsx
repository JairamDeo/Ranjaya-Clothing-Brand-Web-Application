import React from 'react';
import ProductCarouselSection from '../../components/ProductCarouselSection';

export default function HomeSection3() {
  // Products data - This will be replaced with API data from backend
  // Sample product for development purposes
  const products = [
    {
      id: 1,
      name: "Featured Product", // Placeholder name come from backend
      price: 0, // Placeholder price come from backend
      image: "/api/placeholder/300/400", // Placeholder image come from backend
      path: "/product/featured-product" // Placeholder path
    },
    // Backend will populate this array with actual products
    // Additional products will appear in the carousel automatically
  ];

  return (
    <ProductCarouselSection 
      title="FEATURED COLLECTION"
      products={products}
      viewAllLink="/collections/all"
    />
  );
}
