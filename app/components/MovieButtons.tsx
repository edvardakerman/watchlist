"use client";

import React, { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { LogIn } from "lucide-react";
import Link from 'next/link';
import AddToWatchedButton from "@/app/components/AddToWatchedButton";
import AddToWatchlistButton from "@/app/components/AddToWatchlistButton";
import { Movie } from '../models/movie';
import { useSession } from "next-auth/react";
import { Genre } from '../models/genre';

interface MovieButtonProps {
    movie: Movie;
}

interface MovieInList {
    id: number,
    poster_path: string,
    title: string
    watchlist: boolean
    watchlistId: string | undefined
    genresArray: Genre[]
}

export default function MovieButtons({ movie }: MovieButtonProps) {
    const { data: session, status } = useSession();
    const [movieInWatchlist, setMovieInWatchlist] = useState<MovieInList | null>(null);
    const [movieInWatched, setMovieInWatched] = useState<MovieInList | null>(null);

    useEffect(() => {
        (async () => {

            if (session?.user?.email) {

                Promise.all([
                    fetch(`/api/watchlist/watch/contains/${movie.id}`),
                    fetch(`/api/watchlist/watched/contains/${movie.id}`)
                  ]).then(async([watchlistResponse, watchedDataResponse]) => {
                    const watchlistData = await watchlistResponse.json();
                    const watchedData = await watchedDataResponse.json();
                    setMovieInWatchlist(watchlistData);
                    setMovieInWatched(watchedData);
                  })
                  .then((responseText) => {
                    console.log(responseText);
                
                  }).catch((err) => {
                    console.log(err);
                  });

            }

        })();
    }, [movie, session]);

    if (!session) {
        return (
            <Link href="/sign-in">
                <Button variant="destructive" className="gap-2 text-off_white bg-red_power">
                    Login <LogIn />
                </Button>
            </Link>
        );
    }

    if (movieInWatchlist === null || movieInWatched === null) {
        return <div>Loading...</div>;
    }

    return (
        <div className="mt-7 flex flex-row space-x-10">
            <AddToWatchedButton
                watched={movieInWatched.watchlist}
                watchedId={movieInWatched.watchlistId}
                id={Number(movie.id)}
                poster_path={movie.poster_path}
                title={movie.title}
            />
            <AddToWatchlistButton
                genresArray={movie.genres}
                watchlist={movieInWatchlist.watchlist}
                watchlistId={movieInWatchlist.watchlistId}
                id={Number(movie.id)}
                poster_path={movie.poster_path}
                title={movie.title}
            />
        </div>
    );
};
