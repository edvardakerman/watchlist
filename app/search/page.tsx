"use client";

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import MovieShowCase from '@/app/components/MovieShowCase';
import { Movie } from '@/app/models/movie';

const SearchPage = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const searchParams = useSearchParams();
  const query = searchParams.get('query') || '';

  useEffect(() => {
    if (query) {
      fetchMovies(query);
    }
  }, [query]);

  const fetchMovies = async (searchQuery: string) => {
    const response = await fetch(
      `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(searchQuery)}&api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`
    );
    const data = await response.json();
    setMovies(data.results);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold mb-4 text-off_white">Search Results for "{query}"</h1>
      <MovieShowCase movies={movies} />
    </div>
  );
};

export default SearchPage;
