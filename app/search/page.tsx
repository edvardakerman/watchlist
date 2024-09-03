"use client";

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import MovieShowCase from '@/app/components/MovieShowCase';
import { Movie } from "@prisma/client";
import Oops from '../components/Oops';

const SearchPage = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const searchParams = useSearchParams();
  const query = searchParams.get('query') || '';
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (query.length >= 3) {
      fetchMovies(query);
    }
  }, [query]);

  const fetchMovies = async (searchQuery: string) => {
    setIsLoading(true);
    setHasError(false);
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(searchQuery)}&api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`
      );
      if (!response.ok) {
        throw new Error(`Failed to fetch data`);
      }
      const data = await response.json();
      setMovies(data.results);
    } catch (error: any) {
      setHasError(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold mb-4 text-off_white">Search Results for {query}</h1>
      {isLoading && (
        <div className="flex flex-col items-center justify-center text-center mt-36">
          <p className='text-grey_muted'>Loading...</p>
        </div>
      )}
      {hasError && (
        <Oops btn_link="/explore" btn_text="Explore Movies" message="Oops! Something went wrong" />
      )}
      {!isLoading && !hasError && movies.length > 0 && query.length >= 3 && (
        <MovieShowCase movies={movies.slice(0, 12)} />
      )}
      {!isLoading && !hasError && query.length < 3 && (
        <div className="flex flex-col items-center justify-center text-center mt-36">
          <p className='text-grey_muted'>Please enter a search query with at least 3 characters</p>
        </div>
      )}
      {!isLoading && !hasError && movies.length === 0 && query.length >= 3 && (
        <div className="flex flex-col items-center justify-center text-center mt-36">
          <p className='text-grey_muted'>No results found for {query}</p>
        </div>
      )}
    </div>
  );
};

export default function SuspenseWrapper() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SearchPage />
    </Suspense>
  );
}
