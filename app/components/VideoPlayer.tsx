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

    if (!trailer) {
        return <div>No matching object found</div>;
    }

    return (
        <div>
            <h1>Video Player</h1>
            <iframe
                width="560"
                height="315"
                className="bg-red-300"
                loading="lazy"
                title="YouTube video player"
                src={trailer ? 'https://www.youtube.com/embed/' + trailer.key : ''}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
            />
        </div>
    )
}