import { Button } from "@/components/ui/button";
import { Clapperboard, LogIn, Popcorn, UserPlus } from "lucide-react";
import Link from "next/link";

interface HeroProps {
    session: boolean
}

export default async function Hero({ session }: HeroProps) {

    if (session) {
        return (
            <div className="flex flex-col sm:items-center sm:justify-center">
                <div className="bg-black/70 rounded grid grid-cols-2 mt-4 divide-x-2 divide-text_color">
                    <div className="flex flex-col items-center justify-center text-center p-3">
                        <p className="text-base sm:text-lg font-bold text-off_white">Find new movies to watch</p>
                        <Link className="mt-4" href="/explore">
                            <Button variant="destructive" className="gap-2 text-sm text-off_white bg-red_power">Explore <Clapperboard /> </Button>
                        </Link>
                    </div>
                    <div className="flex flex-col items-center justify-center text-center p-3">
                        <p className="text-base sm:text-lg font-bold text-off_white" >Browse your movies to watch</p>
                        <Link className="mt-4" href="/watchlist">
                            <Button variant="destructive" className="gap-2 text-sm text-off_white bg-red_power">Watchlist <Popcorn /></Button>
                        </Link>
                    </div>
                </div>
            </div>
        )
    } else {
        return (
            <div className="flex flex-col items-center justify-center">
                <div className="bg-black/70 rounded grid grid-cols-2 mt-4 divide-x-2 divide-text_color">
                    <div className="flex flex-col items-center justify-center text-center p-3">
                        <p className="text-base sm:text-lg font-bold text-off_white">First time here? Sign Up!</p>
                        <Link className="mt-4" href="/sign-up">
                            <Button variant="destructive" className="gap-2 text-sm text-off_white bg-red_power">Sign Up <UserPlus /> </Button>
                        </Link>
                    </div>
                    <div className="flex flex-col items-center justify-center text-center p-3">
                        <p className="text-base sm:text-lg font-bold text-off_white">Previous User? Sign In!</p>
                        <Link className="mt-4" href="/sign-in">
                            <Button variant="destructive" className="gap-2 text-sm text-off_white bg-red_power">Sign In <LogIn /> </Button>
                        </Link>
                    </div>
                </div>
            </div>
        )
    }

}