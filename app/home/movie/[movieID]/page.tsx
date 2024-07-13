import Image from "next/image";
import React, { useState } from "react";
import { Movie } from "../../../models/movie";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Genre } from "@/app/models/genre";
import VideoPlayer from "@/app/components/VideoPlayer";


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

async function getMovie(id: string) {
    const res = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.TMDB_API_KEY}&include_video=true`);

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
    genres.shift()
    genres.map((genre) => {
        genreList += '/' + genre.name
    })
    return genreList
}

export default async function MovieShowCase({ params }: { params: { movieID: string } }) {
    const movie = await getMovie(params.movieID)
    const video = await getVideo(params.movieID)

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 mt-8 gap-6">
            <div>
                <Image className="" width={300} height={100} alt="movie poster" src={`https://image.tmdb.org/t/p/w500/` + `${movie.poster_path}`}></Image>
            </div>
            <div className="">
                <h1 className="text-4xl">{movie.title}</h1>
                <p>Release date: {movie.release_date}</p>
                <p>Votes avarage: {movie.vote_average}</p>
                <p>{movie.overview}</p>
                <p>Popularity: {movie.popularity}</p>
                <p>Language: {movie.spoken_languages[0].name}</p>
                <p>Genre: {concatGenres(movie.genres)}</p>
            </div>
            <div className="">
                    <VideoPlayer trailers={video.results} />
            </div>
        </div>

    );
}