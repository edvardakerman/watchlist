"use client";

import { Button } from "@/components/ui/button";
import { Bookmark } from "lucide-react";
import { useEffect, useState } from "react";
import { Genre } from "../models/genre";
import { useWatchListContext } from "../context/WatchListContext";
import { Movie } from "@prisma/client";

interface BtnProps {
    id: number;
    poster_path: string;
    title: string;
    genres: Genre[]
    movie : Movie
}

export default function AddToListButton({ id, poster_path, title, genres, movie }: BtnProps) {
    const [inWatchlist, setInWatchlist] = useState(false);
    const { watch, setWatch } = useWatchListContext();
    const [loading, setLoading] = useState(false);
    const [hasError, setHasError] = useState(false);

    useEffect(() => {
        if (watch.length === 0) {
            fetchData();
        } else {
            setInWatchlist(watch.some(e => e.id === id));
        }
    }, [watch]);

    const fetchData = () => {
        setLoading(true);
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
                setLoading(false);
            });
    };

    const handleAddToWatchlist = async () => {
        setWatch([movie].concat(watch));
        setInWatchlist(true);
        setLoading(true);
        try {
            const genreNames = genres.map(genre => genre.name);

            const response = await fetch('/api/watchlist/watch/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    movieId: id,
                    poster_path,
                    title,
                    genreNames,
                }),
            });

            if (response.ok) {
                const data = await response.json();
                setInWatchlist(true);
            } else {
                console.error('Failed to add movie to watchist');
                setInWatchlist(false);
            }
        } catch (error) {
            console.error('An error occurred while adding to watchlist:', error);
        }
        setLoading(false);
    };

    const handleDeleteFromWatchlist = async () => {
        setWatch((prevWatch) => {
            return prevWatch.filter((e) => e.id !== id);
        });
        setInWatchlist(false);
        setLoading(true);
        try {
            const response = await fetch('/api/watchlist/watch/remove', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    movieId: movie.id,
                }),
            });

            if (response.ok) {
                setInWatchlist(false);
            } else {
                console.error('Failed to remove movie from watchlist');
                setInWatchlist(true);
            }
        } catch (error) {
            console.error('An error occurred while removing from watchlist:', error);
        }
        setLoading(false);
    };

    if (hasError) {
        return <div>Failed to load data</div>;
    }

    return (
        <div>
            {inWatchlist ? (
                <Button
                    className="gap-2 text-off_white bg-red_power"
                    onClick={handleDeleteFromWatchlist}
                    disabled={loading}
                    variant="destructive"
                >
                   Watchlist! <Bookmark  className="fill-off_white" />
                </Button>
            ) : (
                <Button
                    className="gap-2 text-off_white bg-red_power"
                    onClick={handleAddToWatchlist}
                    disabled={loading}
                    variant="destructive"
                >
                    Watchlist? <Bookmark />
                </Button>
            )}
        </div>
    );
}