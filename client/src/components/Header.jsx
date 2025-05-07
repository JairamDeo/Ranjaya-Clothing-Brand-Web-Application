import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, ShoppingBag, User, ChevronDown, X, Search } from 'lucide-react';
import Logo from '../assets/Logo.webp';
import SearchBar from './SearchBar';
import CategoryDrawer from './CategoryDrawer';
import CartComponent from './CartComponent';

const Header = () => {
  const location = useLocation();
  const headerRef = useRef(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [headerHeight, setHeaderHeight] = useState(160);
  const [activeCategoryDrawer, setActiveCategoryDrawer] = useState(null);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const isMobile = windowWidth < 768;

  useEffect(() => {
    const updateHeaderHeight = () => {
      if (headerRef.current) {
        const height = headerRef.current.offsetHeight;
        setHeaderHeight(height);
        document.documentElement.style.setProperty('--header-height', `${height}px`);
      }
    };

    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      updateHeaderHeight();
    };

    updateHeaderHeight();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (mobileMenuOpen && !event.target.closest('.mobile-menu') && !event.target.closest('.mobile-menu-button')) {
        setMobileMenuOpen(false);
      }
      if (searchOpen && !event.target.closest('.search-component') && !event.target.closest('.search-button')) {
        setSearchOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [mobileMenuOpen, searchOpen]);

  useEffect(() => {
    setMobileMenuOpen(false);
    setSearchOpen(false);
    setActiveCategoryDrawer(null);
  }, [location]);

  const isActive = (path) => {
    if (path === '/' && location.pathname === '/') return true;
    return path !== '/' && location.pathname.startsWith(path);
  };

  const navItems = [
    { name: "HOME", path: "/", hasDropdown: false },
    { name: "SUIT SETS", path: "/suit-sets", hasDropdown: true, opensCategoryDrawer: true },
    { name: "SAREES", path: "/sarees", hasDropdown: true, opensCategoryDrawer: true },
    { name: "NEW ARRIVALS", path: "/new-arrivals", hasDropdown: false },
    { name: "BEST SELLERS", path: "/best-sellers", hasDropdown: false },
    { name: "ABOUT US", path: "/about-us", hasDropdown: false },
    { name: "CONTACT US", path: "/contact-us", hasDropdown: false },
  ];

  const toggleCategoryDrawer = (category) => {
    setActiveCategoryDrawer(prev => prev === category ? null : category);
  };

  return (
    <>
      <nav ref={headerRef} className="shadow-md w-full fixed top-0 left-0 z-50 bg-[#fefdf9]">
        <div className="flex items-center px-4 py-3 md:px-6 lg:px-12" style={{ height: '80px' }}>
          <div className="flex items-center lg:w-1/3 justify-start">
            <button
              id="menu-button"
              onClick={() => toggleCategoryDrawer('SUIT SETS')}
              className="hidden lg:flex flex-col justify-center items-center h-8 w-8 hover:bg-[#f5e8e8] rounded-full p-2 transition-all"
              aria-label="Toggle category drawer"
            >
              <span className="h-0.5 w-5 bg-[#993f3c] mb-1"></span>
              <span className="h-0.5 w-5 bg-[#993f3c] mb-1"></span>
              <span className="h-0.5 w-5 bg-[#993f3c]"></span>
            </button>

            <Link to="/" className="lg:hidden ml-2" aria-label="Go to Home">
              <img src={Logo} alt="Ranjaya Logo" className="h-12" loading="lazy" />
            </Link>
          </div>

          <div className="hidden lg:flex justify-center items-center lg:w-1/3">
            <Link to="/" aria-label="Go to Home">
              <img src={Logo} alt="Ranjaya Logo" className="h-16" loading="lazy" />
            </Link>
          </div>

          <div className="flex items-center ml-auto lg:w-1/3 justify-end space-x-5">
            <div className="relative search-component">
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className="text-[#993f3c] hover:bg-[#f5e8e8] p-2 rounded-full transition-all search-button"
                aria-label="Toggle search bar"
              >
                <Search className="h-5 w-5" />
              </button>
              {searchOpen && <SearchBar />}
            </div>

            <div className="cart-button" aria-label="Shopping cart">
              <CartComponent />
            </div>

            <Link
              to="/account"
              className="text-[#993f3c] hover:bg-[#f5e8e8] p-2 rounded-full transition-all"
              aria-label="User account"
            >
              <User className="h-5 w-5" />
            </Link>

            {/* ==================== MOBILE MENU BUTTON ==================== */}
            <button
              className="lg:hidden mobile-menu-button text-[#993f3c] hover:bg-[#f5e8e8] p-2 rounded-full transition-all"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-6 w-6 hidden" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* ==================== BOTTOM ROW - DESKTOP NAV ITEMS ==================== */}
        <div className="hidden lg:flex justify-center border-t border-[#993f3c] border-opacity-20" style={{ height: '80px' }}>
          <ul className="flex space-x-8 items-center h-full">
            {navItems.map((item, index) => (
              <li key={index} className="relative h-full flex items-center">
                <div className="flex items-center cursor-pointer h-full">
                  {item.opensCategoryDrawer ? (
                    <button
                      id={`${item.path.substring(1)}-button`}
                      onClick={() => toggleCategoryDrawer(item.name)}
                      className={`font-medium tracking-wide transition-colors px-2 py-1 flex items-center h-full relative
                        ${isActive(item.path) || activeCategoryDrawer === item.name
                          ? 'text-[#993f3c] after:content-[""] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-[#993f3c]'
                          : 'text-[#4a3e3e] hover:text-[#993f3c] hover:after:content-[""] hover:after:absolute hover:after:bottom-0 hover:after:left-0 hover:after:w-full hover:after:h-0.5 hover:after:bg-[#993f3c]'
                        }`}
                    >
                      {item.name}
                      {item.hasDropdown && <ChevronDown className="h-4 w-4 ml-1" />}
                    </button>
                  ) : (
                    <Link
                      to={item.path}
                      className={`font-medium tracking-wide transition-colors px-2 py-1 flex items-center h-full relative
                        ${isActive(item.path)
                          ? 'text-[#993f3c] after:content-[""] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-[#993f3c]'
                          : 'text-[#4a3e3e] hover:text-[#993f3c] hover:after:content-[""] hover:after:absolute hover:after:bottom-0 hover:after:left-0 hover:after:w-full hover:after:h-0.5 hover:after:bg-[#993f3c]'
                        }`}
                    >
                      {item.name}
                      {item.hasDropdown && !item.opensCategoryDrawer && <ChevronDown className="h-4 w-4 ml-1" />}
                    </Link>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* ==================== MOBILE SLIDING MENU ==================== */}
      <div
        className={`fixed top-0 left-0 h-screen w-full max-w-xs bg-[#fefdf9] shadow-lg z-50 transform transition-transform duration-300 ease-in-out ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
          } mobile-menu flex flex-col`}
      >
        {/* Mobile Menu Header with Close Button */}
        <div className="flex justify-between items-center p-4 border-b border-[#993f3c] border-opacity-20">
          <Link to="/" className="text-xl font-bold" onClick={() => setMobileMenuOpen(false)}>
            <img src={Logo} alt="Ranjaya" className="h-12" />
          </Link>
          <button
            onClick={() => setMobileMenuOpen(false)}
            className="text-[#993f3c] hover:bg-[#f5e8e8] p-2 rounded-full transition-all"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Mobile Menu Items - Added flex-grow to take available space */}
        <div className="py-4 flex-grow overflow-y-auto">
          <ul className="space-y-1">
            {navItems.map((item, index) => (
              <li key={index} className="relative">
                {item.opensCategoryDrawer ? (
                  <details className="group">
                    <summary
                      className={`flex justify-between items-center px-5 py-3 cursor-pointer hover:bg-[#f5e8e8] hover:text-[#993f3c]
                        ${isActive(item.path) ? 'text-[#993f3c] bg-[#f5e8e8]' : 'text-[#4a3e3e]'}`}
                      onClick={(e) => {
                        // Prevent default behavior to control the details element manually
                        e.preventDefault();
                        toggleCategoryDrawer(item.name);
                        setMobileMenuOpen(false);
                      }}
                    >
                      <span className="font-medium">{item.name}</span>
                      <ChevronDown className="h-4 w-4 transition-transform group-open:rotate-180" />
                    </summary>
                  </details>
                ) : item.hasDropdown ? (
                  <details className="group">
                    <summary className={`flex justify-between items-center px-5 py-3 cursor-pointer hover:bg-[#f5e8e8] hover:text-[#993f3c]
                      ${isActive(item.path) ? 'text-[#993f3c] bg-[#f5e8e8]' : 'text-[#4a3e3e]'}`}
                    >
                      <span className="font-medium">{item.name}</span>
                      <ChevronDown className="h-4 w-4 transition-transform group-open:rotate-180" />
                    </summary>
                    <div className="pl-5 border-l border-[#993f3c] ml-5 space-y-1 mt-1">
                      {/* Generic dropdown items for non-category menu items */}
                      <Link
                        to={`${item.path}/option-1`}
                        className="block px-5 py-2 hover:bg-[#f5e8e8] hover:text-[#993f3c] text-[#4a3e3e]"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        Option 1
                      </Link>
                      <Link
                        to={`${item.path}/option-2`}
                        className="block px-5 py-2 hover:bg-[#f5e8e8] hover:text-[#993f3c] text-[#4a3e3e]"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        Option 2
                      </Link>
                    </div>
                  </details>
                ) : (
                  <Link
                    to={item.path}
                    className={`block px-5 py-3 hover:bg-[#f5e8e8] hover:text-[#993f3c] font-medium
                      ${isActive(item.path) ? 'text-[#993f3c] bg-[#f5e8e8]' : 'text-[#4a3e3e]'}`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </div>

        {/* Mobile Menu Footer - Now at the bottom with flex layout */}
        <div className="border-t border-[#993f3c] border-opacity-20 p-4 w-full absolute bottom-[60px] sm:bottom-[180px] md:bottom-[80px]">
          <div className="flex space-x-4 justify-around">
            <Link to="/account" className="text-center text-[#4a3e3e] hover:text-[#993f3c]" onClick={() => setMobileMenuOpen(false)}>
              <User className="h-5 w-5 mx-auto mb-1" />
              <span className="text-sm">Account</span>
            </Link>
            {/* Shopping Bag Icon cart button */}
            <div className="text-center text-[#4a3e3e] hover:text-[#993f3c]" onClick={() => setMobileMenuOpen(false)}>
              <div className="cart-button-mobile">
                <ShoppingBag className="h-5 w-5 mx-auto mb-1" />
                <span className="text-sm">Cart</span>
              </div>
            </div>
            <Link to="/search" className="text-center text-[#4a3e3e] hover:text-[#993f3c]" onClick={() => setMobileMenuOpen(false)}>
              <Search className="h-5 w-5 mx-auto mb-1" />
              <span className="text-sm">Search</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Category Drawer Component */}
      <CategoryDrawer
        activeCategoryDrawer={activeCategoryDrawer}
        setActiveCategoryDrawer={setActiveCategoryDrawer}
        windowWidth={windowWidth}
        isMobile={isMobile}
      />

      {/* Overlay when mobile menu is open */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-40"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Dynamic spacer that automatically adjusts to the height of the header */}
      <div style={{ height: `${headerHeight}px` }}></div>
    </>
  );
};

export default Header;