import Image from "next/image";
import React, { useState } from "react";
import { Movie } from "../../../models/movie";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Genre } from "@/app/models/genre";

async function getMovies(endpoint: string) {
    // endpoints: ['now_playing', 'popular', 'top_rated', 'upcoming'];
    const res = await fetch(`https://api.themoviedb.org/3/movie/${endpoint}?api_key=${process.env.TMDB_API_KEY}&language=en-US&page=1&include_adult=true&page=${1}`);

    if (!res.ok) {
        throw new Error('Failed to fetch data')
    }

    return res.json()
}

export default async function MoviePage({ params }: { params: { category: string } }) {
    const data = await getMovies(params.category)
    const movies: Movie[] = data.results

    return (
        <div className="">
            <h1 className="text-4xl font-bold">{params.category[0].toUpperCase() + params.category.slice(1)}</h1>
            <div className="grid grid-cols-3 lg:grid-cols-6 mt-8 gap-6">
                {movies.map((movie) => (
                    <div className="">
                        <Link href={`/home/movie/${movie.id}`}>
                            <Image className="hover:brightness-50" title={movie.title} width={300} height={100} alt="movie poster" src={`https://image.tmdb.org/t/p/w500/` + `${movie.poster_path}`}></Image>
                        </Link>
                        <p className="text-xs">{movie.title}</p>
                    </div>
                ))}
            </div>
            <div className="flex justify-center my-5">
                <Button className="" >Load more</Button>
            </div>
        </div>
    );
}