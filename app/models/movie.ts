import { Genre } from "./genre"

export interface Movie {
    backdrop_path: string,
    genre_ids: number[],
    id: number,
    original_language: string,
    overview: string,
    poster_path: string,
    release_date: string,
    title: string,
    vote_average: number,
    genres: Genre[],
    runtime: number,
}


