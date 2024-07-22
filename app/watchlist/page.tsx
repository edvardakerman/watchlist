import React from 'react'
import prisma from '../utils/db';
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/utils/auth";
import MovieShowCase from '../components/MovieShowCase';
import { Movie } from '../models/movie';
import Link from 'next/link';
import { ChevronRight, Popcorn, TrendingUp, TvMinimalPlay } from 'lucide-react';
import Header from '../components/Header';

async function getWatchlist(userId: string) {
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

  return data;
}



async function getWatched(userId: string) {
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

  return data;
}

export default async function WatchlistPage() {
  const session = await getServerSession(authOptions);
  const watchlistData = await getWatchlist(session?.user?.email as string);
  const watchedData = await getWatched(session?.user?.email as string);

  // console.log(data[0]);
  const watchlist: Movie[] = watchlistData.map((item) => item.Movie as Movie);
  const watched: Movie[] = watchedData.map((item) => item.Movie as Movie);

  return (
    <div>
      <Header title='Your Watchlist' sub_title='All your favorite movies in one place' />
      <div className='mt-14 mb-14 md:mb-24'>
        <div className='flex flex-row justify-between items-center'>
          <Link className='flex flex-row items-center space-x-3' href={`/watchlist/watch`}>
            <h3 className='text-3xl font-bold text-off_white hover:text-red_power'>Movies To Watch</h3>
            <Popcorn className='text-red_power' strokeWidth={3} />
          </Link>
          <Link className='flex flex-row items-center space-x-1 text-grey_muted hover:text-red_power' href={`/watchlist/watch`}>
            <p>View More </p>
            <ChevronRight />
          </Link>
        </div>
        <MovieShowCase movies={watchlist.slice(0, 12)} />
      </div>
      <div className='mt-14 mb-14 md:mb-24'>
        <div className='flex flex-row justify-between items-center'>
          <Link className='flex flex-row items-center space-x-3' href={`/explore/popular`}>
            <h3 className='text-3xl font-bold text-off_white hover:text-red_power'>Watched</h3>
            <TvMinimalPlay className='text-red_power' strokeWidth={3} />
          </Link>
          <Link className='flex flex-row items-center space-x-1 text-grey_muted hover:text-red_power' href={`/explore/popular`}>
            <p>View More </p>
            <ChevronRight />
          </Link>
        </div>
        <MovieShowCase movies={watched.slice(0, 12)} />
      </div>
    </div>
  )
}
