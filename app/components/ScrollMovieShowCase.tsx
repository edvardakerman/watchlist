"use client";
import React, { useRef, useState, useEffect } from "react";
import { Movie } from "@prisma/client";
import Link from "next/link";
import ImageFallback from "./ImageFallback";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Clapperboard } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"

interface MovieProps {
    movies: Movie[];
    emptyMessage?: string;
    btn?: boolean;
    loading?: boolean;
    isEmpty?: boolean;
}

export default function ScrollMovieShowCase({ movies, emptyMessage, btn, loading, isEmpty }: MovieProps) {
    const [canScrollLeft, setCanScrollLeft] = useState(false)
    const [canScrollRight, setCanScrollRight] = useState(false)

    const scrollAreaRef = useRef<HTMLDivElement>(null)

    const updateScrollButtons = () => {
        const viewport = scrollAreaRef.current?.querySelector('[data-radix-scroll-area-viewport]') as HTMLDivElement
        if (viewport) {
            setCanScrollLeft(viewport.scrollLeft > 0)
            setCanScrollRight(viewport.scrollLeft + viewport.clientWidth < viewport.scrollWidth)
        }
    }

    const scroll = (direction: "left" | "right") => {
        const viewport = scrollAreaRef.current?.querySelector('[data-radix-scroll-area-viewport]') as HTMLDivElement
        if (viewport) {
            const windowWidth = window.innerWidth
            const scrollAmount = windowWidth >= 1240 ? 1200 : windowWidth >= 980 ? 800 : 600

            const newPosition =
                direction === "left"
                    ? viewport.scrollLeft - scrollAmount
                    : viewport.scrollLeft + scrollAmount

            viewport.scrollTo({
                left: newPosition,
                behavior: "smooth",
            })

            // Delay check to let smooth scroll finish
            setTimeout(updateScrollButtons, 300)
        }
    }

    useEffect(() => {
        const viewport = scrollAreaRef.current?.querySelector('[data-radix-scroll-area-viewport]') as HTMLDivElement
        if (viewport) {
            updateScrollButtons()
            viewport.addEventListener("scroll", updateScrollButtons)
            window.addEventListener("resize", updateScrollButtons)

            return () => {
                viewport.removeEventListener("scroll", updateScrollButtons)
                window.removeEventListener("resize", updateScrollButtons)
            }
        }
    }, [])

    if (loading) {
        return (
            <div className="grid grid-rows-2 grid-flow-col w-max gap-2 sm:gap-4 mt-3 mb-4">
                {[...Array(12)].map((_, index) => (
                    <div key={index} className="relative group">
                        <Skeleton className="w-[90px] h-[150px] md:h-[300px] md:w-[200px] rounded-sm" />
                    </div>
                ))}
            </div>
        );
    }

    if (isEmpty) {
        return (
            <div className="flex flex-col items-center justify-center text-center mt-10 gap-4">
                <p className="text-lg text-grey_muted">{emptyMessage}</p>
                {btn &&
                    <Link href="/explore">
                        <Button variant="destructive" className="text-off_white bg-red_power gap-2">Explore Movies <Clapperboard /></Button>
                    </Link>
                }
            </div>
        )
    }

    return (
        <div className="flex items-center">
            <button onClick={() => scroll("left")} className="hidden md:block " disabled={!canScrollLeft}>
                <ChevronLeft size={44} className={`text-grey_muted hover:text-red_power ${canScrollLeft ? "" : "invisible"}`} />
            </button>

            <ScrollArea
                ref={scrollAreaRef}
                className="w-full overflow-hidden whitespace-nowrap"
                type="auto"
            >
                <div className="grid grid-rows-2 grid-flow-col w-max gap-2 sm:gap-4 mb-4">
                    {movies.map((movie) => (
                        <div key={movie.id} className="w-[90px] md:w-[200px]">
                            <Link href={`/movie/${movie.id}`}>
                                <ImageFallback
                                    title={movie.title}
                                    fallback="/posterFallback.jpeg"
                                    src={
                                        process.env.NEXT_PUBLIC_TMDB_POSTER_BASE_URL +
                                        movie.poster_path
                                    }
                                    styles="hover:brightness-50 rounded-sm"
                                />
                            </Link>
                        </div>
                    ))}
                </div>
                <ScrollBar orientation="horizontal" hidden />
            </ScrollArea>

            <button onClick={() => scroll("right")} className="hidden md:block" disabled={!canScrollRight}>
                <ChevronRight size={44} className={`text-grey_muted hover:text-red_power ${canScrollRight ? "" : "invisible"}`} />
            </button>
        </div>
    );
}