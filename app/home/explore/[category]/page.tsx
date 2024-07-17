"use client";

import React, { useEffect, useState } from "react";
import { Movie } from "../../../models/movie";
import { Button } from "@/components/ui/button";
import MovieShowCase from "@/app/components/MovieShowCase";
import { TrendingUp } from "lucide-react";

export default function MoviePage({ params }: { params: { category: string } }) {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [page, setPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
  
    useEffect(() => {
        fetchData(page);
      }, [page]);

    const fetchData = (page: number) => {
        setIsLoading(true);
        fetch(`https://api.themoviedb.org/3/movie/${params.category}?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&language=en-US&page=${page}&include_adult=true`)
          .then((response) => response.json())
          .then((result) => {
            setMovies((prevData) => [...prevData, ...result.results]);
          })
          .catch((error) => {
            console.error('Error fetching data:', error);
          })
          .finally(() => {
            setIsLoading(false);
          });
      };
    
  
    const loadMoreData = () => {
      setPage((prevPage) => prevPage + 1);
    };

    function title_formater(title: string) {
        let formatted_title = ""
        title.split('_').map((word) => {
            formatted_title += (word[0].toUpperCase() + word.slice(1) + " ")
        })
        
        return formatted_title.substring(0, formatted_title.length - 1)
    }

    return (
        <div className="my-10">
            <h1 className="text-4xl font-bold">{title_formater(params.category)}</h1>
            <MovieShowCase movies={movies} />
            <div className="flex justify-center my-5">
                <Button disabled={isLoading} onClick={loadMoreData} className="" >{isLoading ? 'Loading...' : 'Load More'}</Button>
            </div>
        </div>
    );
}