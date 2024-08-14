import React from "react";
import VideoPlayer from "@/app/components/VideoPlayer";
import MovieShowCase from "@/app/components/MovieShowCase";
import ImageFallback from "@/app/components/ImageFallback";
import Oops from "@/app/components/Oops";
import MovieDetails from "@/app/components/MovieDetails";
import MovieButtons from "@/app/components/MovieButtons";

export async function generateMetadata({ params }: { params: { movieID: string } }) {
    const { data: movie, status: movieStatus, error: movieError } = await getMovie(params.movieID);
    return {
        openGraph: {
            title: movie.title ? movie.title : 'My Awesome Movies',
            description: movie.overview ? movie.overview : 'The best way to discover and keep track of your favorite movies',
            images: movie.backdrop_path ? process.env.NEXT_PUBLIC_TMDB_POSTER_BASE_URL + movie.backdrop_path : '/opengraph-image.png',
        },
        twitter: {
            card: 'summary_large_image',
            site: 'My Awesome Movies',
            title: movie.title ? movie.title : 'Movie',
            description: movie.overview ? movie.overview : 'The best way to discover and keep track of your favorite movies',
            images: movie.backdrop_path ? process.env.NEXT_PUBLIC_TMDB_POSTER_BASE_URL + movie.backdrop_path : '/opengraph-image.png',
        }
    }
}


interface RecomendationsProps {
    id: string
}

async function getMovie(id: string) {
    try {
        const res = await fetch(`${process.env.TMDB_API_URL}${id}?api_key=${process.env.TMDB_API_KEY}&include_video=true`);

        if (!res.ok) {
            return { data: null, status: res.status, error: 'Failed to fetch movie data' };
        }

        const data = await res.json();
        return { data, error: null };
    } catch (error) {
        return { data: null, error: 'Failed to fetch movie data' };
    }
}

async function getRecomendations(id: string) {
    try {
        const res = await fetch(`${process.env.TMDB_API_URL}${id}/recommendations?api_key=${process.env.TMDB_API_KEY}&include_adult=true`);
        if (!res.ok) {
            return { data: null, error: 'Failed to fetch recommendations' };
        }
        const data = await res.json();
        return { data, error: null };
    } catch (error) {
        return { data: null, error: 'Failed to fetch recommendations' };
    }
}

async function getVideo(id: string) {
    try {
        const res = await fetch(`${process.env.TMDB_API_URL}${id}/videos?api_key=${process.env.TMDB_API_KEY}`);
        if (!res.ok) {
            return { data: null, error: 'Failed to fetch video' };
        }
        const data = await res.json();
        return { data, error: null };
    } catch (error) {
        return { data: null, error: 'Failed to fetch video' };
    }
}

async function Recomendations({ id }: RecomendationsProps) {
    const { data: recomendations, error: recomendationsError } = await getRecomendations(id);

    if (recomendationsError) {
        return <div>{recomendationsError}</div>
    } else {
        if (recomendations.results[0]) {
            return (
                <div className="my-12 sm:my-16">
                    <h3 className="text-2xl text-off_white">Recomendations</h3>
                    <MovieShowCase movies={recomendations.results.slice(0, 12)} />
                </div>
            );
        }
    }
}

async function Trailer({ id }: RecomendationsProps) {
    const { data: video, error: videoError } = await getVideo(id);

    if (videoError) {
        return <div>{videoError}</div>
    } else {
        return (
            <div className="max-w-xl">
                <VideoPlayer trailers={video.results} />
            </div>
        );
    }
}


export default async function MoviePage({ params }: { params: { movieID: string } }) {
    const { data: movie, status: movieStatus, error: movieError } = await getMovie(params.movieID);

    if (movieError) {
        if (movieStatus === 404) {
            return (
                <Oops btn_link="/explore" btn_text="Explore Movies" message="Oops! Looks like this movie doesn't exist." />
            );
        } else {
            return <div>{movieError}</div>
        }
    } else {

        return (
            <div>
                <div className="grid grid-cols-1 md:grid-cols-2 mt-8 gap-6 mb-10 sm:mb-14">
                    <div>
                        <ImageFallback fallback="/backDropFallback.jpg" styles="w-full rounded-sm" src={process.env.NEXT_PUBLIC_TMDB_POSTER_BASE_URL + movie.backdrop_path} title={movie.title} />
                    </div>
                    <div className="flex flex-col justify-between space-y-5 sm:space-y-0">
                        <h1 className="text-4xl font-bold text-text_color">{movie.title}</h1>
                        <MovieDetails {...movie} />
                        <MovieButtons movie={movie} />
                    </div>
                </div >
                <Trailer id={params.movieID} />
                <Recomendations id={params.movieID} />
            </div>
        );
    }


}