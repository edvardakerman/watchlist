import React from 'react';
import TrendingMovies from '@/app/components/TrendingMovies';

async function getData() {
    const res = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${process.env.TMDB_API_KEY}&language=en-US&sort_by=popularity.desc`);

    if (!res.ok) {
      throw new Error('Failed to fetch data')
    }
   
    return res.json()
  }


export default async function ExplorePage() {
    const data = await getData()
    const trending = data.results;

    return (
        <div>
            <h1>Trending Movies</h1>
            <TrendingMovies movies={trending} />
        </div>
    );
}
