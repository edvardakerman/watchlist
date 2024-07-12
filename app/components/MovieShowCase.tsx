import Image from "next/image";
import React from "react";
import { Movie } from "../models/movie";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface MovieProps {
    movies: Movie[];
    title: string;
}

export default function MovieShowCase({ movies, title }: MovieProps) {
    const topTwelve = movies.slice(0, 12);

    return (
        <div className="py-10">
            <Link href='#'><h3 className='text-3xl font-bold'>{title}</h3></Link>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 mt-8 gap-6">
                {topTwelve.map((movie) => (
                    <div className="relative group">
                        <Link href={`/home/movie/${movie.id}`}>
                            <Image className="hover:brightness-50" title={movie.title} width={200} height={100} alt="movie poster" src={`https://image.tmdb.org/t/p/w500/` + `${movie.poster_path}`}></Image>
                        </Link>
                        <div className="absolute bottom-0 left-0 w-full p-2 text-white text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            {movie.title}
                        </div>
                        {movie.id}
                    </div>
                ))}
            </div>
        </div>
    );
}