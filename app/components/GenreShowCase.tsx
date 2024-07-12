import Image from "next/image";
import React from "react";
import { Movie } from "../models/movie";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Genre } from "../models/genre";

interface GenreList {
    genres: Genre[];
    title: string;
}

export default function GenreShowCase({ genres, title }: GenreList) {

    return (
        <div className="py-10">
            <h3 className='text-3xl font-bold'>{title}</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-8 mt-8 gap-2">
                {genres.map((genre) => (
                 <Button key={genre.id} variant="outline" className="">{genre.name}</Button>
                ))}
            </div>
        </div>
    );
}