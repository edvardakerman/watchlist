import { Button } from "@/components/ui/button";
import { LogIn, UserPlus } from "lucide-react";
import Link from "next/link";

export default async function Home() {
  return (
    <div className="flex flex-col bg-background_color sm:items-center sm:justify-center sm:bg-transparent">
      <div className="sm:my-10 text-center space-y-2 sm:space-y-5">
        <h1 className="text-4xl sm:text-4xl font-bold text-off_white">Welcome to My Awesome Movies</h1>
        <h2 className="text-xl text-grey_muted">Keep track of your favorite movies and explore new ones</h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 sm:mt-8 mb-10 sm:mb-14 divide-y-2 sm:divide-y-0 sm:divide-x-2 divide-text_color">
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