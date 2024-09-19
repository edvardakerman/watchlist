import Link from "next/link";
import Hero from "../components/Hero";
import { ChevronRight, TrendingUp, Watch } from "lucide-react";
import ScrollMovieShowCase from "../components/ScrollMovieShowCase";
import { getServerSession } from "next-auth";
import { authOptions } from "../utils/auth";
import WatchList from "../components/WatchList";

async function getData(endpoint: string) {
  try {
    const res = await fetch(
      `${process.env.TMDB_API_URL}${endpoint}?api_key=${process.env.TMDB_API_KEY}&language=en-US&page=1&include_adult=true`,
      {
        next: {
          revalidate: 3600,
        },
      }
    );

    if (!res.ok) {
      return { data: null, status: res.status, error: `Failed to fetch ${endpoint} data` };
    }

    const data = await res.json();
    return { data, error: null };
  } catch (error) {
    return { data: null, error: `Failed to fetch ${endpoint} data` };
  }
}

export default async function Home() {
  const session = await getServerSession(authOptions);

  const { data: popular, error: popularError } = await getData('popular');

  return (
    <div className="mb-0">
      <div className="sm:my-10 text-center space-y-2 sm:space-y-5">
        <h1 className="text-2xl sm:text-4xl font-bold text-off_white sm:pr-0 pr-1">
          Discover and Track Your Favorite Movies with
          <br className="sm:hidden block" />
          <span className="sm:pr-0 pl-2 text-red_power">My Awesome Movies</span>
        </h1>
        <div className="justify-center flex">
          <p className="hidden sm:block px-8 font-light">
            My Awesome Movies, or <span className="text-red_power font-bold">MAM</span> for short is your go-to place for tracking the latest and hottest movies.
          </p>
        </div>
      </div>
      <Hero session={session ? true : false} />
      <div className="max-w-7xl mx-auto">
        {session && (
          <WatchList />
        )}
        {!popularError && (
          <div className="mt-10 mb-14 md:mb-24 mx-auto w-full">
            <div className="flex flex-row justify-between items-center">
              <Link className="flex flex-row items-center space-x-3" href={`/explore/popular`}>
                <h3 className="text-2xl md:text-3xl font-bold text-off_white hover:text-red_power">Popular</h3>
                <TrendingUp className="text-red_power" strokeWidth={3} />
              </Link>
              <Link className="flex flex-row items-center space-x-1 text-grey_muted hover:text-red_power" href={`/explore`}>
                <p>Explore </p>
                <ChevronRight />
              </Link>
            </div>
            <ScrollMovieShowCase movies={popular.results} />
          </div>
        )}
      </div>
    </div>
  );
}

