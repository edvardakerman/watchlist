"use client";

import { Button } from "@/components/ui/button";
import { Bookmark, Heart, Plus, X } from "lucide-react";
import { addToWatchlist, deleteFromWatchlist } from "../actions";
import { usePathname } from "next/navigation";
import { Genre } from "../models/genre";

interface BtnProps {
    id: number,
    poster_path: string,
    title: string
    watchlist: boolean
    watchlistId: string | undefined
    genresArray: Genre[]
}

export default function AddToWatchlistButton({ id, poster_path, title, watchlist, watchlistId, genresArray }: BtnProps) {
    const pathname = usePathname();
    let genres = ''; 
    genresArray.map((genre) => {
        genres += genre.name + ','
    })

    if (watchlist) {
        return (
            <form action={deleteFromWatchlist}>
                <input type="hidden" name="watchlistId" value={watchlistId} />
                <input type="hidden" name="pathname" value={pathname} />
                <Button variant="destructive" className="gap-2 text-off_white bg-red_power">Watchlist! <Bookmark  className="fill-off_white" /> </Button>
            </form>

        );
    } else {
        return (
            <form action={addToWatchlist}>
                <input type="hidden" name="movieId" value={id} />
                <input type="hidden" name="pathname" value={pathname} />
                <input type="hidden" name="poster_path" value={poster_path} />
                <input type="hidden" name="title" value={title} />
                <input type="hidden" name="genres" value={genres.slice(0, -1)} />
                <Button variant="destructive" className="gap-2 text-off_white bg-red_power">Watchlist? <Bookmark />  </Button>
            </form>
        );
    }

}