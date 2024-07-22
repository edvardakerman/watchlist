"use client";

import { Button } from "@/components/ui/button";
import { Bookmark } from "lucide-react";
import { addToWatched, deleteFromWatched } from "../actions";
import { usePathname } from "next/navigation";

interface BtnProps {
    id: number,
    poster_path: string,
    title: string
    watched: boolean
    watchedId: string | undefined
}

export default function AddToListButton({ id, poster_path, title, watched, watchedId }: BtnProps) {
    const pathname = usePathname();

        if (watched) {
            return (
                <form action={deleteFromWatched}>
                    <input type="hidden" name="watchedId" value={watchedId} />
                    <input type="hidden" name="pathname" value={pathname} />
                    <Button className="gap-2 text-red_power bg-off_white">Remove as Watched <Bookmark className="fill-red_power" /> </Button>
                </form>

            );
        } else {
            return (
                <form action={addToWatched}>
                    <input type="hidden" name="movieId" value={id} />
                    <input type="hidden" name="pathname" value={pathname} />
                    <input type="hidden" name="poster_path" value={poster_path} />
                    <input type="hidden" name="title" value={title} />
                    <Button className="gap-2 text-red_power bg-off_white">Mark as Watched? <Bookmark />  </Button>
                </form>
            );
        }
}