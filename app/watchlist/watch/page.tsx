import React from 'react'
import prisma from '../../utils/db';
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/utils/auth";
import MovieShowCase from '../../components/MovieShowCase';
import { Movie } from '../../models/movie';
import Header from '../../components/Header';

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

export default async function WatchlistPage() {
    const session = await getServerSession(authOptions);
    const watchlistData = await getWatchlist(session?.user?.email as string);

    const watchlist: Movie[] = watchlistData.map((item) => item.Movie as Movie);

    return (
        <div>
            <Header title='Movies To Watch' sub_title='All your favorite movies in one place' />
            <div className='mt-14 mb-14 md:mb-24'>
                <MovieShowCase movies={watchlist} />
            </div>
        </div>
    )
}
