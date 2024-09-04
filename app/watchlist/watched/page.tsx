"use client";

import React, { useEffect, useState } from 'react';
import { Movie } from "@prisma/client";
import MovieShowCase from '@/app/components/MovieShowCase';
import Header from '@/app/components/Header';
import FilterBar from '@/app/components/FilterBar';
import { useWatchListContext } from '../../context/WatchListContext';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Clapperboard } from 'lucide-react';

export default function WatchlistPage() {
    const { watched, setWatched } = useWatchListContext();
    const [isLoading, setIsLoading] = useState(false);
    const [hasError, setHasError] = useState(false);
    const [isEmpty, setIsEmpty] = useState(false);
    const [parentState, setParentState] = useState<string>('all');

    const handleStateChange = (value: string) => {
        setParentState(value);
    };

    useEffect(() => {
        if (watched.length === 0) {
            fetchData();
        }
    }, [watched]);

    const fetchData = () => {
        setIsLoading(true);
        setHasError(false);

        fetch(`/api/watchlist/watched?skip=0&take=0&genre=all`)
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

    // Filter the movies based on the selected genre in parentState
    const filteredMovies = watched.filter((movie) => {
        if (parentState === 'all') {
            return true;
        }
        // Check if any of the genres in the movie match the parentState
        return movie.genres.includes(parentState);
    });

    function getEmptyMessage() {
        return parentState !== 'all' ? `You have not watched any movies with the genre ${parentState}` : `You have not watched any movies yet :(`;
    }

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
                {isEmpty || (filteredMovies.length === 0 && !isLoading) ?
                    <div className="flex flex-col items-center justify-center text-center mt-10 gap-4">
                        <p className="text-lg text-grey_muted">{getEmptyMessage()}</p>
                        <Link href="/explore">
                            <Button variant="destructive" className="text-off_white bg-red_power gap-2">Explore Movies <Clapperboard /></Button>
                        </Link>
                    </div> :
                    <MovieShowCase
                        movies={filteredMovies}
                        loading={isLoading}
                        isEmpty={isEmpty}
                        emptyMessage={getEmptyMessage()}
                        btn={true}
                    />
                }
            </div>
        </div>
    );
};
