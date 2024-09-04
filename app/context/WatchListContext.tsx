'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Movie } from "@prisma/client";

interface WatchListContextType {
  watch: Movie[];
  watched: Movie[];
  setWatch: React.Dispatch<React.SetStateAction<Movie[]>>;
  setWatched: React.Dispatch<React.SetStateAction<Movie[]>>;
}

const WatchListContext = createContext<WatchListContextType | undefined>(undefined);

export const WatchListProvider = ({ children }: { children: ReactNode }) => {
  const [watch, setWatch] = useState<Movie[]>([]);
  const [watched, setWatched] = useState<Movie[]>([]);

  return (
    <WatchListContext.Provider value={{ watch, setWatch, watched, setWatched  }}>
      {children}
    </WatchListContext.Provider>
  );
};

export const useWatchListContext = () => {
  const context = useContext(WatchListContext);
  if (!context) {
    throw new Error('useWatchListContext must be used within a WatchListProvider');
  }
  return context;
};
