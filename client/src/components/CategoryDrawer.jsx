import { useState, useEffect, useRef } from 'react';
import { X, ChevronDown, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function CategoryDrawer({ 
  activeCategoryDrawer, 
  setActiveCategoryDrawer, 
  windowWidth,
  isMobile
}) {
  // State for tracking active subcategory
  const [activeSubcategory, setActiveSubcategory] = useState(null);
  
  // Create a ref to track initial mount
  const firstRender = useRef(true);
  // Create a ref to track previous mobile state
  const prevIsMobile = useRef(isMobile);

  // Handle layout shifts during screen resize
  useEffect(() => {
    // Skip effect on first render
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    
    // If mobile state changed and drawer is open, close it to prevent animation issues
    if (prevIsMobile.current !== isMobile && activeCategoryDrawer) {
      setActiveCategoryDrawer(null);
    }
    
    // Update previous mobile state
    prevIsMobile.current = isMobile;
  }, [isMobile, activeCategoryDrawer, setActiveCategoryDrawer]);
  
  // Close drawer when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      const drawer = document.getElementById('category-drawer');
      const menuButton = document.getElementById('menu-button');
      const suitSetsButton = document.getElementById('suit-sets-button');
      const sareesButton = document.getElementById('sarees-button');
      
      if (drawer && 
          !drawer.contains(event.target) && 
          menuButton && 
          !menuButton.contains(event.target) &&
          suitSetsButton &&
          !suitSetsButton.contains(event.target) &&
          sareesButton &&
          !sareesButton.contains(event.target)) {
        setActiveCategoryDrawer(null);
        setActiveSubcategory(null);
      }
    };
    
    if (activeCategoryDrawer) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [activeCategoryDrawer, setActiveCategoryDrawer]);
  
  // Reset subcategory when main category changes
  useEffect(() => {
    setActiveSubcategory(null);
  }, [activeCategoryDrawer]);
  
  // Main navigation categories
  const navCategories = [
    { name: "SUIT SETS", id: "suit-sets" },
    { name: "SAREES", id: "sarees" }
  ];
  
  // Subcategories data
  const subcategories = {
    "suit-sets": [
      { name: "Shop by Fabric", id: "fabric", subcategories: [
        { name: "Cotton", path: "/suit-sets/fabric/cotton" },
        { name: "Silk", path: "/suit-sets/fabric/silk" },
        { name: "Linen", path: "/suit-sets/fabric/linen" },
        { name: "Chiffon", path: "/suit-sets/fabric/chiffon" }
      ]},
      { name: "Shop by Art", id: "art", subcategories: [
        { name: "Embroidery", path: "/suit-sets/art/embroidery" },
        { name: "Block Print", path: "/suit-sets/art/block-print" },
        { name: "Hand Painted", path: "/suit-sets/art/hand-painted" },
        { name: "Zari Work", path: "/suit-sets/art/zari-work" }
      ]},
      { name: "All", path: "/suit-sets" }
    ],
    "sarees": [
      { name: "Shop by Collection", id: "collection", subcategories: [
        { name: "Festive", path: "/sarees/collection/festive" },
        { name: "Bridal", path: "/sarees/collection/bridal" },
        { name: "Casual", path: "/sarees/collection/casual" },
        { name: "Party Wear", path: "/sarees/collection/party-wear" }
      ]},
      { name: "Shop by Fabric", id: "fabric", subcategories: [
        { name: "Banarasi Silk", path: "/sarees/fabric/banarasi-silk" },
        { name: "Soft Silk", path: "/sarees/fabric/soft-silk" },
        { name: "Cotton", path: "/sarees/fabric/cotton" },
        { name: "Georgette", path: "/sarees/fabric/georgette" }
      ]},
      { name: "Shop by Art", id: "art", subcategories: [
        { name: "Zari", path: "/sarees/art/zari" },
        { name: "Bandhani", path: "/sarees/art/bandhani" },
        { name: "Embroidery", path: "/sarees/art/embroidery" },
        { name: "Printed", path: "/sarees/art/printed" }
      ]},
      { name: "All", path: "/sarees" }
    ]
  };
  
  // Find the active category ID based on the name
  const getActiveCategoryId = () => {
    if (!activeCategoryDrawer) return null;
    const category = navCategories.find(cat => cat.name === activeCategoryDrawer);
    return category ? category.id : null;
  };
  
  const activeCategoryId = getActiveCategoryId();

  return (
    <>
      {/* Always render drawer but control visibility with classes */}
      <div id="category-drawer" 
        className={`fixed inset-y-0 bg-[#fefdf9] z-50 shadow-lg transition-transform duration-700 ease-in-out overflow-y-auto ${
          isMobile 
            ? 'right-0 w-full' 
            : 'left-0 w-full md:w-2/3 lg:w-1/2'
        }`}
        style={{ 
          transform: activeCategoryDrawer 
            ? 'translateX(0)' 
            : (isMobile ? 'translateX(100%)' : 'translateX(-100%)'),
          visibility: activeCategoryDrawer ? 'visible' : 'hidden'
        }}
      >
        <div className="flex items-center p-4 border-b border-[#993f3c] border-opacity-20">
          <button onClick={() => {
            setActiveCategoryDrawer(null);
            setActiveSubcategory(null);
          }} className="mr-4 text-[#993f3c] hover:bg-[#f5e8e8] p-2 rounded-full transition-all">
            <X size={24} />
          </button>
          
          <div className="flex space-x-8 overflow-x-auto no-scrollbar">
            {navCategories.map((item) => (
              <button
                key={item.name}
                onClick={() => {
                  setActiveCategoryDrawer(item.name);
                  setActiveSubcategory(null);
                }}
                className={`font-medium whitespace-nowrap transition-colors ${
                  activeCategoryDrawer === item.name 
                    ? 'text-[#993f3c] font-semibold after:content-[""] after:block after:w-full after:h-0.5 after:bg-[#993f3c] after:mt-1' 
                    : 'text-[#4a3e3e] hover:text-[#993f3c]'
                }`}
              >
                {item.name}
              </button>
            ))}
          </div>
        </div>
        
        {/* Category Content */}
        {activeCategoryDrawer && activeCategoryId && (
          <div className="flex flex-col md:flex-row w-full">
            {/* Left Column - Category Navigation */}
            <div className="w-full md:w-1/3 p-6 border-r border-[#993f3c] border-opacity-20">
              <div className="space-y-4">
                {subcategories[activeCategoryId].map((category, index) => (
                  category.subcategories ? (
                    <div key={index} className="py-2">
                      <button 
                        onClick={() => setActiveSubcategory(activeSubcategory === category.id ? null : category.id)}
                        className={`flex items-center justify-between w-full text-left font-medium py-2 hover:text-[#993f3c] transition-colors ${
                          activeSubcategory === category.id ? 'text-[#993f3c]' : 'text-[#4a3e3e]'
                        }`}
                      >
                        <span>{category.name}</span>
                        <ChevronDown 
                          className={`h-5 w-5 transition-transform ${
                            activeSubcategory === category.id ? 'rotate-180' : ''
                          }`} 
                        />
                      </button>
                      
                      {/* Subcategories */}
                      <div 
                        className={`pl-4 pt-2 space-y-3 overflow-hidden transition-all duration-300 ${
                          activeSubcategory === category.id ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                        }`}
                      >
                        {category.subcategories.map((subcat, subIndex) => (
                          <Link 
                            key={subIndex}
                            to={subcat.path}
                            onClick={() => {
                              setActiveCategoryDrawer(null);
                              setActiveSubcategory(null);
                            }}
                            className="flex items-center text-[#4a3e3e] hover:text-[#993f3c] transition-colors pb-1 border-b border-transparent hover:border-[#993f3c] hover:border-opacity-20"
                          >
                            <ChevronRight className="h-4 w-4 mr-2" />
                            <span>{subcat.name}</span>
                          </Link>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <Link 
                      key={index}
                      to={category.path}
                      onClick={() => {
                        setActiveCategoryDrawer(null);
                        setActiveSubcategory(null);
                      }}
                      className="block font-medium py-2 text-[#4a3e3e] hover:text-[#993f3c] transition-colors"
                    >
                      {category.name}
                    </Link>
                  )
                ))}
              </div>
            </div>
            
            {/* Right Column - Featured Content */}
            <div className="w-full md:w-2/3 p-6">
              <h2 className="text-xl font-bold mb-6 text-[#993f3c]">Featured {activeCategoryDrawer}</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Featured Item 1 */}
                <div className="bg-[#f5e8e8] rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                  <div className="h-64 bg-gray-200"></div>
                  <div className="p-4">
                    <h3 className="font-medium text-lg">Best Sellers</h3>
                    <p className="text-[#4a3e3e] mt-2">Discover our most popular {activeCategoryDrawer.toLowerCase()}</p>
                    <Link 
                      to={`/${activeCategoryId}/best-sellers`}
                      onClick={() => {
                        setActiveCategoryDrawer(null);
                        setActiveSubcategory(null);
                      }}
                      className="mt-4 inline-block text-[#993f3c] font-medium hover:underline"
                    >
                      Shop Now
                    </Link>
                  </div>
                </div>
                
                {/* Featured Item 2 */}
                <div className="bg-[#f5e8e8] rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                  <div className="h-64 bg-gray-200"></div>
                  <div className="p-4">
                    <h3 className="font-medium text-lg">New Arrivals</h3>
                    <p className="text-[#4a3e3e] mt-2">Check out our latest {activeCategoryDrawer.toLowerCase()}</p>
                    <Link 
                      to={`/${activeCategoryId}/new-arrivals`}
                      onClick={() => {
                        setActiveCategoryDrawer(null);
                        setActiveSubcategory(null);
                      }}
                      className="mt-4 inline-block text-[#993f3c] font-medium hover:underline"
                    >
                      Shop Now
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      
      {/* Overlay with opacity transition */}
      <div 
        className={`fixed inset-0 bg-black transition-opacity duration-700 ${
          activeCategoryDrawer ? 'opacity-50 z-40' : 'opacity-0 -z-10'
        }`}
        onClick={() => {
          setActiveCategoryDrawer(null);
          setActiveSubcategory(null);
        }}
      />
    </>
  );
}