"use client";

import React, { useEffect, useState } from 'react';
import { Movie } from "@prisma/client";
import MovieShowCase from '@/app/components/MovieShowCase';
import { ChevronRight, TvMinimalPlay } from 'lucide-react';
import Link from 'next/link';
import { useWatchListContext } from '../context/WatchListContext';

export default function WatchlistPage() {
    const { watched, setWatched } = useWatchListContext();
    const [isLoading, setIsLoading] = useState(false);
    const [hasError, setHasError] = useState(false);

    useEffect(() => {
        if (watched.length === 0) {
            fetchData();
        }
        console.log(watched);
    }, []);

    const fetchData = () => {
        setIsLoading(true);
        setHasError(false);

        fetch(`/api/watchlist/watched?skip=0&take=12&genre=all`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                return response.json();
            })
            .then((data) => {
                const movies: Movie[] = data.map((item: any) => item.Movie as Movie);
                setWatched(movies);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
                setHasError(true);
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    if (hasError) {
        return <div>Error loading data. Please try again later.</div>;
    }

    return (
        <div className='mt-14 mb-14 md:mb-24'>
            <div className='flex flex-row justify-between items-center'>
                <Link className='flex flex-row items-center space-x-3' href={`/watchlist/watched`}>
                    <h3 className='text-xl font-bold text-off_white hover:text-red_power'>Watched</h3>
                    <TvMinimalPlay className='text-red_power' strokeWidth={3} />
                </Link>
                {watched.length > 12 &&
                    <Link className='flex flex-row items-center space-x-1 text-grey_muted hover:text-red_power' href={`/watchlist/watched`}>
                        <p>View More </p>
                        <ChevronRight />
                    </Link>
                }
            </div>
            {isLoading ?
                <p>Loading...</p>
                :
                <MovieShowCase btn={true} emptyMessage='You have not watched any movies yet :(' movies={watched} />
            }
        </div>
    );
};
