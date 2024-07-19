import React, { useState } from "react";
import { Movie } from "../../../models/movie";
import { Button } from "@/components/ui/button";
import { Genre } from "@/app/models/genre";
import VideoPlayer from "@/app/components/VideoPlayer";
import { Plus, StarHalf } from "lucide-react";
import MovieShowCase from "@/app/components/MovieShowCase";
import ImageFallback from "@/app/components/ImageFallback";

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

const MovieDetails = (movie: Movie) => {
    console.log(movie.runtime)
    return (
        <>
            <div className="flex flex-row sm:space-x-10 space-x-7">

                {movie.vote_average > 0 &&
                    <div className="flex flex-row">
                        <StarHalf />
                        <p>{Math.round(movie.vote_average * 10) / 10}</p>
                    </div>
                }

                {movie.runtime > 0 &&
                    <>
                        <p>|</p>
                        <div className="flex flex-row space-x-2">
                            <p>{time_convert(movie.runtime)}</p>
                        </div>
                    </>
                }

                {movie.release_date &&
                    <>
                        <p>|</p>
                        <div className="flex flex-row">
                            <p>{movie.release_date.substring(0, 4)}</p>
                        </div>
                    </>
                }

                {movie.original_language &&
                    <>
                        <p>|</p>
                        <div className="flex flex-row">
                            <p>{movie.original_language.toUpperCase()}</p>
                        </div>
                    </>
                }


            </div>
            {movie.genres[0] &&
                <p className="text-sm font-bold">{concatGenres(movie.genres)}</p>
            }
            {movie.overview &&
                <p className="text-base">{movie.overview}</p>
            }
        </>
    )
}


const Recomendations = ({ recomendations }: RecomendationsProps) => {
    if (recomendations[0]) {
        return (
            <div className="my-12 sm:my-16">
                <h3 className="text-2xl">Recomendations</h3>
                <MovieShowCase movies={recomendations.slice(0, 12)} />
            </div>
        );
    }
}


export default async function MoviePage({ params }: { params: { movieID: string } }) {
    const movie = await getMovie(params.movieID)
    const video = await getVideo(params.movieID)
    const recomendations = await getRecomendations(params.movieID)

    console.log(movie)

    return (
        <div>
            <div className="grid grid-cols-1 md:grid-cols-2 mt-8 gap-6  mb-10 sm:mb-14">
                <div>
                    <ImageFallback fallback="/backDropFallback.jpg" styles="w-full rounded-sm" src={`https://image.tmdb.org/t/p/w500/` + `${movie.backdrop_path}`} title={movie.title} />
                </div>
                <div className="flex flex-col justify-between space-y-5 sm:space-y-0">
                    <h1 className="text-4xl font-bold">{movie.title}</h1>
                    <MovieDetails {...movie} />
                    <div className="mt-7">
                        <Button className="w-full">Add to Watchlist <Plus className="" />  </Button>
                    </div>
                </div>
            </div >

            <div className="max-w-xl">
                <VideoPlayer trailers={video.results} />
            </div>

            <Recomendations recomendations={recomendations.results} />
        </div>

    );
}