import React from "react";
import { Movie } from "../models/movie";
import Link from "next/link";
import ImageFallback from "./ImageFallback";

interface MovieProps {
    movies: Movie[];
}

export default function MovieShowCase({ movies }: MovieProps) {
    return (
            <div className="grid grid-cols-3 lg:grid-cols-6 gap-6 mt-4">
                {movies.map((movie) => (
                    <div className="relative group">
                        <Link href={`/movie/${movie.id}`}>
                            <ImageFallback title={movie.title} fallback="/posterFallback.jpeg" src={`https://image.tmdb.org/t/p/w500/` + `${movie.poster_path}`} styles="hover:brightness-50 rounded-sm"/>
                        </Link>
                    </div>
                ))}
            </div>
    );
}