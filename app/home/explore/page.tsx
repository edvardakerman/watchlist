import React from 'react';
import MovieShowCase from '@/app/components/MovieShowCase';
import GenreShowCase from '@/app/components/GenreShowCase';

async function getData(endpoint: string) {
    // endpoints: ['now_playing', 'popular', 'top_rated', 'upcoming'];
    const res = await fetch(`https://api.themoviedb.org/3/movie/${endpoint}?api_key=${process.env.TMDB_API_KEY}&language=en-US&page=1&include_adult=true`);

    if (!res.ok) {
        throw new Error('Failed to fetch data')
    }

    return res.json()
}

async function getMoviesByGenre() {
    // endpoints: ['now_playing', 'popular', 'top_rated', 'upcoming'];
    //const res = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${process.env.TMDB_API_KEY}&language=en-US&page=1&with_genres=36`);
    const res = await fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.TMDB_API_KEY}&language=en-US`);

    if (!res.ok) {
        throw new Error('Failed to fetch data')
    }

    return res.json()
}


export default async function ExplorePage() {
    let data = await getData('now_playing')
    const now_playing = data.results;

    data = await getData('popular')
    const popular = data.results;

    data = await getData('top_rated')
    const top_rated = data.results;

    data = await getData('upcoming')
    const upcoming = data.results;

    const genres = await getMoviesByGenre()

    return (
        <div>
            <h1 className='text-5xl font-bold my-10'>Explore Movies</h1>
                <MovieShowCase title='Popular Movies' movies={popular} />
                <MovieShowCase title='Upcoming Movies' movies={upcoming} />
                <MovieShowCase title='Top Rated Movies' movies={top_rated} />
                <MovieShowCase title='Now in Theaters' movies={now_playing} />
                <GenreShowCase title='Explore Movies by genre' genres={genres.genres} />
        </div>
    );
}
