import React, { useState, useEffect } from 'react';
import { Filter, ChevronDown, ShoppingCart } from 'lucide-react';

export default function BestSeller() {
  // State for filter and sort
  const [showFilters, setShowFilters] = useState(false);
  const [sortOption, setSortOption] = useState('Best Selling');
  const [showSortOptions, setShowSortOptions] = useState(false);
  
  // Enhanced product data structure with image field
  const [products, setProducts] = useState([
    { 
      id: 1, 
      name: "VANRAAG", 
      price: 1271,
      image: "/api/placeholder/300/400" // This will be replaced with actual image path from DB
    },
    { 
      id: 2, 
      name: "PICHWAI PANKH", 
      price: 1346,
      image: "/api/placeholder/300/400" 
    },
    { 
      id: 3, 
      name: "RANG-GULZAR", 
      price: 1271,
      image: "/api/placeholder/300/400" 
    },
    { 
      id: 4, 
      name: "PANKHURI", 
      price: 1271,
      image: "/api/placeholder/300/400" 
    },
    { 
      id: 5, 
      name: "TANA-BANA", 
      price: 2019,
      image: "/api/placeholder/300/400" 
    },
    { 
      id: 6, 
      name: "PURPLE PETAL", 
      price: 1866,
      image: "/api/placeholder/300/400" 
    }
  ]);

  // Sort options
  const sortOptions = [
    'Best Selling',
    'Price, low to high',
    'Price, high to low',
    'Alphabetically, A-Z',
    'Alphabetically, Z-A',
    'Date, old to new',
    'Date, new to old'
  ];

  // Filter options (example)
  const filterOptions = [
    { name: 'Category', options: ['Dresses', 'Sarees', 'Kurtas', 'Lehengas'] },
    { name: 'Price', options: ['Under ₹1000', '₹1000 - ₹2000', '₹2000 - ₹5000', 'Above ₹5000'] },
    { name: 'Color', options: ['Red', 'Blue', 'Green', 'Yellow', 'Pink', 'Purple'] }
  ];

  // Initialize AOS with custom settings for this component
  useEffect(() => {
    // We're not reinitializing AOS globally, just ensuring our component
    // knows about any specific config we want to use
    if (typeof AOS !== 'undefined') {
      // Refresh AOS to detect new elements
      AOS.refresh();
    }
  }, [products]);

  // Handle sorting change
  const handleSortChange = (option) => {
    setSortOption(option);
    setShowSortOptions(false);
    
    // Example sorting logic (to be replaced with actual implementation)
    let sortedProducts = [...products];
    switch(option) {
      case 'Price, low to high':
        sortedProducts.sort((a, b) => a.price - b.price);
        break;
      case 'Price, high to low':
        sortedProducts.sort((a, b) => b.price - a.price);
        break;
      case 'Alphabetically, A-Z':
        sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'Alphabetically, Z-A':
        sortedProducts.sort((a, b) => b.name.localeCompare(a.name));
        break;
      default:
        // Best selling would typically use a different metric
        break;
    }
    setProducts(sortedProducts);
  };

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.sort-dropdown') && !event.target.closest('.filter-container')) {
        setShowSortOptions(false);
        setShowFilters(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <section className="bg-cream px-4 py-6 md:px-6 lg:px-12 overflow-x-hidden">
      <div className="container mx-auto relative">
        {/* Section Heading */}
        <h2 
          className="text-center text-darkBrown text-3xl md:text-4xl font-semibold mb-8"
          data-aos="fade-up"
          data-aos-duration="1000"
          data-aos-once="true"
        >
          BEST SELLERS
        </h2>
        
        {/* Filter and Sort Controls */}
        <div 
          className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 relative z-40"
          data-aos="fade-up"
          data-aos-duration="1000"
          data-aos-delay="200"
          data-aos-once="true"
        >
          {/* Filter Button */}
          <div className="relative mb-4 md:mb-0 filter-container">
            <button 
              className="flex items-center gap-2 px-4 py-2 bg-cream border border-maroon-20 rounded hover:bg-lightPink transition-colors duration-300"
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter size={18} className="text-maroon" />
              <span className="text-darkBrown font-medium">Filter</span>
            </button>
            
            {/* Filter Dropdown - Improved z-index positioning */}
            {showFilters && (
              <div className="absolute top-full left-0 z-50 mt-1 w-64 bg-cream shadow-custom border border-maroon-20 rounded p-4">
                {filterOptions.map((filterGroup, index) => (
                  <div key={index} className="mb-4 last:mb-0">
                    <h3 className="font-medium text-darkBrown mb-2">{filterGroup.name}</h3>
                    <div className="space-y-2">
                      {filterGroup.options.map((option, idx) => (
                        <div key={idx} className="flex items-center">
                          <input 
                            type="checkbox" 
                            id={`filter-${index}-${idx}`} 
                            className="mr-2 accent-maroon cursor-pointer"
                          />
                          <label 
                            htmlFor={`filter-${index}-${idx}`} 
                            className="text-darkBrown text-sm cursor-pointer hover:text-maroon transition-colors duration-300"
                          >
                            {option}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
                
                <div className="flex justify-between mt-4 pt-3 border-t border-maroon-20">
                  <button className="text-sm text-maroon hover:text-darkMaroon transition-colors duration-300">Clear All</button>
                  <button className="bg-maroon text-cream px-4 py-1 rounded hover:bg-darkMaroon transition-colors duration-300">Apply</button>
                </div>
              </div>
            )}
          </div>
          
          {/* Sort and Product Count */}
          <div className="flex items-center gap-4">
            <div className="relative sort-dropdown">
              <button 
                className="flex items-center gap-2 px-4 py-2 bg-cream border border-maroon-20 rounded hover:bg-lightPink transition-colors duration-300"
                onClick={() => setShowSortOptions(!showSortOptions)}
              >
                <span className="text-darkBrown">Sort by: </span>
                <span className="text-maroon font-medium">{sortOption}</span>
                <ChevronDown size={16} className="text-maroon" />
              </button>
              
              {/* Sort Options Dropdown - Improved z-index positioning */}
              {showSortOptions && (
                <div className="absolute top-full right-0 z-50 mt-1 w-48 bg-cream shadow-custom border border-maroon-20 rounded">
                  {sortOptions.map((option, index) => (
                    <button 
                      key={index}
                      className={`w-full text-left px-4 py-2 hover:bg-lightPink transition-colors duration-300 ${sortOption === option ? 'text-maroon font-medium' : 'text-darkBrown'}`}
                      onClick={() => handleSortChange(option)}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              )}
            </div>
            
            <span className="text-darkBrown">
              {products.length} products
            </span>
          </div>
        </div>
        
        {/* Products Grid - Lower z-index than controls */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 relative z-10">
          {products.map((product, index) => (
            <ProductCard 
              key={product.id} 
              product={product} 
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProductCard({ product, index }) {
  // Calculate staggered delay based on index position
  // More pronounced staggering for better visual effect
  const aosDelay = 300 + (index % 4) * 150;
  
  return (
    <div 
      className="flex flex-col group"
      data-aos="fade-up"
      data-aos-duration="1200"
      data-aos-delay={aosDelay}
      data-aos-once="true"
      data-aos-anchor-placement="top-bottom"
    >
      {/* Product Image */}
      <div className="w-full h-[400px] overflow-hidden bg-lightPink rounded-t relative">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        {/* Hover overlay */}
        <div className="absolute inset-0 bg-darkMaroon/0 group-hover:bg-darkMaroon/10 transition-all duration-700"></div>
      </div>
      
      {/* Product Details */}
      <div className="p-4 border-x border-b border-maroon-20 rounded-b bg-cream">
        <h3 className="text-lg font-medium text-darkBrown group-hover:text-maroon transition-colors duration-300">{product.name}</h3>
        <p className="text-maroon font-semibold mt-1">₹{product.price.toLocaleString()}</p>
        
        {/* Add to Cart Button */}
        <button 
          className="w-full py-2 px-3 bg-maroon text-cream rounded hover:bg-darkMaroon transition-all duration-300 font-medium mt-3 flex items-center justify-center gap-2 group-hover:shadow-custom"
          onClick={() => {
            // Add to cart logic would go here
           // console.log(`Added ${product.name} to cart`);
          }}
        >
          <ShoppingCart size={18} className="transform group-hover:scale-110 transition-transform duration-300" />
          <span>ADD TO CART</span>
        </button>
      </div>
    </div>
  );
}