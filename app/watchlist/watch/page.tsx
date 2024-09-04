"use client";

import React, { useEffect, useState } from 'react';
import { Movie } from "@prisma/client";
import MovieShowCase from '@/app/components/MovieShowCase';
import Header from '@/app/components/Header';
import FilterBar from '@/app/components/FilterBar';
import { useWatchListContext } from '../../context/WatchListContext';

export default function WatchlistPage() {
    const { watch, setWatch } = useWatchListContext();
    const [isLoading, setIsLoading] = useState(false);
    const [hasError, setHasError] = useState(false);
    const [parentState, setParentState] = useState<string>('all');

    const handleStateChange = (value: string) => {
        setParentState(value);
    };

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

    // Filter the movies based on the selected genre in parentState
    const filteredMovies = watch.filter((movie) => {
        if (parentState === 'all') {
            return true;
        }
        // Check if any of the genres in the movie match the parentState
        return movie.genres.includes(parentState);
    });

    if (hasError) {
        return <div>Error loading data. Please try again later.</div>;
    }

    return (
        <div>
            <div className="my-10">
                <Header title='Movies To Watch' sub_title='All your favorite movies' />
                <div className='flex justify-center mt-10'>
                    <FilterBar onStateChange={handleStateChange} />
                </div>
                <MovieShowCase
                    movies={filteredMovies}
                    emptyMessage={`You have no movies with the genre ${parentState} in your watchlist`}
                    btn={true}
                />
            </div>
            {isLoading && <p>Loading...</p>}
        </div>
    );
};
