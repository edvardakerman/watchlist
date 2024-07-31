import { Button } from "@/components/ui/button";
import { Clapperboard, LogIn, Popcorn, UserPlus } from "lucide-react";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { authOptions } from "../utils/auth";

export default async function Hero() {
    const session = await getServerSession(authOptions);

    if (session) {
        return (
            <div className="flex flex-col sm:items-center sm:justify-center bg-black/70 rounded">
                <div className="grid grid-cols-1 sm:grid-cols-2 mt-8 sm:mb-14 divide-y-2 sm:divide-y-0 sm:divide-x-2 divide-text_color">
                    <div className="flex flex-col items-center justify-center text-center p-10">
                        <h3 className="text-lg font-bold text-off_white">Explore Movies</h3>
                        <p className="text-grey_muted">Find new movies to watch</p>
                        <Link className="mt-4" href="/explore">
                            <Button variant="destructive" className="gap-2 text-off_white bg-red_power">Explore Movies <Clapperboard /> </Button>
                        </Link>
                    </div>
                    <div className="flex flex-col items-center justify-center text-center p-10">
                        <h3 className="text-lg font-bold text-off_white">View Your Watchlist </h3>
                        <p className="text-grey_muted" >Browse your catalog of movies</p>
                        <Link className="mt-4" href="/watchlist">
                            <Button variant="destructive" className="gap-2 text-off_white bg-red_power">Watchlist <Popcorn /></Button>
                        </Link>
                    </div>
                </div>
            </div>
        )
    } else {
        return (
            <div className="flex flex-col sm:items-center sm:justify-center bg-black/70 rounded">
                <div className="grid grid-cols-1 sm:grid-cols-2 mt-8 sm:mb-14 divide-y-2 sm:divide-y-0 sm:divide-x-2 divide-text_color">
                    <div className="flex flex-col items-center justify-center text-center p-10">
                        <h3 className="text-lg font-bold text-off_white">First time here?</h3>
                        <p className="text-grey_muted">Sign up for the best experince!</p>
                        <Link className="mt-4" href="/sign-up">
                            <Button variant="destructive" className="gap-2 text-off_white bg-red_power">Sign Up <UserPlus /> </Button>
                        </Link>
                    </div>
                    <div className="flex flex-col items-center justify-center text-center p-10">
                        <h3 className="text-lg font-bold text-off_white">Previous User? </h3>
                        <p className="text-grey_muted" >Login to view you watchlist!</p>
                        <Link className="mt-4" href="/login">
                            <Button variant="destructive" className="gap-2 text-off_white bg-red_power">Log In <LogIn /> </Button>
                        </Link>
                    </div>
                </div>
            </div>
        )
    }

}