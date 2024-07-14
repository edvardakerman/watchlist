"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Movie } from "../../../models/movie";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Genre } from "@/app/models/genre";
import { pages } from "next/dist/build/templates/app-page";

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

    return (
        <div className="my-10">
            <h1 className="text-4xl font-bold">{params.category[0].toUpperCase() + params.category.slice(1)}</h1>
            <div className="grid grid-cols-3 lg:grid-cols-6 mt-8 gap-6">
                {movies.map((movie) => (
                    <div className="" key={movie.id}>
                        <Link href={`/home/movie/${movie.id}`}>
                            <Image priority className="hover:brightness-50" title={movie.title} width={300} height={100} alt="movie poster" src={`https://image.tmdb.org/t/p/w500/` + `${movie.poster_path}`}></Image>
                        </Link>
                        <p className="text-xs">{movie.title}</p>
                    </div>
                ))}
            </div>
            <div className="flex justify-center my-5">
                <Button disabled={isLoading} onClick={loadMoreData} className="" >{isLoading ? 'Loading...' : 'Load More'}</Button>
            </div>
        </div>
    );
}