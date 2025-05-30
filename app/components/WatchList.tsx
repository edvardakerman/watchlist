"use client";

import React, { useEffect, useState } from 'react';
import { Movie } from "@prisma/client";
import { ChevronRight, Popcorn } from 'lucide-react';
import Link from 'next/link';
import { useWatchListContext } from '../context/WatchListContext';
import ScrollMovieShowCase from './ScrollMovieShowCase';

export default function WatchlistPage() {
    const { watch, setWatch } = useWatchListContext();
    const [isLoading, setIsLoading] = useState(false);
    const [hasError, setHasError] = useState(false);
    const [isEmpty, setIsEmpty] = useState(false);

    useEffect(() => {
        if (watch.length === 0) {
            fetchData();
        }
    }, [watch]);

    const fetchData = () => {
        setIsLoading(true);
        setHasError(false);

        fetch(`/api/watchlist/watch?skip=0&take=0&genre=all`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                return response.json();
            })
            .then((data) => {
                const movies: Movie[] = data.map((item: any) => item.Movie as Movie);
                if (movies.length === 0) {
                    setIsEmpty(true);
                } else {
                    setIsEmpty(false);
                }
                setWatch(movies);
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
        <div className='mt-10 lg:mt-14 mb-14 md:mb-24'>
            <div className='flex flex-row justify-between items-center md:px-12 pb-2'>
                <Link className='flex flex-row items-center space-x-3' href={`/watchlist/watch`}>
                    <h3 className='text-xl font-bold text-off_white hover:text-red_power'>To Watch</h3>
                    <Popcorn className='text-red_power' strokeWidth={3} />
                </Link>
                {watch.length > 20 &&
                    <Link className='flex flex-row items-center space-x-1 text-grey_muted hover:text-red_power' href={`/watchlist/watch`}>
                        <p>View More </p>
                        <ChevronRight />
                    </Link>
                }
            </div>
            <ScrollMovieShowCase isEmpty={isEmpty} loading={isLoading} btn={true} emptyMessage='You have not added any movies to your watchlist yet' movies={watch.slice(0, 20)} />
        </div>
    );
};
