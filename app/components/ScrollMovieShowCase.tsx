import React from "react";
import { Movie } from "@prisma/client";
import Link from "next/link";
import ImageFallback from "./ImageFallback";
import { Button } from "@/components/ui/button";
import { Clapperboard } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"

interface MovieProps {
    movies: Movie[];
    emptyMessage?: string;
    btn?: boolean;
    loading?: boolean;
    isEmpty?: boolean;
}

export default function ScrollMovieShowCase({ movies, emptyMessage, btn, loading, isEmpty }: MovieProps) {

    if (loading) {
        return (
            <div className="grid grid-rows-2 grid-flow-col w-max gap-2 sm:gap-4 mt-3 mb-4">
                {[...Array(12)].map((_, index) => (
                    <div key={index} className="relative group">
                        <Skeleton className="w-[90px] h-[150px] md:h-[300px] md:w-[200px] rounded-sm" />
                    </div>
                ))}
            </div>
        );
    }

    if (isEmpty) {
        return (
            <div className="flex flex-col items-center justify-center text-center mt-10 gap-4">
                <p className="text-lg text-grey_muted">{emptyMessage}</p>
                {btn &&
                    <Link href="/explore">
                        <Button variant="destructive" className="text-off_white bg-red_power gap-2">Explore Movies <Clapperboard /></Button>
                    </Link>
                }
            </div>
        )
    }

    return (

        <ScrollArea className="whitespace-nowrap mt-4">
            <div className="grid grid-rows-2 grid-flow-col w-max gap-2 sm:gap-4 mb-4">
                {movies.map((movie) => (
                    <div key={movie.id} className="w-[90px] md:w-[200px]">
                        <Link href={`/movie/${movie.id}`}>
                            <ImageFallback title={movie.title} fallback="/posterFallback.jpeg" src={process.env.NEXT_PUBLIC_TMDB_POSTER_BASE_URL + movie.poster_path} styles="hover:brightness-50 rounded-sm" />
                        </Link>
                    </div>
                ))}
            </div>
            <ScrollBar hidden={true} orientation="horizontal" />
        </ScrollArea>

    );
}