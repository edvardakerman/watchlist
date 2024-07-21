"use client";

import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import { LogIn, Plus, User, X } from "lucide-react";
import Link from 'next/link';
import { addToWatchlist, deleteFromWatchlist } from "../actions";
import { usePathname } from "next/navigation";

interface BtnProps {
    id: number,
    poster_path: string,
    title: string
    watchlist: boolean
    watchlistId: string | undefined
}

export default function AddToListButton({ id, poster_path, title, watchlist, watchlistId }: BtnProps) {
    const { data: session } = useSession();
    const pathname = usePathname();

    if (session) {
        if (watchlist) {
            return (
                <form action={deleteFromWatchlist}>
                    <input type="hidden" name="watchlistId" value={watchlistId} />
                    <input type="hidden" name="pathname" value={pathname} />
                    <Button variant="destructive" className="gap-2 text-off_white bg-red_power">Remove from Watchlist <X /> </Button>
                </form>

            );
        } else {
            return (
                <form action={addToWatchlist}>
                    <input type="hidden" name="movieId" value={id} />
                    <input type="hidden" name="pathname" value={pathname} />
                    <input type="hidden" name="poster_path" value={poster_path} />
                    <input type="hidden" name="title" value={title} />
                    <Button variant="destructive" className="gap-2 text-off_white bg-red_power">Add to Watchlist <Plus />  </Button>
                </form>
            );
        }
    } else {
        return (
            <Link href="/login">
                <Button variant="destructive" className="gap-2 text-off_white bg-red_power">
                    Login <LogIn />
                </Button>
            </Link>
        );
    }

}