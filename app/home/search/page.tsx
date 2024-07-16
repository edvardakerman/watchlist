"use client";

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
}

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
      <h1 className="text-2xl font-semibold mb-4">Search Results for "{query}"</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {movies.map((movie) => (
          <div key={movie.id} className="bg-gray-800 rounded-lg p-4">
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              className="rounded-lg mb-2"
            />
            <h2 className="text-lg font-semibold text-gray-200">{movie.title}</h2>
            <p className="text-gray-400">{movie.overview}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchPage;
