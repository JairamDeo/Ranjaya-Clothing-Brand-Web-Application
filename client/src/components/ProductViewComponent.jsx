// src/components/ProductViewComponent.jsx
import React, { useState, useEffect } from 'react';
import { ShoppingCart, ChevronRight, ChevronLeft, Minus, Plus, Check, X } from 'lucide-react';
import YouMayAlsoLikeSection from './YouMayAlsoLikeSection';
import AddToCartGif from '../assets/add-to-cart-animation.gif';

/**
 * ProductViewComponent displays detailed product information
 * @param {Object} props - Component props
 * @param {string|number} props.productId - ID of the product to display
 * @returns {JSX.Element} - The product view component
 */
export default function ProductViewComponent({ productId }) {
  // Product data state - will be fetched from backend
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('details');
  const [quantity, setQuantity] = useState(1);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [showAddedAnimation, setShowAddedAnimation] = useState(false);
  const [showAddToCartModal, setShowAddToCartModal] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  
  // Check viewport width for responsive layout
  useEffect(() => {
    const checkWidth = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkWidth();
    window.addEventListener('resize', checkWidth);
    
    return () => window.removeEventListener('resize', checkWidth);
  }, []);
  
  // Mock fetch product data - This will be replaced with actual API call
  useEffect(() => {
    // Simulate API fetch delay
    const timer = setTimeout(() => {
      // This is placeholder data that would come from backend
      setProduct({
        id: productId,
        name: "", // Will come from backend
        price: null, // Will come from backend
        images: [
          "/api/placeholder/600/800", // Main product image
          "/api/placeholder/600/800?text=Image+2", // Additional product images
          "/api/placeholder/600/800?text=Image+3",
          "/api/placeholder/600/800?text=Image+4",
          "/api/placeholder/600/800?text=Image+5"
        ],
        details: "", // Will come from backend
        description: "", // Will come from backend
        dispatchInfo: "", // Will come from backend
        disclaimer: "", // Will come from backend
        washCare: "" // Will come from backend
      });
      setLoading(false);
    }, 500);
    
    return () => clearTimeout(timer);
  }, [productId]);
  
  // Handle quantity change
  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };
  
  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };
  
  // Calculate total price based on quantity
  const calculateTotalPrice = () => {
    if (!product || !product.price) return null;
    return (product.price * quantity).toLocaleString();
  };
  
  // Handle add to cart with animation and modal
  const handleAddToCart = () => {
    // This will be integrated with cart functionality from backend
    console.log(`Added ${quantity} ${product?.name} to cart`);
    
    // Show animation
    setShowAddedAnimation(true);
    
    // Show modal
    setShowAddToCartModal(true);
    
    // Hide animation after 2 seconds
    setTimeout(() => {
      setShowAddedAnimation(false);
    }, 2000);
  };
  
  // Handle buy now
  const handleBuyNow = () => {
    // Add to cart and redirect to checkout
    handleAddToCart();
    console.log('Redirecting to checkout...');
    // Redirect logic will be added here
  };
  
  // Handle thumbnail click
  const handleThumbnailClick = (index) => {
    setActiveImageIndex(index);
  };
  
  // Next/Prev thumbnails
  const handleNextThumbnail = () => {
    if (!product) return;
    setActiveImageIndex((prev) => (prev === product.images.length - 1 ? 0 : prev + 1));
  };
  
  const handlePrevThumbnail = () => {
    if (!product) return;
    setActiveImageIndex((prev) => (prev === 0 ? product.images.length - 1 : prev - 1));
  };
  
  // Handle tab change
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };
  
  // Close the add to cart modal
  const closeAddToCartModal = () => {
    setShowAddToCartModal(false);
  };
  
  // Loading state
  if (loading) {
    return (
      <div className="container mx-auto px-4 md:px-6 lg:px-12 py-8">
        <div className="flex justify-center items-center h-96">
          <div className="text-darkBrown">Loading product information...</div>
        </div>
      </div>
    );
  }
  
  // If product wasn't found
  if (!product) {
    return (
      <div className="container mx-auto px-4 md:px-6 lg:px-12 py-8">
        <div className="flex flex-col justify-center items-center h-96">
          <h2 className="text-2xl text-darkBrown mb-4">Product Not Found</h2>
          <p className="text-darkBrown">The product you're looking for might be unavailable or removed.</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="bg-cream">
      <div className="container mx-auto px-4 md:px-6 lg:px-12 py-8">
        {/* Breadcrumb */}
        <div className="mb-6 text-sm flex items-center text-darkBrown/70">
          <span className="hover:text-maroon transition-colors cursor-pointer">Home</span>
          <ChevronRight size={16} className="mx-2" />
          <span className="hover:text-maroon transition-colors cursor-pointer">Products</span>
          <ChevronRight size={16} className="mx-2" />
          <span className="text-maroon font-medium">{product.name || "Product Details"}</span>
        </div>
        
        {/* Product View Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Product Images */}
          <div className="space-y-6" data-aos="fade-right">
            {/* Main Image */}
            <div className="bg-lightPink rounded-lg overflow-hidden h-[500px] sm:h-[600px] flex items-center justify-center shadow-custom">
              <img 
                src={product.images[activeImageIndex]} 
                alt={product.name || "Product Image"} 
                className="w-full h-full object-contain transition-all duration-500 hover:scale-105"
              />
            </div>
            
            {/* Enhanced Thumbnail Carousel - Mobile & Desktop Variations */}
            <div className="relative">
              {/* Mobile layout: navigation buttons below thumbnails */}
              {isMobile ? (
                <>
                  {/* Thumbnails */}
                  <div className="flex justify-center space-x-3 overflow-x-auto pb-2 px-2">
                    {product.images.map((image, index) => (
                      <button
                        key={index}
                        onClick={() => handleThumbnailClick(index)}
                        className={`relative flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden transition-all duration-300 ${
                          activeImageIndex === index 
                            ? 'ring-2 ring-maroon scale-105 shadow-lg' 
                            : 'opacity-80 hover:opacity-100'
                        }`}
                      >
                        <img 
                          src={image} 
                          alt={`${product.name || "Product"} thumbnail ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                        {activeImageIndex === index && (
                          <div className="absolute inset-0 bg-maroon bg-opacity-10 border-2 border-maroon"></div>
                        )}
                      </button>
                    ))}
                  </div>
                  
                  {/* Navigation buttons - Below for mobile */}
                  <div className="flex justify-center space-x-4 mt-3">
                    <button 
                      onClick={handlePrevThumbnail}
                      className="bg-cream p-2 rounded-full shadow-custom text-maroon hover:text-darkMaroon hover:bg-lightPink transition-all duration-300 hover:scale-110"
                      aria-label="Previous image"
                    >
                      <ChevronLeft size={24} />
                    </button>
                    <button 
                      onClick={handleNextThumbnail}
                      className="bg-cream p-2 rounded-full shadow-custom text-maroon hover:text-darkMaroon hover:bg-lightPink transition-all duration-300 hover:scale-110"
                      aria-label="Next image"
                    >
                      <ChevronRight size={24} />
                    </button>
                  </div>
                </>
              ) : (
                // Desktop layout: navigation buttons on sides
                <>
                  {/* Prev Button */}
                  <button 
                    onClick={handlePrevThumbnail}
                    className="absolute -left-3 top-1/2 -translate-y-1/2 bg-cream p-2 rounded-full shadow-custom text-maroon hover:text-darkMaroon hover:bg-lightPink z-10 transition-all duration-300 hover:scale-110"
                    aria-label="Previous image"
                  >
                    <ChevronLeft size={24} />
                  </button>
                  
                  {/* Thumbnails with improved styling */}
                  <div className="mx-10 relative">
                    <div className="flex justify-center space-x-4">
                      {product.images.map((image, index) => (
                        <button
                          key={index}
                          onClick={() => handleThumbnailClick(index)}
                          className={`relative flex-shrink-0 w-16 h-16 md:w-20 md:h-20 rounded-lg overflow-hidden transition-all duration-300 ${
                            activeImageIndex === index 
                              ? 'ring-2 ring-maroon scale-105 shadow-lg' 
                              : 'opacity-80 hover:opacity-100'
                          }`}
                        >
                          <img 
                            src={image} 
                            alt={`${product.name || "Product"} thumbnail ${index + 1}`}
                            className="w-full h-full object-cover"
                          />
                          {activeImageIndex === index && (
                            <div className="absolute inset-0 bg-maroon bg-opacity-10 border-2 border-maroon"></div>
                          )}
                        </button>
                      ))}
                    </div>
                    {/* Decorative element */}
                    <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-16 h-1 bg-maroon rounded-full"></div>
                  </div>
                  
                  {/* Next Button */}
                  <button 
                    onClick={handleNextThumbnail}
                    className="absolute -right-3 top-1/2 -translate-y-1/2 bg-cream p-2 rounded-full shadow-custom text-maroon hover:text-darkMaroon hover:bg-lightPink z-10 transition-all duration-300 hover:scale-110"
                    aria-label="Next image"
                  >
                    <ChevronRight size={24} />
                  </button>
                </>
              )}
            </div>
          </div>
          
          {/* Product Info */}
          <div className="flex flex-col" data-aos="fade-left">
            {/* Product Name */}
            <h1 className="text-3xl font-semibold text-darkBrown mb-2">{product.name || "Product Name"}</h1>
            
            {/* Price */}
            <div className="text-2xl font-semibold text-maroon mb-6">
              ₹{product.price ? calculateTotalPrice() : "Price unavailable"}
            </div>
            
            {/* Divider */}
            <div className="border-t border-maroon-20 mb-6"></div>
            
            {/* Quantity Selector with improved styling */}
            <div className="mb-6">
              <label className="block text-darkBrown mb-2 font-medium">Quantity</label>
              <div className="flex items-center max-w-xs">
                <button 
                  onClick={decreaseQuantity}
                  className="p-2 border border-maroon-20 rounded-l text-darkBrown hover:bg-lightPink transition-colors hover:text-maroon"
                  disabled={quantity <= 1}
                  aria-label="Decrease quantity"
                >
                  <Minus size={18} className={quantity <= 1 ? "opacity-50" : ""} />
                </button>
                <div className="px-6 py-2 border-t border-b border-maroon-20 text-center min-w-[60px] bg-cream">
                  {quantity}
                </div>
                <button 
                  onClick={increaseQuantity}
                  className="p-2 border border-maroon-20 rounded-r text-darkBrown hover:bg-lightPink transition-colors hover:text-maroon"
                  aria-label="Increase quantity"
                >
                  <Plus size={18} />
                </button>
              </div>
            </div>
            
            {/* Actions with add to cart animation */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8 relative">
              <button 
                className="flex-1 px-6 py-3 bg-maroon text-cream rounded hover:bg-darkMaroon transition-all duration-300 font-medium flex items-center justify-center gap-2 hover:shadow-md group relative overflow-hidden"
                onClick={handleAddToCart}
              >
                {showAddedAnimation ? (
                  <>
                    <div className="absolute inset-0 flex items-center justify-center bg-darkMaroon">
                      <Check size={24} className="mr-2" />
                      <span>ADDED TO CART!</span>
                    </div>
                    <div className="flex items-center justify-center opacity-0">
                      <ShoppingCart size={18} />
                      <span>ADD TO CART</span>
                    </div>
                  </>
                ) : (
                  <>
                    <ShoppingCart size={18} className="transform group-hover:scale-110 transition-transform duration-300" />
                    <span>ADD TO CART</span>
                  </>
                )}
              </button>
              
              <button 
                className="flex-1 px-6 py-3 bg-darkBrown text-cream rounded hover:bg-darkBrown/80 transition-all duration-300 font-medium hover:shadow-md"
                onClick={handleBuyNow}
              >
                BUY NOW
              </button>
            </div>
            
            {/* Product Info Tabs with enhanced design */}
            <div className="border border-maroon-20 rounded-lg overflow-hidden shadow-custom">
              {/* Tab Headers */}
              <div className="flex flex-wrap border-b border-maroon-20 bg-lightPink/30">
                {['details', 'description', 'dispatch', 'disclaimer', 'washcare'].map((tab) => (
                  <button 
                    key={tab}
                    className={`px-4 py-3 text-sm font-medium transition-all duration-300 ${
                      activeTab === tab 
                        ? 'bg-maroon text-cream shadow-md' 
                        : 'bg-cream/80 text-darkBrown hover:bg-lightPink'
                    }`}
                    onClick={() => handleTabChange(tab)}
                  >
                    {tab === 'details' && 'Product Details'}
                    {tab === 'description' && 'Description'}
                    {tab === 'dispatch' && 'Dispatch Information'}
                    {tab === 'disclaimer' && 'Disclaimer'}
                    {tab === 'washcare' && 'Wash Care'}
                  </button>
                ))}
              </div>
              
              {/* Tab Content with improved styling */}
              <div className="p-6 bg-cream">
                {activeTab === 'details' && (
                  <div className="text-darkBrown leading-relaxed">
                    {product.details || "Product details will be displayed here."}
                  </div>
                )}
                {activeTab === 'description' && (
                  <div className="text-darkBrown leading-relaxed">
                    {product.description || "Product description will be displayed here."}
                  </div>
                )}
                {activeTab === 'dispatch' && (
                  <div className="text-darkBrown leading-relaxed">
                    {product.dispatchInfo || "Dispatch information will be displayed here."}
                  </div>
                )}
                {activeTab === 'disclaimer' && (
                  <div className="text-darkBrown leading-relaxed">
                    {product.disclaimer || "Disclaimer information will be displayed here."}
                  </div>
                )}
                {activeTab === 'washcare' && (
                  <div className="text-darkBrown leading-relaxed">
                    {product.washCare || "Wash care instructions will be displayed here."}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        
        {/* You May Also Like Section */}
        <div className="mt-16">
          <YouMayAlsoLikeSection currentProductId={productId} />
        </div>
      </div>
      
      {/* Add to Cart Success Modal */}
      {showAddToCartModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-darkBrown/50">
          <div 
            className="bg-cream rounded-lg shadow-lg max-w-md w-full mx-4 p-6 animate-fadeIn relative"
            data-aos="zoom-in"
            data-aos-duration="500"
          >
            {/* Close button */}
            <button 
              onClick={closeAddToCartModal}
              className="absolute top-2 right-2 p-2 text-darkBrown hover:text-maroon transition-colors"
              aria-label="Close modal"
            >
              <X size={20} />
            </button>
            
            {/* Success content */}
            <div className="flex flex-col items-center text-center">
              <div className="mb-4 w-32 h-32 flex items-center justify-center">
                <img 
                  src={AddToCartGif} 
                  alt="Item added to cart" 
                  className="w-full h-full object-contain"
                />
              </div>
              
              <h3 className="text-xl font-semibold text-darkBrown mb-2">
                Item Added Successfully!
              </h3>
              
              <p className="text-darkBrown/80 mb-6">
                {product.name || "Your product"} has been added to your cart.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 w-full">
                <button 
                  onClick={closeAddToCartModal}
                  className="flex-1 px-4 py-2 border border-maroon rounded text-maroon hover:bg-lightPink transition-all duration-300"
                >
                  Continue Shopping
                </button>
                
                <button 
                  className="flex-1 px-4 py-2 bg-maroon text-cream rounded hover:bg-darkMaroon transition-all duration-300"
                  onClick={() => {
                    closeAddToCartModal();
                    // Redirect to cart page - will be implemented
                    // console.log('Redirecting to cart...');
                  }}
                >
                  Go to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}