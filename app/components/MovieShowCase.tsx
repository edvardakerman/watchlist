import React from "react";
import { Movie } from "../models/movie";
import Link from "next/link";
import ImageFallback from "./ImageFallback";
import { Button } from "@/components/ui/button";
import { Clapperboard } from "lucide-react";

interface MovieProps {
    movies: Movie[];
    emptyMessage?: string;
    btn?: boolean;
}

export default function MovieShowCase({ movies, emptyMessage, btn }: MovieProps) {

    if (movies.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center text-center mt-10 gap-4">
                <p className="text-lg text-grey_muted">{emptyMessage}</p>
                {btn &&
                    <Link href="/explore">
                        <Button variant="destructive" className="text-off_white bg-red_power gap-2">Explore Movies <Clapperboard  /></Button>
                    </Link>
                }
            </div>
        )
    }
    return (
        <div className="grid grid-cols-3 lg:grid-cols-6 gap-6 mt-4">
            {movies.map((movie) => (
                <div key={movie.id} className="relative group">
                    <Link href={`/movie/${movie.id}`}>
                        <ImageFallback title={movie.title} fallback="/posterFallback.jpeg" src={`https://image.tmdb.org/t/p/w500/` + `${movie.poster_path}`} styles="hover:brightness-50 rounded-sm" />
                    </Link>
                </div>
            ))}
        </div>
    );
}