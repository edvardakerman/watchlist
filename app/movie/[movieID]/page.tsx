import React, { useState } from "react";
import { Movie } from "../../models/movie";
import { Button } from "@/components/ui/button";
import { Genre } from "@/app/models/genre";
import VideoPlayer from "@/app/components/VideoPlayer";
import { ArrowLeft, ArrowRight, Frown, LogIn, Plus, StarHalf } from "lucide-react";
import MovieShowCase from "@/app/components/MovieShowCase";
import ImageFallback from "@/app/components/ImageFallback";
import AddToListButton from "@/app/components/AddToListButton";
import Link from 'next/link';
import Oops from "@/app/components/Oops";
import MovieDetails from "@/app/components/MovieDetails";
import prisma from "@/app/utils/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/utils/auth";
import AddToWatchedButton from "@/app/components/AddToWatchedButton";

interface RecomendationsProps {
    id: string
}

async function getMovie(id: string) {
    try {
        const res = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.TMDB_API_KEY}&include_video=true`);

        if (!res.ok) {
            return { data: null, status: res.status, error: 'Failed to fetch movie data' };
        }

        const data = await res.json();
        return { data, error: null };
    } catch (error) {
        return { data: null, error: 'Failed to fetch movie data' };
    }
}

async function getRecomendations(id: string) {
    try {
        const res = await fetch(`https://api.themoviedb.org/3/movie/${id}/recommendations?api_key=${process.env.TMDB_API_KEY}&include_adult=true`);
        if (!res.ok) {
            return { data: null, error: 'Failed to fetch recommendations' };
        }
        const data = await res.json();
        return { data, error: null };
    } catch (error) {
        return { data: null, error: 'Failed to fetch recommendations' };
    }
}

async function getVideo(id: string) {
    try {
        const res = await fetch(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=${process.env.TMDB_API_KEY}`);
        if (!res.ok) {
            return { data: null, error: 'Failed to fetch video' };
        }
        const data = await res.json();
        return { data, error: null };
    } catch (error) {
        return { data: null, error: 'Failed to fetch video' };
    }
}

async function isMovieInWatchlist(userId: string, movieId: number): Promise<{ isInWatchlist: boolean; watchlistId?: string }> {
    const watchlistEntry = await prisma.watchList.findFirst({
        where: {
            userId: userId,
            movieId: movieId,
        },
    });

    if (watchlistEntry) {
        // Movie is in the watchlist
        return { isInWatchlist: true, watchlistId: watchlistEntry.id };
    } else {
        // Movie is not in the watchlist
        return { isInWatchlist: false };
    }
}

async function isMovieWatched(userId: string, movieId: number): Promise<{ watched: boolean; watchedId?: string }> {
    const watchedEntry = await prisma.watched.findFirst({
        where: {
            userId: userId,
            movieId: movieId,
        },
    });

    if (watchedEntry) {
        // Movie is in the watchlist
        return { watched: true, watchedId: watchedEntry.id };
    } else {
        // Movie is not in the watchlist
        return { watched: false };
    }
}

async function Recomendations({ id }: RecomendationsProps) {
    const { data: recomendations, error: recomendationsError } = await getRecomendations(id);

    if (recomendationsError) {
        return <div>{recomendationsError}</div>
    } else {
        if (recomendations.results[0]) {
            return (
                <div className="my-12 sm:my-16">
                    <h3 className="text-2xl text-off_white">Recomendations</h3>
                    <MovieShowCase movies={recomendations.results.slice(0, 12)} />
                </div>
            );
        }
    }
}

async function Trailer({ id }: RecomendationsProps) {
    const { data: video, error: videoError } = await getVideo(id);

    if (videoError) {
        return <div>{videoError}</div>
    } else {
        return (
            <div className="max-w-xl">
                <VideoPlayer trailers={video.results} />
            </div>
        );
    }
}


export default async function MoviePage({ params }: { params: { movieID: string } }) {
    const { data: movie, status: movieStatus, error: movieError } = await getMovie(params.movieID);



    if (movieError) {
        if (movieStatus === 404) {
            return (
                <Oops btn_link="/explore" btn_text="Explore Movies" message="Oops! Looks like this movie doesn't exist." />
            );
        } else {
            return <div>{movieError}</div>
        }
    } else {
        const session = await getServerSession(authOptions);
        const movieInWatchlist = await isMovieInWatchlist(session?.user?.email as string, movie.id);
        const movieInWatched = await isMovieWatched(session?.user?.email as string, movie.id);

        return (
            <div>
                <div className="grid grid-cols-1 md:grid-cols-2 mt-8 gap-6 mb-10 sm:mb-14">
                    <div>
                        <ImageFallback fallback="/backDropFallback.jpg" styles="w-full rounded-sm" src={`https://image.tmdb.org/t/p/w500/` + `${movie.backdrop_path}`} title={movie.title} />
                    </div>
                    <div className="flex flex-col justify-between space-y-5 sm:space-y-0">
                        <h1 className="text-4xl font-bold text-text_color">{movie.title}</h1>
                        <MovieDetails {...movie} />
                        {session ?
                            <div className="mt-7 flex  flex-row space-x-10">
                                <AddToWatchedButton watched={movieInWatched.watched} watchedId={movieInWatched.watchedId} id={Number(params.movieID)} poster_path={movie.poster_path} title={movie.title} />
                                <AddToListButton watchlist={movieInWatchlist.isInWatchlist} watchlistId={movieInWatchlist.watchlistId} id={Number(params.movieID)} poster_path={movie.poster_path} title={movie.title} />
                            </div>
                        :
                            <Link href="/login">
                                <Button variant="destructive" className="gap-2 text-off_white bg-red_power">
                                    Login <LogIn />
                                </Button>
                            </Link>
                        }
                    </div>
                </div >
                <Trailer id={params.movieID} />
                <Recomendations id={params.movieID} />
            </div>
        );
    }


}