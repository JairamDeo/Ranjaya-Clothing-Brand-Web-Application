// src/components/ProductCard.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';

/**
 * Reusable ProductCard component
 * @param {Object} product - The product data object
 * @param {number} product.id - Unique product identifier
 * @param {string} product.name - Product name
 * @param {number} product.price - Product price in INR
 * @param {string} product.image - Image URL (or placeholder)
 * @param {string} product.path - URL path for product detail page
 * @param {number} [index] - Optional index for animation sequencing
 * @returns {JSX.Element} The product card component
 */
export default function ProductCard({ product, index }) {
  // Calculate staggered delay based on index position (if provided)
  const aosDelay = index !== undefined ? 300 + (index % 4) * 150 : 0;
  
  // Handle add to cart action
  const handleAddToCart = (e) => {
    e.preventDefault(); // Prevent navigation when clicking the button
    // TODO: Add to cart logic will be implemented by backend
    console.log(`Added ${product.name} to cart`);
  };

  return (
    <div 
      className="flex flex-col group w-full max-w-[300px] mb-6"
      data-aos={index !== undefined ? "fade-up" : ""}
      data-aos-duration={index !== undefined ? "1200" : ""}
      data-aos-delay={aosDelay}
      data-aos-once="true"
      data-aos-anchor-placement="top-bottom"
    >
      {/* Product Image */}
      <Link to={product.path || `/product/${product.id}`} className="w-full h-[400px] overflow-hidden bg-lightPink rounded-t relative">
        <img 
          src={product.image || "/api/placeholder/300/400"} 
          alt={product.name || "Product"}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        {/* Hover overlay */}
        <div className="absolute inset-0 bg-darkMaroon/0 group-hover:bg-darkMaroon/10 transition-all duration-700"></div>
      </Link>
      
      {/* Product Details */}
      <div className="p-4 border-x border-b border-maroon-20 rounded-b bg-cream">
        {/* Product name */}
        <Link to={product.path || `/product/${product.id}`}>
          <h3 className="text-lg font-medium text-darkBrown group-hover:text-maroon transition-colors duration-300">
            {product.name || "Product Name"}
          </h3>
        </Link>
        <p className="text-maroon font-semibold mt-1">
          ₹{(product.price || 0).toLocaleString()}
        </p>
        
        {/* Add to Cart Button */}
        <button 
          className="w-full py-2 px-3 bg-maroon text-cream rounded hover:bg-darkMaroon transition-colors font-medium mt-3 flex items-center justify-center gap-2"
          onClick={handleAddToCart}
        >
          <ShoppingCart size={18} className="transform group-hover:scale-110 transition-transform duration-300" />
          <span>ADD TO CART</span>
        </button>
      </div>
    </div>
  );
}