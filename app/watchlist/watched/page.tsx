"use client";

import React, { useEffect, useState } from 'react';
import { Movie } from '../../models/movie';
import MovieShowCase from '@/app/components/MovieShowCase';
import { Button } from '@/components/ui/button';
import Header from '@/app/components/Header';

const take = 20;

export default function WatchlistPage() {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [hasError, setHasError] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [page, setPage] = useState(1);

    useEffect(() => {
        fetchData(page);
    }, [page]);

    const fetchData = (page: number) => {
        setIsLoading(true);
        setHasError(false);

        fetch(`/api/watchlist/watched?skip=${(page - 1) * take}&take=${take}`)
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
                <Header title='Watched Movies' sub_title='All your watched movies in one place' />
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
