// "use client";

// import React, { useEffect, useState } from 'react';
// import { Button } from "@/components/ui/button";
// import { LogIn } from "lucide-react";
// import Link from 'next/link';
// import AddToWatchedButton from "@/app/components/AddToWatchedButton";
// import AddToWatchlistButton from "@/app/components/AddToWatchlistButton";
// import { Movie } from '../models/movie';
// import { useSession } from "next-auth/react";
// import { Genre } from '../models/genre';
// import { Session } from 'inspector';
// import { useWatchListContext } from '../context/WatchListContext';

// interface MovieButtonProps {
//     movie: Movie;
//     session: string | null | undefined;
// }

// interface MovieInList {
//     id: number,
//     poster_path: string,
//     title: string
//     watchlist: boolean
//     watchlistId: string | undefined
//     genresArray: Genre[]
// }

// export default function MovieButtons({ movie, session }: MovieButtonProps) {
//     // const [movieInWatchlist, setMovieInWatchlist] = useState<MovieInList | null>(null);
//     // const [movieInWatched, setMovieInWatched] = useState<MovieInList | null>(null);
//     const { watch, setWatch, watched, setWatched } = useWatchListContext();

//     useEffect(() => {
//         (async () => {

//             if (session) {
//                 if (watch.length === 0) {
//                 Promise.all([
//                     fetch(`/api/watchlist/watch?skip=0&take=0&genre=all`),
//                     fetch(`/api/watchlist/watched?skip=0&take=0&genre=all`)
//                   ]).then(async([watchlistResponse, watchedDataResponse]) => {
//                     const watchData = await watchlistResponse.json();
//                     const watchedData = await watchedDataResponse.json();
//                     setWatch(watchData);
//                     setWatched(watchedData);
//                   })
//                   .then((responseText) => {
//                     console.log(responseText);
                
//                   }).catch((err) => {
//                     console.log(err);
//                   });
//                 }

//             }

//         })();
//     }, [movie, session]);

//     if (!session) {
//         return (
//             <Link href="/sign-in">
//                 <Button variant="destructive" className="gap-2 text-off_white bg-red_power">
//                     Login <LogIn />
//                 </Button>
//             </Link>
//         );
//     }

//     if (movieInWatchlist === null || movieInWatched === null) {
//         return <div>Loading...</div>;
//     }

//     return (
//         <div className="mt-7 flex flex-row space-x-10">
//             <AddToWatchedButton
//                 genres={movie.genres}
//                 watched={movieInWatched.watchlist}
//                 watchedId={movieInWatched.watchlistId}
//                 id={Number(movie.id)}
//                 poster_path={movie.poster_path}
//                 title={movie.title}
//             />
//             <AddToWatchlistButton
//                 genres={movie.genres}
//                 watchlist={movieInWatchlist.watchlist}
//                 watchlistId={movieInWatchlist.watchlistId}
//                 id={Number(movie.id)}
//                 poster_path={movie.poster_path}
//                 title={movie.title}
//                 movie={movie}
//             />
//         </div>
//     );
// };
