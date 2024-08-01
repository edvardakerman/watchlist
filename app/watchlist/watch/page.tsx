"use client";

import React, { useEffect, useState } from 'react';
import { Movie } from '../../models/movie';
import MovieShowCase from '@/app/components/MovieShowCase';
import { Button } from '@/components/ui/button';
import Header from '@/app/components/Header';
import FilterBar from '@/app/components/FilterBar';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Watch",
};

const take = 20;

export default function WatchlistPage() {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [hasError, setHasError] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [page, setPage] = useState(1);
    const [parentState, setParentState] = useState<string>('all');

    const handleStateChange = (value: string) => {
        setParentState(value);
        setMovies([]);
        setPage(1);
    };

    useEffect(() => {
        fetchData(page, parentState);
    }, [page, parentState]);

    const fetchData = (page: number, parentState: string) => {
        setIsLoading(true);
        setHasError(false);

        fetch(`/api/watchlist/watch?skip=${(page - 1) * take}&take=${take}&genre=${parentState}`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                return response.json();
            })
            .then((data) => {
                const movies: Movie[] = data.map((item: any) => item.Movie as Movie);
                setMovies((prevMovies) => [...prevMovies, ...movies]);
                setHasMore(movies.length === take);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
                setHasError(true);
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    const loadMoreData = () => {
        if (hasMore) {
            setPage((prevPage) => prevPage + 1);
        }
    };

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
                <MovieShowCase movies={movies} />
            </div>
            {isLoading && <p>Loading...</p>}
            {hasMore && !isLoading && (
                <div className="flex justify-center my-5">
                    <Button variant="destructive" disabled={isLoading} onClick={loadMoreData} className="text-off_white bg-red_power" >{isLoading ? 'Loading' : 'Load More'}</Button>
                </div>
            )}
        </div>
    );
};
