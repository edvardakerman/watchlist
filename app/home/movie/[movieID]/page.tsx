import Image from "next/image";
import React, { useState } from "react";
import { Movie } from "../../../models/movie";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Genre } from "@/app/models/genre";
import VideoPlayer from "@/app/components/VideoPlayer";
import { AudioLines, Clock, Hourglass, Plus, Popcorn, StarHalf } from "lucide-react";
import MovieShowCase from "@/app/components/MovieShowCase";
import ImageFallback from "@/app/components/ImageFallback";


interface trailerVidoe {
    id: string,
    iso_639_1: string,
    iso_3166_1: string,
    key: string,
    name: string,
    site: string,
    size: number,
    type: string
}

interface RecomendationsProps {
    recomendations: Movie[]
}

async function getMovie(id: string) {
    const res = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.TMDB_API_KEY}&include_video=true`);

    if (!res.ok) {
        throw new Error('Failed to fetch data')
    }

    return res.json()
}

async function getRecomendations(id: string) {
    const res = await fetch(`https://api.themoviedb.org/3/movie/${id}/recommendations?api_key=${process.env.TMDB_API_KEY}&include_adult=true`);

    if (!res.ok) {
        throw new Error('Failed to fetch data')
    }

    return res.json()
}

async function getVideo(id: string) {
    const res = await fetch(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=${process.env.TMDB_API_KEY}`);

    if (!res.ok) {
        throw new Error('Failed to fetch data')
    }

    return res.json()
}

function concatGenres(genres: Genre[]) {

    let genreList = genres[0].name
    if (genres.length > 4) {
        genres = genres.slice(1, 5)
    } else {
        genres = genres.slice(1)
    }
    genres.map((genre) => {
        genreList += ' / ' + genre.name
    })
    return genreList
}

function time_convert(num: number) {
    var hours = Math.floor(num / 60);
    var minutes = num % 60;

    if (hours === 0) {
        return minutes + "m";
    } else if (minutes === 0) {
        return hours + "h";
    } else {
        return hours + "h " + minutes + "m";
    }
}

const Recomendations = ({ recomendations }: RecomendationsProps) => {
    if (recomendations[0]) {
        return <div>
            <h3 className="text-xl">Recomendations</h3>
            <MovieShowCase movies={recomendations.slice(0, 12)} />
        </div>;
    }
}


export default async function MoviePage({ params }: { params: { movieID: string } }) {
    const movie = await getMovie(params.movieID)
    const video = await getVideo(params.movieID)
    const recomendations = await getRecomendations(params.movieID)

    return (
        <div>
            <div className="grid grid-cols-1 md:grid-cols-2 mt-8 gap-6">
                <div>
                    {/* <Image className="w-full" width={300} height={100} alt="movie poster" src={`https://image.tmdb.org/t/p/w500/` + `${movie.backdrop_path}`}></Image> */}
                    <ImageFallback fallback="/backDropFallback.jpg" styles="w-full" src={`https://image.tmdb.org/t/p/w500/` + `${movie.backdrop_path}`} alt={movie.title} />
                </div>
                <div className="space-y-5">
                    <h1 className="text-4xl font-bold">{movie.title}</h1>
                    <div className="flex flex-row justify-between">
                        <div className="flex flex-row">
                            <StarHalf />
                            <p>{movie.vote_average}</p>
                        </div>
                        <div>|</div>
                        <div className="flex flex-row space-x-2">
                            <p>{time_convert(movie.runtime)}</p>
                        </div>
                        <div>|</div>
                        <div className="flex flex-row space-x-2">
                            <p>{movie.release_date.substring(0, 4) ? movie.release_date.substring(0, 4) : "TBD"}</p>
                        </div>
                        <div>|</div>
                        <div className="flex flex-row space-x-2">
                            <p>{movie.spoken_languages[0].name}</p>
                        </div>
                    </div>
                    <p className="text-sm">{concatGenres(movie.genres)}</p>
                    <p className="text-base font-thin">{movie.overview}</p>
                    <div className="mt-7">
                        <Button className="w-full">Add to Watchlist <Plus className="" />  </Button>
                    </div>
                </div>
            </div >

            <div className="max-w-xl my-5">
                <VideoPlayer trailers={video.results} />
            </div>
            <Recomendations recomendations={recomendations.results} />
        </div>

    );
}