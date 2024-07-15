"use client";

import { useState } from 'react';

const SearchBar = () => {
  const [searchVisible, setSearchVisible] = useState(false);

  const handleSearchClick = () => {
    setSearchVisible(!searchVisible);
  };

  return (
    <div className="flex items-center space-x-4">
      {searchVisible && (
        <input
          type="text"
          className="w-full max-w-md p-2 rounded-md bg-gray-800 text-gray-300 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Search..."
          autoFocus
        />
      )}
      <svg 
        onClick={handleSearchClick} 
        className="w-6 h-6 text-gray-300 cursor-pointer" 
        fill="none" 
        stroke="currentColor" 
        viewBox="0 0 24 24" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-4.35-4.35M16.5 10.5a6 6 0 10-12 0 6 6 0 0012 0z"></path>
      </svg>
    </div>
  );
};

export default SearchBar;
