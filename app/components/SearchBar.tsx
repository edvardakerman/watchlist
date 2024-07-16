"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { SearchIcon } from 'lucide-react';

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const [searchVisible, setSearchVisible] = useState(false);
  const router = useRouter();

  const handleSearchClick = () => {
    setSearchVisible(!searchVisible);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  useEffect(() => {
    if (query.trim() !== '') {
      router.push(`/home/search?query=${encodeURIComponent(query)}`);
    }
  }, [query, router]);

  return (
    <div className="flex items-center">
      {searchVisible && (
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          className="max-w-xs mr-2 p-1 rounded-md bg-transparent text-gray-300 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-white"
          placeholder="Search..."
          autoFocus
        />
      )}
      <SearchIcon onClick={handleSearchClick} className="w-6 h-6 text-gray-300 cursor-pointer" />
    </div>
  );
};

export default SearchBar;
