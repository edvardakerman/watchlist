import React from 'react';
import prisma from '../utils/db';
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/utils/auth";
import MovieShowCase from '../components/MovieShowCase';
import Link from 'next/link';
import { ChevronRight, Popcorn, TvMinimalPlay } from 'lucide-react';
import Header from '../components/Header';
import { Movie } from '../models/movie';
import { redirect } from 'next/navigation';
import Oops from '../components/Oops';

async function getWatchlist(userId: string) {
  try {
    const data = await prisma.watchList.findMany({
      where: {
        userId: userId,
      },
      select: {
        Movie: {
          select: {
            title: true,
            poster_path: true,
            id: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc'
      },
    });

    return { data, error: null };
  } catch (error) {
    return { data: null, error: `Failed to fetch watchlist data` };
  }
}

async function getWatched(userId: string) {
  try {
    const data = await prisma.watched.findMany({
      where: {
        userId: userId,
      },
      select: {
        Movie: {
          select: {
            title: true,
            poster_path: true,
            id: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc'
      },
    });

    return { data, error: null };
  } catch (error) {
    return { data: null, error: `Failed to fetch watched data` };
  }
}

export default async function WatchlistPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return (
      <Oops btn_link="/" btn_text="Home" message="Oops! Looks like something want wrong" />
  );
  }

  const { data: watchlistData, error: watchError } = await getWatchlist(session.user.email);
  const { data: watchedData, error: watchedError } = await getWatched(session.user.email);

  const watchlist: Movie[] = watchlistData ? watchlistData.map((item) => item.Movie as Movie) : [];
  const watched: Movie[] = watchedData ? watchedData.map((item) => item.Movie as Movie) : [];

  return (
    <div>
      <Header title='Your Watchlist' />
      {!watchError && (
        <div className='mt-10 lg:mt-14 mb-14 md:mb-24'>
          <div className='flex flex-row justify-between items-center'>
            <Link className='flex flex-row items-center space-x-3' href={`/watchlist/watch`}>
              <h3 className='text-3xl font-bold text-off_white hover:text-red_power'>To Watch</h3>
              <Popcorn className='text-red_power' strokeWidth={3} />
            </Link>
            {watchlist.length > 12 &&
              <Link className='flex flex-row items-center space-x-1 text-grey_muted hover:text-red_power' href={`/watchlist/watch`}>
                <p>View More </p>
                <ChevronRight />
              </Link>
            }
          </div>
          <MovieShowCase btn={true} emptyMessage='You have not added any movies to your watchlist yet' movies={watchlist.slice(0, 12)} />
        </div>
      )}
      {!watchedError && (
        <div className='mt-14 mb-14 md:mb-24'>
          <div className='flex flex-row justify-between items-center'>
            <Link className='flex flex-row items-center space-x-3' href={`/watchlist/watched`}>
              <h3 className='text-3xl font-bold text-off_white hover:text-red_power'>Watched</h3>
              <TvMinimalPlay className='text-red_power' strokeWidth={3} />
            </Link>
            {watched.length > 12 &&
              <Link className='flex flex-row items-center space-x-1 text-grey_muted hover:text-red_power' href={`/watchlist/watched`}>
                <p>View More </p>
                <ChevronRight />
              </Link>
            }
          </div>
          <MovieShowCase btn={false} emptyMessage='You have not watched any movies yet :(' movies={watched.slice(0, 12)} />
        </div>
      )}
    </div>
  )
}
