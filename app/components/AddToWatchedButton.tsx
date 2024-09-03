"use client";

import { Button } from "@/components/ui/button";
import { Bookmark, Monitor, MonitorCheck } from "lucide-react";
import { useEffect, useState } from "react";
import { Genre } from "../models/genre";
import { useWatchListContext } from "../context/WatchListContext";
import { Movie } from "../models/movie";

interface BtnProps {
    id: number;
    poster_path: string;
    title: string;
    genres: Genre[]
    movie : Movie
}

export default function AddToWatchedButton({ id, poster_path, title, genres, movie }: BtnProps) {
    const [inWatchedlist, setInWatchedlist] = useState(false);
    const { watched, setWatched } = useWatchListContext();
    // const [currentWatchlistId, setCurrentWatchlistId] = useState(watchlistId);
    const [loading, setLoading] = useState(false);
    const [hasError, setHasError] = useState(false);

    useEffect(() => {
        if (watched.length === 0) {
            fetchData();
        } else {
            setInWatchedlist(watched.some(e => e.id === id));
        }
    }, [watched]);

    const fetchData = () => {
        setLoading(true);
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
                setWatched(movies);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
                setHasError(true);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const handleAddToWatchedlist = async () => {
        setWatched(watched.concat(movie));
        setInWatchedlist(true);
        try {
            const genreNames = genres.map(genre => genre.name);

            const response = await fetch('/api/watchlist/watched/add', {
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
                setInWatchedlist(true);
            } else {
                console.error('Failed to add movie to watchist');
                setInWatchedlist(false);
            }
        } catch (error) {
            console.error('An error occurred while adding to watchlist:', error);
        }
        console.log("###Added to watched list###");
        console.log(watched);
    };

    const handleDeleteFromWatchedlist = async () => {
        console.log("Movie to delete: " + watched.findIndex(e => e.id === id), 1);
        setWatched(watched.splice(watched.findIndex(e => e.id === id), 1));
        setInWatchedlist(false);
        try {
            const response = await fetch('/api/watchlist/watched/remove', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    movieId: movie.id,
                }),
            });

            if (response.ok) {
                setInWatchedlist(false);
            } else {
                console.error('Failed to remove movie from watchlist');
                setInWatchedlist(true);
            }
        } catch (error) {
            console.error('An error occurred while removing from watchlist:', error);
        }
        console.log("###Deleted from watched list###");
        console.log(watched);
    };

    if (hasError) {
        return <div>Failed to load data</div>;
    }

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            {inWatchedlist ? (
                <Button
                    className="gap-2 text-red_power bg-off_white"
                    onClick={handleDeleteFromWatchedlist}
                    disabled={loading}
                >
                    Watched! <MonitorCheck  className="text-red_power transition-all ease-in-out duration-300" />
                </Button>
            ) : (
                <Button
                    className="gap-2 text-red_power bg-off_white"
                    onClick={handleAddToWatchedlist}
                    disabled={loading}
                >
                    Watched? <Monitor className="transition-all ease-in-out duration-300" />
                </Button>
            )}
        </div>
    );
}
