import React, { useState, useEffect, useRef } from 'react';
import { Heart, Share2, ChevronRight, Minus, Plus, ShoppingCart, ArrowRight, X, ChevronLeft, ChevronRight as ChevronRightIcon, Check } from 'lucide-react';

import AddToCartAnimationGif from "../assets/add-to-cart-animation.gif"

export default function ProductView({ productId }) {
  // In a real implementation, you would fetch this data from your backend based on productId
  // For now using static data for demonstration
  const [product, setProduct] = useState({
    id: 1,
    name: "VANRAAG Embroidered Kurti",
    price: 1271,
    discountPrice: 1499,
    discount: "15% OFF",
    rating: 4.2,
    reviews: 128,
    colors: ["#993f3c", "#4a3e3e", "#d4af37", "#000000"],
    sizes: ["XS", "S", "M", "L", "XL"],
    images: [
      "/api/placeholder/600/800",
      "/api/placeholder/600/800",
      "/api/placeholder/600/800",
      "/api/placeholder/600/800",
      "/api/placeholder/600/800"
    ],
    description: "Elevate your ethnic wardrobe with this intricately embroidered kurti. Crafted from premium cotton blend fabric, this piece offers both comfort and style for any occasion.",
    details: [
      "Premium cotton blend fabric",
      "Traditional embroidery on neckline and sleeves",
      "Straight cut silhouette",
      "Three-quarter length sleeves",
      "Side slits for comfort"
    ],
    deliveryInfo: "Free delivery for orders above ₹999. Standard delivery in 5-7 business days.",
    careInstructions: "Gentle machine wash with like colors. Use mild detergent. Do not bleach. Line dry in shade. Warm iron on reverse."
  });

  // State variables
  const [mainImage, setMainImage] = useState(product.images[0]);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [selectedSize, setSelectedSize] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');
  const [isFavorite, setIsFavorite] = useState(false);
  const [showSizeGuide, setShowSizeGuide] = useState(false);
  const [currentCarouselIndex, setCurrentCarouselIndex] = useState(0);
  const [showAddToCartAnimation, setShowAddToCartAnimation] = useState(false);
  const carouselRef = useRef(null);

  // Handle quantity change
  const decreaseQuantity = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  // Calculate total price based on quantity
  const totalPrice = product.price * quantity;

  // Add to cart function
  const addToCart = () => {
    if (!selectedSize) {
      alert("Please select a size");
      return;
    }
    
    console.log("Added to cart:", {
      ...product,
      selectedColor,
      selectedSize,
      quantity,
      totalPrice
    });
    
    // Show success animation
    setShowAddToCartAnimation(true);
    
    // Hide animation after 3 seconds
    setTimeout(() => {
      setShowAddToCartAnimation(false);
    }, 3000);
    
    // In a real app, you would dispatch to your cart state/store here
  };

  // Buy now function
  const buyNow = () => {
    if (!selectedSize) {
      alert("Please select a size");
      return;
    }
    
    console.log("Buy now:", {
      ...product,
      selectedColor,
      selectedSize,
      quantity,
      totalPrice
    });
    // In a real app, you would redirect to checkout
  };

  // Size guide modal content
  const SizeGuideModal = () => (
    <div className="fixed inset-0 bg-darkBrown bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-cream rounded-lg shadow-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-4 border-b border-maroon-20">
          <h3 className="text-xl font-semibold text-darkBrown">Size Guide</h3>
          <button 
            onClick={() => setShowSizeGuide(false)}
            className="p-2 rounded-full hover:bg-lightPink text-maroon"
          >
            <X size={20} />
          </button>
        </div>
        <div className="p-6">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-lightPink">
                  <th className="border border-maroon-20 p-3 text-left text-darkBrown">Size</th>
                  <th className="border border-maroon-20 p-3 text-left text-darkBrown">Bust (inches)</th>
                  <th className="border border-maroon-20 p-3 text-left text-darkBrown">Waist (inches)</th>
                  <th className="border border-maroon-20 p-3 text-left text-darkBrown">Hip (inches)</th>
                  <th className="border border-maroon-20 p-3 text-left text-darkBrown">Length (inches)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-maroon-20 p-3 text-darkBrown font-medium">XS</td>
                  <td className="border border-maroon-20 p-3 text-darkBrown">34</td>
                  <td className="border border-maroon-20 p-3 text-darkBrown">26</td>
                  <td className="border border-maroon-20 p-3 text-darkBrown">36</td>
                  <td className="border border-maroon-20 p-3 text-darkBrown">38</td>
                </tr>
                <tr className="bg-cream">
                  <td className="border border-maroon-20 p-3 text-darkBrown font-medium">S</td>
                  <td className="border border-maroon-20 p-3 text-darkBrown">36</td>
                  <td className="border border-maroon-20 p-3 text-darkBrown">28</td>
                  <td className="border border-maroon-20 p-3 text-darkBrown">38</td>
                  <td className="border border-maroon-20 p-3 text-darkBrown">39</td>
                </tr>
                <tr>
                  <td className="border border-maroon-20 p-3 text-darkBrown font-medium">M</td>
                  <td className="border border-maroon-20 p-3 text-darkBrown">38</td>
                  <td className="border border-maroon-20 p-3 text-darkBrown">30</td>
                  <td className="border border-maroon-20 p-3 text-darkBrown">40</td>
                  <td className="border border-maroon-20 p-3 text-darkBrown">40</td>
                </tr>
                <tr className="bg-cream">
                  <td className="border border-maroon-20 p-3 text-darkBrown font-medium">L</td>
                  <td className="border border-maroon-20 p-3 text-darkBrown">40</td>
                  <td className="border border-maroon-20 p-3 text-darkBrown">32</td>
                  <td className="border border-maroon-20 p-3 text-darkBrown">42</td>
                  <td className="border border-maroon-20 p-3 text-darkBrown">41</td>
                </tr>
                <tr>
                  <td className="border border-maroon-20 p-3 text-darkBrown font-medium">XL</td>
                  <td className="border border-maroon-20 p-3 text-darkBrown">42</td>
                  <td className="border border-maroon-20 p-3 text-darkBrown">34</td>
                  <td className="border border-maroon-20 p-3 text-darkBrown">44</td>
                  <td className="border border-maroon-20 p-3 text-darkBrown">42</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="mt-6">
            <h4 className="font-medium text-darkBrown mb-2">How to Measure</h4>
            <ul className="list-disc pl-5 text-darkBrown space-y-2">
              <li><strong>Bust:</strong> Measure around the fullest part of your bust.</li>
              <li><strong>Waist:</strong> Measure around your natural waistline.</li>
              <li><strong>Hip:</strong> Measure around the fullest part of your hips.</li>
              <li><strong>Length:</strong> Measure from shoulder to hem.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );

  // Carousel functions
  const handlePrevSlide = () => {
    setCurrentCarouselIndex(prevIndex => 
      prevIndex === 0 ? Math.ceil(product.images.length / 4) - 1 : prevIndex - 1
    );
  };

  const handleNextSlide = () => {
    setCurrentCarouselIndex(prevIndex => 
      prevIndex === Math.ceil(product.images.length / 4) - 1 ? 0 : prevIndex + 1
    );
  };
  
  // Calculate visible images based on carousel index
  const getVisibleImages = () => {
    const itemsPerPage = 4; // Display 4 thumbnails at a time
    const startIndex = currentCarouselIndex * itemsPerPage;
    return product.images.slice(startIndex, startIndex + itemsPerPage);
  };

  // Initialize AOS or other effects when component mounts
  useEffect(() => {
    if (typeof AOS !== 'undefined') {
      AOS.refresh();
    }
  }, []);

  return (
    <section className="bg-cream px-4 py-6 md:px-6 lg:px-12">
      <div className="container mx-auto">
        {/* Breadcrumb Navigation */}
        <nav className="mb-6 text-sm flex items-center gap-1 overflow-x-auto whitespace-nowrap pb-2" aria-label="Breadcrumb">
          <a href="/" className="text-darkBrown hover:text-maroon">Home</a>
          <ChevronRight size={14} className="text-darkBrown" />
          <a href="/new-arrivals" className="text-darkBrown hover:text-maroon">New Arrivals</a>
          <ChevronRight size={14} className="text-darkBrown" />
          <span className="text-maroon font-medium truncate max-w-xs">{product.name}</span>
        </nav>

        {/* Product Display - Main Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12"
             data-aos="fade-up" 
             data-aos-duration="1000" 
             data-aos-once="true">
          
          {/* Left: Image Gallery */}
          <div className="flex flex-col gap-4">
            {/* Main Image */}
            <div className="bg-lightPink rounded overflow-hidden relative w-full h-80 sm:h-96 md:h-[500px] lg:h-[600px]">
              <img 
                src={mainImage} 
                alt={product.name}
                className="w-full h-full object-cover"
              />
              
              {/* Favorite & Share Buttons */}
              <div className="absolute top-4 right-4 flex flex-col gap-2">
                <button 
                  onClick={() => setIsFavorite(!isFavorite)}
                  className={`p-2 rounded-full ${isFavorite ? 'bg-maroon text-cream' : 'bg-cream text-maroon'} hover:bg-maroon hover:text-cream transition-colors duration-300 shadow-custom`}
                >
                  <Heart size={20} fill={isFavorite ? "#fefdf9" : "none"} />
                </button>
                <button className="p-2 rounded-full bg-cream text-maroon hover:bg-maroon hover:text-cream transition-colors duration-300 shadow-custom">
                  <Share2 size={20} />
                </button>
              </div>
            </div>
            
            {/* Thumbnail Carousel - Now below main image */}
            <div className="relative">
              <div 
                ref={carouselRef} 
                className="flex justify-center gap-2 pb-2 overflow-hidden"
              >
                {getVisibleImages().map((img, index) => (
                  <button 
                    key={index}
                    onClick={() => setMainImage(img)}
                    className={`min-w-16 h-16 sm:w-20 sm:h-20 border ${
                      mainImage === img ? 'border-maroon' : 'border-maroon-20'
                    } rounded overflow-hidden transition-transform duration-300`}
                  >
                    <img 
                      src={img} 
                      alt={`${product.name} view ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
                
              {/* Carousel Navigation Buttons */}
              <button 
                onClick={handlePrevSlide}
                className="absolute left-0 top-1/2 -translate-y-1/2 p-1 bg-cream bg-opacity-80 text-maroon rounded-full shadow-custom hover:bg-maroon hover:text-cream transition-colors"
                aria-label="Previous images"
              >
                <ChevronLeft size={20} />
              </button>
              
              <button 
                onClick={handleNextSlide}
                className="absolute right-0 top-1/2 -translate-y-1/2 p-1 bg-cream bg-opacity-80 text-maroon rounded-full shadow-custom hover:bg-maroon hover:text-cream transition-colors"
                aria-label="Next images"
              >
                <ChevronRightIcon size={20} />
              </button>
              
              {/* Carousel Indicators */}
              <div className="flex justify-center mt-2 gap-1">
                {[...Array(Math.ceil(product.images.length / 4))].map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentCarouselIndex(index)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      currentCarouselIndex === index 
                        ? 'bg-maroon w-4' 
                        : 'bg-maroon-20 hover:bg-maroon hover:opacity-60'
                    }`}
                    aria-label={`Go to image set ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
          
          {/* Right: Product Details */}
          <div>
            <h1 className="text-2xl md:text-3xl font-semibold text-darkBrown">{product.name}</h1>
            
            {/* Ratings */}
            <div className="mt-2 flex items-center gap-2">
              <div className="bg-green-600 text-white text-sm px-2 py-0.5 rounded font-medium flex items-center gap-1">
                {product.rating} ★
              </div>
              <span className="text-darkBrown text-sm">{product.reviews} Reviews</span>
            </div>
            
            {/* Price */}
            <div className="mt-4 flex items-center gap-2">
              <span className="text-xl md:text-2xl font-bold text-maroon">
                ₹{totalPrice}
              </span>
              {product.discountPrice && (
                <>
                  <span className="text-gray-500 line-through">
                    ₹{product.discountPrice * quantity}
                  </span>
                  <span className="text-green-600 font-medium">{product.discount}</span>
                </>
              )}
            </div>
            
            {/* Color Selection */}
            <div className="mt-6">
              <h3 className="font-medium text-darkBrown mb-2">Color</h3>
              <div className="flex gap-3">
                {product.colors.map((color, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedColor(color)}
                    className={`w-8 h-8 rounded-full border-2 ${selectedColor === color ? 'border-maroon' : 'border-transparent'} transition-all`}
                    style={{ background: color }}
                    aria-label={`Select color ${index + 1}`}
                  />
                ))}
              </div>
            </div>
            
            {/* Size Selection */}
            <div className="mt-6">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-medium text-darkBrown">Size</h3>
                <button 
                  className="text-maroon text-sm hover:underline"
                  onClick={() => setShowSizeGuide(true)}
                >
                  Size Guide
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`min-w-12 h-10 px-3 rounded border ${
                      selectedSize === size 
                        ? 'border-maroon bg-lightPink text-maroon' 
                        : 'border-maroon-20 hover:border-maroon text-darkBrown'
                    } font-medium transition-all`}
                  >
                    {size}
                  </button>
                ))}
              </div>
              {/* Size guide message */}
              {!selectedSize && (
                <p className="text-sm text-maroon mt-2">Please select a size</p>
              )}
            </div>
            
            {/* Quantity */}
            <div className="mt-6">
              <h3 className="font-medium text-darkBrown mb-2">Quantity</h3>
              <div className="flex items-center border border-maroon-20 rounded w-fit">
                <button 
                  onClick={decreaseQuantity}
                  className="px-3 py-2 text-maroon hover:bg-lightPink transition-colors"
                  disabled={quantity <= 1}
                >
                  <Minus size={18} />
                </button>
                <span className="px-6 py-2 font-medium text-darkBrown">{quantity}</span>
                <button 
                  onClick={increaseQuantity}
                  className="px-3 py-2 text-maroon hover:bg-lightPink transition-colors"
                >
                  <Plus size={18} />
                </button>
              </div>
            </div>
            
            {/* Action Buttons */}
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <button 
                onClick={addToCart}
                className="flex-1 py-3 bg-cream border-2 border-maroon text-maroon rounded hover:bg-lightPink transition-colors duration-300 font-medium flex items-center justify-center gap-2"
              >
                <ShoppingCart size={20} />
                <span>ADD TO CART</span>
              </button>
              <button 
                onClick={buyNow}
                className="flex-1 py-3 bg-maroon text-cream rounded hover:bg-darkMaroon transition-colors duration-300 font-medium flex items-center justify-center gap-2"
              >
                <span>BUY NOW</span>
                <ArrowRight size={20} />
              </button>
            </div>
            
            {/* Delivery Info */}
            <div className="mt-6 p-4 bg-lightPink rounded border border-maroon-20">
              <p className="text-darkBrown">{product.deliveryInfo}</p>
            </div>
          </div>
        </div>
        
        {/* Product Details Tabs */}
        <div className="mt-12" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="200" data-aos-once="true">
          {/* Tab Navigation */}
          <div className="flex overflow-x-auto border-b border-maroon-20">
            <button 
              onClick={() => setActiveTab('description')}
              className={`px-4 py-3 font-medium whitespace-nowrap ${activeTab === 'description' ? 'text-maroon border-b-2 border-maroon' : 'text-darkBrown hover:text-maroon'}`}
            >
              Description
            </button>
            <button 
              onClick={() => setActiveTab('details')}
              className={`px-4 py-3 font-medium whitespace-nowrap ${activeTab === 'details' ? 'text-maroon border-b-2 border-maroon' : 'text-darkBrown hover:text-maroon'}`}
            >
              Product Details
            </button>
            <button 
              onClick={() => setActiveTab('care')}
              className={`px-4 py-3 font-medium whitespace-nowrap ${activeTab === 'care' ? 'text-maroon border-b-2 border-maroon' : 'text-darkBrown hover:text-maroon'}`}
            >
              Care Instructions
            </button>
          </div>
          
          {/* Tab Content */}
          <div className="py-6">
            {activeTab === 'description' && (
              <div className="text-darkBrown">
                <p>{product.description}</p>
              </div>
            )}
            
            {activeTab === 'details' && (
              <div className="text-darkBrown">
                <ul className="list-disc pl-5 space-y-2">
                  {product.details.map((detail, index) => (
                    <li key={index}>{detail}</li>
                  ))}
                </ul>
              </div>
            )}
            
            {activeTab === 'care' && (
              <div className="text-darkBrown">
                <p>{product.careInstructions}</p>
              </div>
            )}
          </div>
        </div>
        
        {/* You May Also Like Section (recommendation) - Centered on large screens */}
        <div className="mt-16 max-w-6xl mx-auto" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="400" data-aos-once="true">
          <h2 className="text-2xl font-semibold text-darkBrown mb-6 text-center">You May Also Like</h2>
          
          {/* This would be a horizontal scrolling list of related products */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {/* This is just a placeholder - you'd map through actual related products */}
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="bg-cream border border-maroon-20 rounded overflow-hidden hover:shadow-custom transition-shadow">
                <div className="h-48 sm:h-56 md:h-64 lg:h-72 bg-lightPink">
                  <img 
                    src="/api/placeholder/300/400" 
                    alt="Related product"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-3">
                  <h3 className="font-medium text-darkBrown truncate">Similar Product {item}</h3>
                  <p className="text-maroon font-semibold mt-1">₹1299</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Size Guide Modal */}
      {showSizeGuide && <SizeGuideModal />}
      
      {/* Add to Cart Success Animation */}
      {showAddToCartAnimation && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50">
          <div className="bg-cream bg-opacity-95 rounded-lg p-6 shadow-lg flex flex-col items-center max-w-sm">
            <div className="w-24 h-24 mb-4 relative">
              <img
                src={AddToCartAnimationGif}
                alt="Added to cart"
                className="w-full h-full object-contain"
              />
            </div>
            <div className="rounded-full bg-green-500 p-2 mb-4">
              <Check size={24} className="text-white" />
            </div>
            <h3 className="text-xl font-semibold text-darkBrown mb-2">Added to Cart!</h3>
            <p className="text-center text-darkBrown mb-4">
              {product.name} has been added to your cart.
            </p>
            <div className="flex gap-3 w-full">
              <button
                onClick={() => setShowAddToCartAnimation(false)}
                className="flex-1 py-2 border border-maroon text-maroon rounded hover:bg-lightPink transition-colors"
              >
                Continue Shopping
              </button>
              <button
                onClick={() => {
                  setShowAddToCartAnimation(false);
                  // Navigate to cart in a real app
                  console.log("Navigate to cart");
                }}
                className="flex-1 py-2 bg-maroon text-cream rounded hover:bg-darkMaroon transition-colors"
              >
                View Cart
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}