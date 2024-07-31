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
      router.push(`/search?query=${encodeURIComponent(query)}`);
    }
  }, [query, router]);

  return (
    <div className="flex items-center z-10">
      {searchVisible && (
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          className="max-w-xs mr-2 p-1 rounded-md bg-transparent text-grey_muted focus:outline-none focus:ring-1 focus:ring-off_white"
          placeholder="Find your movie..."
          autoFocus
        />
      )}
      <SearchIcon onClick={handleSearchClick} className="w-6 h-6 text-gray-300 cursor-pointer text-grey_muted hover:text-red_power" />
    </div>
  );
};

export default SearchBar;
