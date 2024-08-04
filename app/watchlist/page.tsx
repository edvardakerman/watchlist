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
import WatchedList from '../components/WatchedList';
import WatchList from '../components/WatchList';

export default function WatchlistPage() {

  return (
    <div>
      <Header title='Your Watchlist' />
      <WatchList />
      <WatchedList />
    </div>
  )
}