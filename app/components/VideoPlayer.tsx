"use client"

import { useEffect, useState } from "react"

interface trailerVideo {
    id: string,
    iso_639_1: string,
    iso_3166_1: string,
    key: string,
    name: string,
    site: string,
    size: number,
    type: string
}

interface trailerVideos {
    trailers: trailerVideo[]
}


export default function VideoPlayer(trailers: trailerVideos) {
    const [loading, setLoading] = useState(true);
    const [trailer, setTrailer] = useState<trailerVideo | null>(null);

    useEffect(() => {
        setLoading(true);

        const findObjectInArray = (trailers: trailerVideos): trailerVideo | null => {
            for (const item of trailers.trailers) {
                if (item.name === 'Official Trailer') { // Replace with your condition
                    return item;
                }
            }
            return null;
        };

        const foundObject = findObjectInArray(trailers);
        setTrailer(foundObject);
        setLoading(false);
    }, [trailers]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (trailer) {
        return (
            <div className="aspect-video">
                <h2 className="text-2xl mb-4 text-off_white">Trailer</h2>
                <iframe
                    className="rounded-md w-full"
                    loading="lazy"
                    title="YouTube video player"
                    src={trailer ? 'https://www.youtube.com/embed/' + trailer.key : ''}
                    allowFullScreen
                    height="100%"
                    width="100%"
                />
            </div>
        )
    }


}