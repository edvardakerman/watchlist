import React from 'react';
import Link from 'next/link';
import { ChevronRight, Film, Hourglass, Projector, TrendingUp } from 'lucide-react';
import Header from '../components/Header';
import ScrollMovieShowCase from '../components/ScrollMovieShowCase';

async function getData(endpoint: string) {
       try {
        const res = await fetch(`${process.env.TMDB_API_URL}${endpoint}?api_key=${process.env.TMDB_API_KEY}&language=en-US&page=1&include_adult=true`,
            {
                next: {
                    revalidate: 3600
                }
            });

        if (!res.ok) {
            return { data: null, status: res.status, error: `Failed to fetch ${endpoint} data` };
        }

        const data = await res.json();
        return { data, error: null };
    } catch (error) {
        return { data: null, error: `Failed to fetch ${endpoint} data` };
    }
}


export default async function ExplorePage() {

    const [
        { data: popular, error: popularError },
        { data: now_playing, error: now_playingError },
        { data: top_rated, error: top_ratedError },
        { data: upcoming, error: upcomingError },
    ] = await Promise.all([
        getData('popular'),
        getData('now_playing'),
        getData('top_rated'),
        getData('upcoming'),
    ]);

    return (
        <div>
            <Header title='Explore Movies' />
            {!popularError &&
                <div className='mt-10 mb-14 md:mb-24'>
                    <div className='flex flex-row justify-between items-center md:px-12 pb-2'>
                        <Link className='flex flex-row items-center space-x-3' href={`/explore/popular`}>
                            <h3 className='text-2xl md:text-3xl font-bold text-off_white hover:text-red_power'>Popular</h3>
                            <TrendingUp className='text-red_power' strokeWidth={3} />
                        </Link>
                        <Link className='flex flex-row items-center space-x-1 text-grey_muted hover:text-red_power' href={`/explore/popular`}>
                            <p>View More </p>
                            <ChevronRight/>
                        </Link>
                    </div>
                    <ScrollMovieShowCase movies={popular.results} />
                </div>
            }

            {!now_playingError &&
                <div className='my-14 md:my-24'>
                    <div className='flex flex-row justify-between items-center md:px-12 pb-2'>
                        <Link className='flex flex-row items-center space-x-3' href={`/explore/now_playing`}>
                            <h3 className='text-2xl md:text-3xl font-bold text-off_white hover:text-red_power'>Now Playing</h3>
                            <Projector className='text-red_power' strokeWidth={3} />
                        </Link>
                        <Link className='flex flex-row items-center space-x-1 text-grey_muted hover:text-red_power' href={`/explore/now_playing`}>
                            <p>View More </p>
                            <ChevronRight />
                        </Link>
                    </div>
                    <ScrollMovieShowCase movies={now_playing.results} />
                </div>
            }

            {!top_ratedError &&
                <div className='my-14 md:my-24'>
                    <div className='flex flex-row justify-between items-center md:px-12 pb-2'>
                        <Link className='flex flex-row items-center space-x-3' href={`/explore/top_rated`}>
                            <h3 className='text-2xl md:text-3xl font-bold text-off_white hover:text-red_power'>Top Rated</h3>
                            <Film className='text-red_power' strokeWidth={2} />
                        </Link>
                        <Link className='flex flex-row items-center space-x-1 text-grey_muted hover:text-red_power' href={`/explore/top_rated`}>
                            <p>View More </p>
                            <ChevronRight />
                        </Link>
                    </div>
                    <ScrollMovieShowCase movies={top_rated.results} />
                </div>
            }

            {!upcomingError &&
                <div className='my-14 md:my-24'>
                    <div className='flex flex-row justify-between items-center md:px-12 pb-2'>
                        <Link className='flex flex-row items-center space-x-3' href={`/explore/upcoming`}>
                            <h3 className='text-2xl md:text-3xl font-bold text-off_white hover:text-red_power'>Upcoming</h3>
                            <Hourglass className='text-red_power' strokeWidth={3} />
                        </Link>
                        <Link className='flex flex-row items-center space-x-1 text-grey_muted hover:text-red_power' href={`/explore/upcoming`}>
                            <p>View More </p>
                            <ChevronRight />
                        </Link>
                    </div>
                    <ScrollMovieShowCase movies={upcoming.results} />
                </div>
            }
        </div>
    );
}
