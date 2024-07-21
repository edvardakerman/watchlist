import React from 'react'
import prisma from '../utils/db';
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/utils/auth";
import MovieShowCase from '../components/MovieShowCase';
import { Movie } from '../models/movie';
import Link from 'next/link';
import { ChevronRight, TrendingUp } from 'lucide-react';
import Header from '../components/Header';

async function getData(userId: string) {
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
  });

  return data;
}

export default async function WatchlistPage() {
  const session = await getServerSession(authOptions);
  const data = await getData(session?.user?.email as string);

  // console.log(data[0]);
  const movies: Movie[] = data.map((item) => item.Movie as Movie);

  return (
    <div>
        <Header title='Your Watchlist' sub_title='All your favorite movies in one place' />
        <div className='mt-14 mb-14 md:mb-24'>
                    <div className='flex flex-row justify-between items-center'>
                        <Link className='flex flex-row items-center space-x-3' href={`/explore/popular`}>
                            <h3 className='text-3xl font-bold text-off_white hover:text-red_power'>Movies To Watch</h3>
                            <TrendingUp className='text-red_power' strokeWidth={3} />
                        </Link>
                        <Link className='flex flex-row items-center space-x-1 text-grey_muted hover:text-red_power' href={`/explore/popular`}>
                            <p>View More </p>
                            <ChevronRight />
                        </Link>
                    </div>
                    <MovieShowCase movies={movies.slice(0, 12)} />
                </div>
        <h3>Watched</h3>
    </div>
  )
}
