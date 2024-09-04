'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Movie } from "@prisma/client";

interface MoviesContextType {
  movies: Movie[];
  page: number;
  category: string;
  btnAction: boolean;
  setBtnAction: React.Dispatch<React.SetStateAction<boolean>>
  setCategory: React.Dispatch<React.SetStateAction<string>>
  setMovies: React.Dispatch<React.SetStateAction<Movie[]>>;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

const MoviesContext = createContext<MoviesContextType | undefined>(undefined);

export const MoviesProvider = ({ children }: { children: ReactNode }) => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [category, setCategory] = useState(String);
  const [page, setPage] = useState(1);
  const [btnAction, setBtnAction] = useState(false);

  return (
    <MoviesContext.Provider value={{ movies, setMovies, page, setPage, category, setCategory, btnAction, setBtnAction }}>
      {children}
    </MoviesContext.Provider>
  );
};

export const useMoviesContext = () => {
  const context = useContext(MoviesContext);
  if (!context) {
    throw new Error('useMoviesContext must be used within a MoviesProvider');
  }
  return context;
};
