import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const searchInputRef = useRef(null);
  const navigate = useNavigate();
  
  // Focus the search input when the component mounts
  useEffect(() => {
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, []);
  
  // Handle search submission
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      // Optionally close the search bar after submission
      // if you have access to the setSearchOpen function
    }
  };

  return (
    <div className="absolute right-0 top-full mt-2 w-64 bg-[#fefdf9] shadow-lg rounded-md p-3 z-50 search-component">
      <form onSubmit={handleSearch} className="flex items-center border border-[#993f3c] rounded-md overflow-hidden">
        <input
          ref={searchInputRef}
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full px-3 py-2 outline-none bg-[#fefdf9] text-[#4a3e3e]"
        />
        <button 
          type="submit"
          className="bg-[#993f3c] text-[#fefdf9] hover:bg-[#761f1c] p-2 transition-colors"
        >
          <Search className="h-4 w-4" />
        </button>
      </form>
    </div>
  );
};

export default SearchBar;