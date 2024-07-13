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
            <div className="flex flex-wrap my-10">
                {genres.map((genre) => (
                 <Button key={genre.id} variant="outline" className="p-2 my-1 mx-1">{genre.name}</Button>
                ))}
            </div>
        </div>
    );
}