import { useState, useEffect } from 'react';
import { X, ChevronUp, ChevronDown, ShoppingBag, Trash2, ArrowRight, Tag } from 'lucide-react';

// Mock data (will be replaced with actual backend data)
const initialCartItems = [
  {
    id: 1,
    name: "Hand-Embroidered Silk Kurta",
    price: 4999,
    quantity: 1,
    image: "/api/placeholder/120/140",
    size: "M",
    color: "Maroon"
  },
  {
    id: 2,
    name: "Traditional Cotton Saree",
    price: 6599,
    quantity: 1,
    image: "/api/placeholder/120/140",
    size: "Free Size",
    color: "Cream"
  },
  {
    id: 3,
    name: "Traditional Cotton Saree",
    price: 6599,
    quantity: 1,
    image: "/api/placeholder/120/140",
    size: "Free Size",
    color: "Cream"
  },
  {
    id: 4,
    name: "Traditional Cotton Saree",
    price: 6599,
    quantity: 1,
    image: "/api/placeholder/120/140",
    size: "Free Size",
    color: "Cream"
  }
];

export default function CartComponent() {
  const [cartItems, setCartItems] = useState(initialCartItems);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [deliveryAnimation, setDeliveryAnimation] = useState(false);
  const [couponCode, setCouponCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [couponApplied, setCouponApplied] = useState(false);
  const [couponError, setCouponError] = useState('');

  // Calculate subtotal, shipping, and total
  const subtotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  const shipping = subtotal > 0 ? 199 : 0;
  const total = subtotal + shipping - discount;

  // Update quantity
  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return;
    setCartItems(cartItems.map(item => 
      item.id === id ? { ...item, quantity: newQuantity } : item
    ));
  };

  // Remove item from cart
  const removeItem = (id) => {
    setCartItems(cartItems.filter(item => item.id !== id));
    
    // Reset coupon if cart becomes empty
    if (cartItems.length === 1) {
      setCouponCode('');
      setDiscount(0);
      setCouponApplied(false);
      setCouponError('');
    }
  };

  // Toggle cart visibility
  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  // Apply coupon code
  const applyCoupon = () => {
    // Mock coupon validation (will be replaced with backend validation)
    if (couponCode.toUpperCase() === 'RANJAYA10') {
      const discountAmount = Math.round(subtotal * 0.1); // 10% discount
      setDiscount(discountAmount);
      setCouponApplied(true);
      setCouponError('');
    } else if (couponCode.toUpperCase() === 'WELCOME20') {
      const discountAmount = Math.round(subtotal * 0.2); // 20% discount
      setDiscount(discountAmount);
      setCouponApplied(true);
      setCouponError('');
    } else {
      setDiscount(0);
      setCouponApplied(false);
      setCouponError('Invalid coupon code');
    }
  };

  // Clear applied coupon
  const clearCoupon = () => {
    setCouponCode('');
    setDiscount(0);
    setCouponApplied(false);
    setCouponError('');
  };

  // Checkout function
  const handleCheckout = () => {
    setIsCheckingOut(true);
    
    // Show delivery animation after a short delay
    setTimeout(() => {
      setDeliveryAnimation(true);
      
      // Reset after animation completes
      setTimeout(() => {
        setDeliveryAnimation(false);
        setIsCheckingOut(false);
        // In a real app, you would send the cart data to backend here
      }, 3000);
    }, 500);
  };

  // Format price as INR
  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(price);
  };

  // Close cart when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isCartOpen && 
          !event.target.closest('.cart-sidebar') && 
          !event.target.closest('.cart-button')) {
        setIsCartOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isCartOpen]);

  return (
    <div className="relative">
      {/* Cart Button */}
      <button 
        className="cart-button relative p-2 text-maroon hover:bg-lightPink rounded-full transition-all duration-300"
        onClick={toggleCart}
        aria-label="Shopping Cart"
      >
        <ShoppingBag size={24} />
        {cartItems.length > 0 && (
          <span className="absolute -top-1 -right-1 bg-maroon text-cream rounded-full text-xs w-5 h-5 flex items-center justify-center">
            {cartItems.reduce((total, item) => total + item.quantity, 0)}
          </span>
        )}
      </button>

      {/* Cart Overlay */}
      {isCartOpen && (
        <div className="fixed inset-0 bg-darkBrown bg-opacity-50 z-40" onClick={toggleCart}></div>
      )}

      {/* Cart Sidebar */}
      <div 
        className={`cart-sidebar fixed top-0 right-0 h-full z-50 bg-cream shadow-custom overflow-hidden transition-all duration-300 w-full sm:w-96 transform ${isCartOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        {/* Cart Header */}
        <div className="flex justify-between items-center border-b border-maroon-20 px-4 md:px-6 py-3">
          <h2 className="font-semibold text-darkBrown text-lg flex items-center">
            <ShoppingBag size={20} className="mr-2 text-maroon" />
            Your Cart
            {cartItems.length > 0 && (
              <span className="ml-2 text-sm text-maroon">
                ({cartItems.reduce((total, item) => total + item.quantity, 0)} items)
              </span>
            )}
          </h2>
          <button 
            className="p-2 text-maroon hover:bg-lightPink rounded-full transition-all duration-300"
            onClick={toggleCart}
            aria-label="Close cart"
          >
            <X size={20} />
          </button>
        </div>

        {/* Cart Content */}
        <div className="flex flex-col h-[calc(100%-60px)]">
          {/* Cart Items */}
          <div className="flex-grow overflow-y-auto px-4 md:px-6 py-3">
            {cartItems.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-64 text-center">
                <ShoppingBag size={48} className="text-maroon opacity-30 mb-4" />
                <p className="text-darkBrown mb-2">Your cart is empty</p>
                <p className="text-sm text-darkBrown opacity-70">Explore our collection to add beautiful items to your cart</p>
                <button 
                  className="mt-6 px-6 py-2 bg-maroon text-cream rounded hover:bg-darkMaroon transition-all duration-300"
                  onClick={toggleCart}
                >
                  Continue Shopping
                </button>
              </div>
            ) : (
              <ul className="divide-y divide-maroon-20">
                {cartItems.map(item => (
                  <li key={item.id} className="py-4">
                    <div className="flex items-start space-x-4">
                      {/* Product Image */}
                      <div className="w-24 h-28 bg-lightPink rounded overflow-hidden flex-shrink-0">
                        <img 
                          src={item.image} 
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      
                      {/* Product Info */}
                      <div className="flex-grow">
                        <h3 className="font-medium text-darkBrown">{item.name}</h3>
                        <div className="mt-1 text-sm text-darkBrown opacity-70">
                          <p>Size: {item.size}</p>
                          <p>Color: {item.color}</p>
                        </div>
                        <div className="mt-2 flex justify-between items-center">
                          {/* Quantity Selector */}
                          <div className="flex items-center border border-maroon-20 rounded">
                            <button 
                              className="p-1 text-maroon hover:bg-lightPink"
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              aria-label="Decrease quantity"
                            >
                              <ChevronDown size={16} />
                            </button>
                            <span className="px-3 py-1 text-darkBrown">
                              {item.quantity}
                            </span>
                            <button 
                              className="p-1 text-maroon hover:bg-lightPink"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              aria-label="Increase quantity"
                            >
                              <ChevronUp size={16} />
                            </button>
                          </div>
                          
                          {/* Price */}
                          <div className="text-right">
                            <p className="font-medium text-darkBrown">
                              {formatPrice(item.price * item.quantity)}
                            </p>
                            {item.quantity > 1 && (
                              <p className="text-xs text-darkBrown opacity-70">
                                {formatPrice(item.price)} each
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                      
                      {/* Remove Button */}
                      <button 
                        className="p-1 text-maroon hover:bg-lightPink rounded-full transition-all"
                        onClick={() => removeItem(item.id)}
                        aria-label="Remove item"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
          
          {/* Cart Summary */}
          {cartItems.length > 0 && (
            <div className="border-t border-maroon-20 px-4 md:px-6 py-4 bg-cream shadow-custom">
              {/* Coupon Code Section */}
              <div className="mb-3 pb-3 border-b border-maroon-20">
                <div className="flex items-center space-x-2">
                  <div className="flex-grow">
                    <div className="flex items-center">
                      <Tag size={16} className="text-maroon mr-2" />
                      <span className="text-sm font-medium text-darkBrown">Discount Coupon</span>
                    </div>
                    <div className="flex mt-2">
                      <input
                        type="text"
                        placeholder="Enter coupon code"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}
                        className="flex-grow px-3 py-1 text-sm border border-maroon-20 rounded-l focus:outline-none focus:border-maroon"
                        disabled={couponApplied}
                      />
                      {couponApplied ? (
                        <button
                          onClick={clearCoupon}
                          className="px-3 py-1 text-xs bg-lightPink text-maroon font-medium rounded-r hover:bg-maroon hover:text-cream transition-colors"
                        >
                          Clear
                        </button>
                      ) : (
                        <button
                          onClick={applyCoupon}
                          className="px-3 py-1 text-xs bg-maroon text-cream font-medium rounded-r hover:bg-darkMaroon transition-colors"
                          disabled={!couponCode}
                        >
                          Apply
                        </button>
                      )}
                    </div>
                    {couponError && (
                      <p className="text-xs text-red-500 mt-1">{couponError}</p>
                    )}
                    {couponApplied && (
                      <p className="text-xs text-green-600 mt-1">Coupon applied successfully!</p>
                    )}
                  </div>
                </div>
              </div>
              
              {/* Price Summary */}
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-darkBrown">Subtotal</span>
                  <span className="font-medium text-darkBrown">{formatPrice(subtotal)}</span>
                </div>
                
                {discount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Discount</span>
                    <span>- {formatPrice(discount)}</span>
                  </div>
                )}
                
                <div className="flex justify-between">
                  <span className="text-darkBrown">Shipping</span>
                  <span className="font-medium text-darkBrown">{formatPrice(shipping)}</span>
                </div>
                
                <div className="border-t border-maroon-20 pt-2 mt-2 flex justify-between">
                  <span className="font-semibold text-darkBrown">Total</span>
                  <span className="font-semibold text-maroon">{formatPrice(total)}</span>
                </div>
              </div>
              
              {/* Checkout Button */}
              <button 
                className="w-full mt-4 py-3 bg-maroon text-cream rounded font-medium hover:bg-darkMaroon transition-all flex items-center justify-center relative overflow-hidden"
                onClick={handleCheckout}
                disabled={isCheckingOut}
              >
                {isCheckingOut ? (
                  <div className="flex items-center">
                    <span className="mr-2">Processing...</span>
                    <div className="animate-spin h-4 w-4 border-2 border-cream rounded-full border-t-transparent"></div>
                  </div>
                ) : (
                  <>
                    <span>Checkout</span>
                    <ArrowRight size={16} className="ml-2" />
                  </>
                )}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Delivery Animation */}
      {deliveryAnimation && (
        <div className="fixed inset-0 bg-cream bg-opacity-95 z-50 flex flex-col items-center justify-center">
          <div className="relative w-64 h-32">
            {/* Animated delivery scooter */}
            <div className="absolute animate-delivery-scooter h-16 w-16">
              <div className="w-16 h-16 bg-maroon rounded-full flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-cream w-10 h-10">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.5v15m7.5-7.5h-15m15 0C19.167 12 19.167 4.5 12 4.5 4.833 4.5 4.833 12 12 12z" />
                </svg>
              </div>
            </div>
            
            {/* Road */}
            <div className="absolute bottom-0 left-0 right-0 h-2 bg-darkBrown bg-opacity-20 rounded-full"></div>
          </div>
          
          <h3 className="mt-8 text-xl font-medium text-maroon">Your order is on the way!</h3>
          <p className="mt-2 text-darkBrown">Thank you for shopping with Ranjaya</p>
          
          <button 
            className="mt-8 px-6 py-2 bg-maroon text-cream rounded hover:bg-darkMaroon transition-all"
            onClick={() => {
              setDeliveryAnimation(false);
              setIsCheckingOut(false);
              setIsCartOpen(false);
              setCartItems([]);
            }}
          >
            Continue Shopping
          </button>
        </div>
      )}

      <style jsx>{`
        @keyframes delivery-scooter {
          0% { transform: translateX(-50px) }
          50% { transform: translateX(150px) }
          100% { transform: translateX(300px) }
        }
        .animate-delivery-scooter {
          animation: delivery-scooter 3s ease-in-out;
        }
      `}</style>
    </div>
  );
}