"use client";

import { Button } from "@/components/ui/button";
import { Monitor, MonitorCheck } from "lucide-react";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { Genre } from "../models/genre";
import { revalidatePath } from "next/cache";

interface BtnProps {
    id: number;
    poster_path: string;
    title: string;
    watched: boolean;
    watchedId: string | undefined;
    genres: Genre[]
}

export default function AddToListButton({ id, poster_path, title, watched, watchedId, genres }: BtnProps) {
    const [isWatched, setIsWatched] = useState(watched);
    const [currentWatchedId, setCurrentWatchedId] = useState(watchedId);
    const [loading, setLoading] = useState(false);
    const pathname = usePathname()

    const handleAddToWatched = async () => {
        setLoading(true);
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
                    genreNames, // Add genres if needed
                    pathname
                }),
            });

            if (response.ok) {
                const data = await response.json();
                setIsWatched(true);
                setCurrentWatchedId(data.watchedId);
            } else {
                console.error('Failed to add movie to watched list');
            }
        } catch (error) {
            console.error('An error occurred while adding to watched list:', error);
        }
        setLoading(false);
    };

    const handleDeleteFromWatched = async () => {
        setLoading(true);
        try {
            const response = await fetch('/api/watchlist/watched/remove', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    watchedId: currentWatchedId,
                    pathname
                }),
            });

            if (response.ok) {
                setIsWatched(false);
                setCurrentWatchedId(undefined);
            } else {
                console.error('Failed to remove movie from watched list');
            }
        } catch (error) {
            console.error('An error occurred while removing from watched list:', error);
        }
        setLoading(false);
    };

    return (
        <div>
            {isWatched ? (
                <Button
                    className="gap-2 text-red_power bg-off_white"
                    onClick={handleDeleteFromWatched}
                    disabled={loading}
                >
                    {loading ? 'Processing...' : <>Watched! <MonitorCheck className="text-red_power" /></>}
                </Button>
            ) : (
                <Button
                    className="gap-2 text-red_power bg-off_white"
                    onClick={handleAddToWatched}
                    disabled={loading}
                >
                    {loading ? 'Processing...' : <>Watched? <Monitor /></>}
                </Button>
            )}
        </div>
    );
}
