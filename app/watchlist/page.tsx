import React from 'react';
import Header from '../components/Header';
import WatchedList from '../components/WatchedList';
import WatchList from '../components/WatchList';

export default function WatchlistPage() {

  return (
    <div className='max-w-7xl mx-auto'>
      <Header title='Your Watchlist' />
      <WatchList />
      <WatchedList />
    </div>
  )
}