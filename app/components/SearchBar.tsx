"use client";

import { useState, useEffect, Suspense } from 'react';
import { usePathname } from 'next/navigation'
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { SearchIcon } from 'lucide-react';

const SearchBar = () => {
  const searchParams = useSearchParams();
  const queryPar = searchParams.get('query') || '';
  const [query, setQuery] = useState(queryPar ? decodeURIComponent(queryPar) : '');
  const pathname = usePathname()
  const [searchVisible, setSearchVisible] = useState(pathname === "/search" ? true : false);
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
          className="max-w-44 mr-2 p-1 rounded-md bg-black text-grey_muted focus:outline-none focus:ring-1 focus:ring-off_white"
          placeholder="Find your movie..."
          autoFocus
        />
      )}
      <SearchIcon onClick={handleSearchClick} className="w-7 h-7 text-gray-300 cursor-pointer text-grey_muted hover:text-red_power" />
    </div>
  );
};

export default function SuspenseWrapper() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SearchBar />
    </Suspense>
  );
}