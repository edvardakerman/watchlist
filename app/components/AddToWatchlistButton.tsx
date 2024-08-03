"use client";

import { Button } from "@/components/ui/button";
import { Bookmark } from "lucide-react";
import { useState } from "react";
import { Genre } from "../models/genre";

interface BtnProps {
    id: number;
    poster_path: string;
    title: string;
    watchlist: boolean;
    watchlistId: string | undefined;
    genres: Genre[]
}

export default function AddToListButton({ id, poster_path, title, watchlist, watchlistId, genres }: BtnProps) {
    const [inWatchlist, setInWatchlist] = useState(watchlist);
    const [currentWatchlistId, setCurrentWatchlistId] = useState(watchlistId);
    const [loading, setLoading] = useState(false);

    const handleAddToWatchlist = async () => {
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
                setCurrentWatchlistId(data.watchlistId);
            } else {
                console.error('Failed to add movie to watchist');
            }
        } catch (error) {
            console.error('An error occurred while adding to watchlist:', error);
        }
        setLoading(false);
    };

    const handleDeleteFromWatchlist = async () => {
        setLoading(true);
        try {
            const response = await fetch('/api/watchlist/watch/remove', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    watchlistId: currentWatchlistId,
                }),
            });

            if (response.ok) {
                setInWatchlist(false);
                setCurrentWatchlistId(undefined);
            } else {
                console.error('Failed to remove movie from watchlist');
            }
        } catch (error) {
            console.error('An error occurred while removing from watchlist:', error);
        }
        setLoading(false);
    };

    return (
        <div>
            {inWatchlist ? (
                <Button
                    className="gap-2 text-off_white bg-red_power"
                    onClick={handleDeleteFromWatchlist}
                    disabled={loading}
                    variant="destructive"
                >
                    {loading ? 'Processing...' : <>Watchlist! <Bookmark  className="fill-off_white" /></>}
                </Button>
            ) : (
                <Button
                    className="gap-2 text-off_white bg-red_power"
                    onClick={handleAddToWatchlist}
                    disabled={loading}
                    variant="destructive"
                >
                    {loading ? 'Processing...' : <>Watchlist? <Bookmark /></>}
                </Button>
            )}
        </div>
    );
}
