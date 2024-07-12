import Image from "next/image";
import React from "react";
import { Movie } from "../../../models/movie";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Genre } from "@/app/models/genre";

async function getMovie(id: string) {
    // endpoints: ['now_playing', 'popular', 'top_rated', 'upcoming'];
    const res = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.TMDB_API_KEY}&include_video=true`);

    if (!res.ok) {
        throw new Error('Failed to fetch data')
    }

    return res.json()
}

async function getVideo(id: string) {
    // endpoints: ['now_playing', 'popular', 'top_rated', 'upcoming'];
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
        genreList += '/'  + genre.name
    })
    return genreList
}

export default async function MovieShowCase({ params }: { params: { movieID: string } }) {
    const movie = await getMovie(params.movieID)

    const video = await getVideo(params.movieID)
    console.log(video.results[video.results.length - 1].key)  

    return (
        <div className="py-10">
            <h1 className="text-4xl">{movie.title}</h1>
            <div className="">
                <div className="">
                <Image className="" width={500} height={100} alt="movie poster" src={`https://image.tmdb.org/t/p/w500/` + `${movie.backdrop_path}`}></Image>
                    <Image className="" width={300} height={100} alt="movie poster" src={`https://image.tmdb.org/t/p/w500/` + `${movie.poster_path}`}></Image>
                    <p>Release date: {movie.release_date}</p>
                    <p>Votes avarage: {movie.vote_average}</p>
                    <p>{movie.overview}</p>
                    <p>Popularity: {movie.popularity}</p>
                    <p>Language: {movie.spoken_languages[0].name}</p>
                    <p>Genre: {concatGenres(movie.genres)}</p>
                </div>
            </div>
        </div>
    );
}