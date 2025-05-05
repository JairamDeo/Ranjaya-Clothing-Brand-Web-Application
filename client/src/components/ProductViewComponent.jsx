import React, { useState, useEffect } from 'react';
import { ChevronRight, Minus, Plus, ShoppingCart, ArrowRight, X, ChevronLeft, ChevronRight as ChevronRightIcon, Check, Heart, Share2 } from 'lucide-react';

/**
 * Product View Component - Displays detailed product information
 * @param {Object} props - Component props
 * @param {Object} props.product - Product data object (will be fetched from backend based on productId)
 * @param {string|number} props.productId - The ID of the product to display
 * @returns {JSX.Element} The product view component
 */
export default function ProductViewComponent({ productId }) {
  // In a real implementation, you would fetch this data from your backend based on productId
  // Initial state with placeholders
  const [product, setProduct] = useState({
    id: productId || '',
    name: '', // Will be populated from backend
    price: 0, // Will be populated from backend
    discountPrice: null, // Optional - if product has a discount
    discount: null, // Optional - display text for discount
    rating: null, // Optional - product rating
    reviews: null, // Optional - number of reviews
    colors: [], // Optional - available colors (will be populated by backend if applicable)
    sizes: [], // Optional - available sizes (will be populated by backend if applicable)
    images: [
      "/api/placeholder/600/800" // Default placeholder - will be replaced by backend
    ],
    description: '', // Will be populated from backend
    details: [], // Will be populated from backend
    deliveryInfo: '', // Will be populated from backend
    careInstructions: null, // Optional - care instructions if applicable
    categoryName: '', // For breadcrumb navigation
    collectionName: '' // For breadcrumb navigation
  });

  // State variables
  const [mainImage, setMainImage] = useState(product.images[0]);
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');
  const [isFavorite, setIsFavorite] = useState(false);
  const [showSizeGuide, setShowSizeGuide] = useState(false);
  const [currentCarouselIndex, setCurrentCarouselIndex] = useState(0);
  const [showAddToCartAnimation, setShowAddToCartAnimation] = useState(false);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Update main image when product changes (when data is loaded from backend)
  useEffect(() => {
    if (product?.images?.length > 0) {
      setMainImage(product.images[0]);
    }
    
    // Reset state when product changes
    setSelectedColor(product.colors?.[0] || null);
    setSelectedSize(null);
    setQuantity(1);
    setActiveTab('description');
  }, [product]);

  // Fetch product data when component mounts or productId changes
  useEffect(() => {
    const fetchProductData = async () => {
      setIsLoading(true);
      try {
        // TODO: Backend developer will implement this API call
        // Example:
        // const response = await fetch(`/api/products/${productId}`);
        // const data = await response.json();
        // setProduct(data);
        
        // For now, simulate API response with a timeout
        setTimeout(() => {
          // This is just a placeholder. In real implementation,
          // this data will come from the backend API
          setProduct(prevProduct => ({
            ...prevProduct,
            name: `${productId}`, // Placeholder
            price: `${productId}` , // Placeholder
            discountPrice: null,
            categoryName: 'Category', // Placeholder
            collectionName: 'Collection', // Placeholder
            description: 'This product description will be loaded from the backend. It will contain details about the fabric, fit, and features of this clothing item.',
            details: [
              'Material composition will be provided by backend',
              'Care instructions will be provided by backend',
              'Product dimensions will be provided by backend'
            ],
            deliveryInfo: 'Delivery information will be provided by backend including shipping time and return policy.',
            // Other fields remain as placeholders
          }));
          
          // Also fetch related products (You may also like section)
          // This will be implemented by backend
          setRelatedProducts([
            { id: 101, name: 'Related Product 1', price: 999, image: '/api/placeholder/300/400' },
            { id: 102, name: 'Related Product 2', price: 1499, image: '/api/placeholder/300/400' },
            { id: 103, name: 'Related Product 3', price: 1299, image: '/api/placeholder/300/400' },
            { id: 104, name: 'Related Product 4', price: 1899, image: '/api/placeholder/300/400' }
          ]);
          
          setIsLoading(false);
        }, 500);
      } catch (error) {
        console.error('Error fetching product data:', error);
        setIsLoading(false);
      }
    };

    if (productId) {
      fetchProductData();
    }
  }, [productId]);

  // Handle quantity change
  const decreaseQuantity = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  // Calculate total price based on quantity
  const totalPrice = product.price * quantity;
  const totalDiscountPrice = product.discountPrice ? product.discountPrice * quantity : null;

  // Add to cart function
  const addToCart = () => {
    // Only require size selection if product has sizes available
    if (product.sizes?.length > 0 && !selectedSize) {
      alert("Please select a size");
      return;
    }
    
    console.log("Added to cart:", {
      productId: product.id,
      name: product.name,
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
    
    // TODO: Backend developer will implement the cart functionality
    // For example: dispatch to your cart state/store
  };

  // Buy now function
  const buyNow = () => {
    // Only require size selection if product has sizes available
    if (product.sizes?.length > 0 && !selectedSize) {
      alert("Please select a size");
      return;
    }
    
    console.log("Buy now:", {
      productId: product.id,
      name: product.name,
      selectedColor,
      selectedSize,
      quantity,
      totalPrice
    });
    
    // TODO: Backend developer will implement redirect to checkout
  };

  // Size guide modal content - Only shown if product has sizes
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
          {/* Size guide content will be dynamically populated based on product category */}
          {/* This is a placeholder structure that will be filled by backend data */}
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-lightPink">
                  <th className="border border-maroon-20 p-3 text-left text-darkBrown">Size</th>
                  <th className="border border-maroon-20 p-3 text-left text-darkBrown">Measurements</th>
                </tr>
              </thead>
              <tbody>
                {/* Size guide data will be populated here by backend */}
                <tr>
                  <td className="border border-maroon-20 p-3 text-darkBrown font-medium">Size data will be provided by backend</td>
                  <td className="border border-maroon-20 p-3 text-darkBrown">Measurement data will be provided by backend</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="mt-6">
            <h4 className="font-medium text-darkBrown mb-2">How to Measure</h4>
            <p className="text-darkBrown">Measurement instructions will be populated by backend based on product type.</p>
          </div>
        </div>
      </div>
    </div>
  );

  // Carousel functions for image gallery
  const handlePrevSlide = () => {
    if (!product.images?.length) return;
    
    setCurrentCarouselIndex(prevIndex => 
      prevIndex === 0 ? Math.ceil(product.images.length / 4) - 1 : prevIndex - 1
    );
  };

  const handleNextSlide = () => {
    if (!product.images?.length) return;
    
    setCurrentCarouselIndex(prevIndex => 
      prevIndex === Math.ceil(product.images.length / 4) - 1 ? 0 : prevIndex + 1
    );
  };
  
  // Calculate visible images based on carousel index
  const getVisibleImages = () => {
    if (!product.images?.length) return [];
    
    const itemsPerPage = 4; // Display 4 thumbnails at a time
    const startIndex = currentCarouselIndex * itemsPerPage;
    return product.images.slice(startIndex, startIndex + itemsPerPage);
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-16">
        <div className="animate-pulse text-center">
          <div className="h-10 w-48 bg-lightPink rounded mx-auto mb-6"></div>
          <div className="h-64 w-full max-w-md bg-lightPink rounded mb-6"></div>
          <div className="h-4 w-full max-w-md bg-lightPink rounded mb-2"></div>
          <div className="h-4 w-full max-w-md bg-lightPink rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <section className="bg-cream px-4 py-6 md:px-6 lg:px-12">
      <div className="container mx-auto">
        {/* Breadcrumb Navigation */}
        <nav className="mb-6 text-sm flex items-center gap-1 overflow-x-auto whitespace-nowrap pb-2" aria-label="Breadcrumb">
          <a href="/" className="text-darkBrown hover:text-maroon">Home</a>
          <ChevronRight size={14} className="text-darkBrown" />
          {product.categoryName && (
            <>
              <a href={`/category/${encodeURIComponent(product.categoryName.toLowerCase())}`} className="text-darkBrown hover:text-maroon">
                {product.categoryName}
              </a>
              <ChevronRight size={14} className="text-darkBrown" />
            </>
          )}
          {product.collectionName && (
            <>
              <a href={`/collections/${encodeURIComponent(product.collectionName.toLowerCase())}`} className="text-darkBrown hover:text-maroon">
                {product.collectionName}
              </a>
              <ChevronRight size={14} className="text-darkBrown" />
            </>
          )}
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
            
            {/* Thumbnail Carousel - Only rendered if product has multiple images */}
            {product.images?.length > 1 && (
              <div className="relative">
                <div className="flex justify-center gap-2 pb-2 overflow-hidden">
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
                  
                {/* Carousel Navigation Buttons - Only shown if needed */}
                {product.images.length > 4 && (
                  <>
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
                  </>
                )}
                
                {/* Carousel Indicators - Only if multiple pages of images */}
                {Math.ceil(product.images.length / 4) > 1 && (
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
                )}
              </div>
            )}
          </div>
          
          {/* Right: Product Details */}
          <div>
            <h1 className="text-2xl md:text-3xl font-semibold text-darkBrown">{product.name}</h1>
            
            {/* Ratings - Only shown if product has ratings */}
            {product.rating && (
              <div className="mt-2 flex items-center gap-2">
                <div className="bg-green-600 text-white text-sm px-2 py-0.5 rounded font-medium flex items-center gap-1">
                  {product.rating} ★
                </div>
                {product.reviews && (
                  <span className="text-darkBrown text-sm">{product.reviews} Reviews</span>
                )}
              </div>
            )}
            
            {/* Price */}
            <div className="mt-4 flex items-center gap-2">
              <span className="text-xl md:text-2xl font-bold text-maroon">
                ₹{totalPrice}
              </span>
              {totalDiscountPrice && (
                <>
                  <span className="text-gray-500 line-through">
                    ₹{totalDiscountPrice}
                  </span>
                  {product.discount && (
                    <span className="text-green-600 font-medium">{product.discount}</span>
                  )}
                </>
              )}
            </div>
            
            {/* Color Selection - Only shown if product has colors */}
            {product.colors?.length > 0 && (
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
            )}
            
            {/* Size Selection - Only shown if product has sizes */}
            {product.sizes?.length > 0 && (
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
                {/* Size selection message - only if sizes are available but none selected */}
                {product.sizes.length > 0 && !selectedSize && (
                  <p className="text-sm text-maroon mt-2">Please select a size</p>
                )}
              </div>
            )}
            
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
            {product.deliveryInfo && (
              <div className="mt-6 p-4 bg-lightPink rounded border border-maroon-20">
                <p className="text-darkBrown">{product.deliveryInfo}</p>
              </div>
            )}
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
            {product.details?.length > 0 && (
              <button 
                onClick={() => setActiveTab('details')}
                className={`px-4 py-3 font-medium whitespace-nowrap ${activeTab === 'details' ? 'text-maroon border-b-2 border-maroon' : 'text-darkBrown hover:text-maroon'}`}
              >
                Product Details
              </button>
            )}
            {product.careInstructions && (
              <button 
                onClick={() => setActiveTab('care')}
                className={`px-4 py-3 font-medium whitespace-nowrap ${activeTab === 'care' ? 'text-maroon border-b-2 border-maroon' : 'text-darkBrown hover:text-maroon'}`}
              >
                Care Instructions
              </button>
            )}
            <button 
              onClick={() => setActiveTab('dispatch')}
              className={`px-4 py-3 font-medium whitespace-nowrap ${activeTab === 'dispatch' ? 'text-maroon border-b-2 border-maroon' : 'text-darkBrown hover:text-maroon'}`}
            >
              Shipping & Returns
            </button>
          </div>
          
          {/* Tab Content */}
          <div className="py-6">
            {activeTab === 'description' && (
              <div className="text-darkBrown">
                <p>{product.description || 'Product description will be available soon.'}</p>
              </div>
            )}
            
            {activeTab === 'details' && (
              <div className="text-darkBrown">
                <ul className="list-disc pl-5 space-y-2">
                  {product.details && product.details.length > 0 ? (
                    product.details.map((detail, index) => (
                      <li key={index}>{detail}</li>
                    ))
                  ) : (
                    <li>Product details will be available soon.</li>
                  )}
                </ul>
              </div>
            )}
            
            {activeTab === 'care' && (
              <div className="text-darkBrown">
                <p>{product.careInstructions || 'Care instructions will be available soon.'}</p>
              </div>
            )}
            
            {activeTab === 'dispatch' && (
              <div className="text-darkBrown">
                <h3 className="font-medium mb-2">Shipping Information</h3>
                <p className="mb-4">Shipping information will be provided by backend. This typically includes delivery timeframes, shipping carriers, and costs.</p>
                
                <h3 className="font-medium mb-2 mt-6">Returns Policy</h3>
                <p>Returns policy will be provided by backend. This typically includes the return window, condition requirements, and refund process.</p>
              </div>
            )}
          </div>
        </div>
        
        {/* You May Also Like Section */}
        <div className="mt-16 max-w-6xl mx-auto" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="400" data-aos-once="true">
          <h2 className="text-2xl font-semibold text-darkBrown mb-6 text-center">You May Also Like</h2>
          
          {/* Related products grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {relatedProducts.length > 0 ? (
              relatedProducts.map((relatedProduct) => (
                <div key={relatedProduct.id} className="bg-cream border border-maroon-20 rounded overflow-hidden hover:shadow-custom transition-shadow">
                  <a href={`/product/${relatedProduct.id}`} className="block">
                    <div className="h-48 sm:h-56 md:h-64 lg:h-72 bg-lightPink">
                      <img 
                        src={relatedProduct.image} 
                        alt={relatedProduct.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-3">
                      <h3 className="font-medium text-darkBrown truncate">{relatedProduct.name}</h3>
                      <p className="text-maroon font-semibold mt-1">₹{relatedProduct.price}</p>
                    </div>
                  </a>
                </div>
              ))
            ) : (
              // Placeholder cards while loading
              [1, 2, 3, 4].map((item) => (
                <div key={item} className="bg-cream border border-maroon-20 rounded overflow-hidden">
                  <div className="h-48 sm:h-56 md:h-64 lg:h-72 bg-lightPink animate-pulse"></div>
                  <div className="p-3">
                    <div className="h-5 bg-lightPink rounded animate-pulse mb-2"></div>
                    <div className="h-5 w-16 bg-lightPink rounded animate-pulse"></div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
      
      {/* Size Guide Modal - Only rendered if showSizeGuide is true */}
      {showSizeGuide && <SizeGuideModal />}
      
      {/* Add to Cart Success Animation */}
      {showAddToCartAnimation && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50">
          <div className="bg-cream bg-opacity-95 rounded-lg p-6 shadow-lg flex flex-col items-center max-w-sm">
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
                  // TODO: Backend developer will implement this
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