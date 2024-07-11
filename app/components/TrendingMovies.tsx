import Image from "next/image";
import React from "react";
import { Movie } from "../models/movie";

interface MovieProps {
    movies: Movie[];
}

export default function TrendingMovies({ movies }: MovieProps) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-8 gap-6">
            {movies.map((movie) => (
                <div>
                    <Image width={500} height={100} alt="movie poster" src={`https://image.tmdb.org/t/p/w500/` + `${movie.poster_path}`}></Image>
                    <p key={movie.id}>{movie.title}</p>
                </div>
            ))}
        </div>
    );
}