import React from 'react';
import MovieShowCase from '@/app/components/MovieShowCase';
import Link from 'next/link';
import { ChevronRight, Clapperboard, Film, Hourglass, TrendingUp } from 'lucide-react';

async function getData(endpoint: string) {
    const res = await fetch(`https://api.themoviedb.org/3/movie/${endpoint}?api_key=${process.env.TMDB_API_KEY}&language=en-US&page=1&include_adult=true`);

    if (!res.ok) {
        throw new Error('Failed to fetch data')
    }

    return res.json()
}


export default async function ExplorePage() {
    let data = await getData('now_playing')
    const now_playing = data.results.slice(0, 12);

    data = await getData('popular')
    const popular = data.results.slice(0, 12);

    data = await getData('top_rated')
    const top_rated = data.results.slice(0, 12);

    data = await getData('upcoming')
    const upcoming = data.results.slice(0, 12);

    return (
        <div>
            <h1 className='text-4xl font-bold'>Explore Movies</h1>

            <div className='mt-14 mb-14 md:mb-24'>
                <div className='flex flex-row justify-between items-center'>
                    <Link className='flex flex-row items-center space-x-3 hover:text-red-500' href={`/home/explore/popular`}>
                        <h3 className='text-3xl font-bold'>Popular</h3>
                        <TrendingUp strokeWidth={3} />
                    </Link>
                    <Link className='flex flex-row items-center space-x-1 hover:text-red-500' href={`/home/explore/popular`}>
                        <p className=''>View More </p>
                        <ChevronRight />
                    </Link>
                </div>
                <MovieShowCase movies={popular} />
            </div>

            <div className='my-14 md:my-24'>
                <div className='flex flex-row justify-between items-center'>
                    <Link className='flex flex-row items-center space-x-3 hover:text-red-500' href={`/home/explore/upcoming`}>
                        <h3 className='text-3xl font-bold'>Upcoming</h3>
                        <Hourglass strokeWidth={3} />
                    </Link>
                    <Link className='flex flex-row items-center space-x-1 hover:text-red-500' href={`/home/explore/upcoming`}>
                        <p className=''>View More </p>
                        <ChevronRight />
                    </Link>
                </div>
                <MovieShowCase movies={upcoming} />
            </div>

            <div className='my-14 md:my-24'>
                <div className='flex flex-row justify-between items-center'>
                    <Link className='flex flex-row items-center space-x-3 hover:text-red-500' href={`/home/explore/top_rated`}>
                        <h3 className='text-3xl font-bold'>Top Rated</h3>
                        <Film strokeWidth={2} />
                    </Link>
                    <Link className='flex flex-row items-center space-x-1 hover:text-red-500' href={`/home/explore/top_rated`}>
                        <p className=''>View More </p>
                        <ChevronRight />
                    </Link>
                </div>
                <MovieShowCase movies={top_rated} />
            </div>

            <div className='my-14 md:my-24'>
                <div className='flex flex-row justify-between items-center'>
                    <Link className='flex flex-row items-center space-x-3 hover:text-red-500' href={`/home/explore/now_playing`}>
                        <h3 className='text-3xl font-bold'>Now Playing</h3>
                        <Clapperboard strokeWidth={3} />
                    </Link>
                    <Link className='flex flex-row items-center space-x-1 hover:text-red-500' href={`/home/explore/now_playing`}>
                        <p className=''>View More </p>
                        <ChevronRight />
                    </Link>
                </div>

                <MovieShowCase movies={now_playing} />
            </div>
        </div>
    );
}
