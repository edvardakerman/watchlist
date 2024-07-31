"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import MovieShowCase from "@/app/components/MovieShowCase";
import Oops from "@/app/components/Oops";
import { useMoviesContext } from "@/app/context/MovieContext";
import Header from "@/app/components/Header";

export default function MoviePage({ params }: { params: { category: string } }) {
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const { movies, setMovies, page, setPage, category, setCategory, btnAction, setBtnAction } = useMoviesContext();

  useEffect(() => {
    if (category !== params.category) {
      setMovies([]);
      setPage(1)
      setCategory(params.category);
      fetchData(1);
    }
  }, [params.category]);

  useEffect(() => {
    if (btnAction) {
      setBtnAction(false)
      fetchData(page);
    }
  }, [page]);

  const fetchData = (page: number) => {
    setIsLoading(true);
    setHasError(false);
    fetch(`https://api.themoviedb.org/3/movie/${params.category}?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&language=en-US&page=${page}&include_adult=true`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Failed to fetch data`);
        }
        return response.json();
      })
      .then((result) => {
        if (page === 1) {
          setMovies(result.results)
        } else {
          setMovies((prevData) => [...prevData, ...result.results]);
        }
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setHasError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };


  const loadMoreData = () => {
    setBtnAction(true)
    setPage((prevPage) => prevPage + 1);
  };

  function title_formater(title: string) {
    let formatted_title = ""
    title.split('_').map((word) => {
      formatted_title += (word[0].toUpperCase() + word.slice(1) + " ")
    })

    return formatted_title.substring(0, formatted_title.length - 1)
  }

  if (hasError) {
    return (
      <Oops btn_link="/explore" btn_text="Explore Movies" message="Oops! Looks like this category doesn't exist." />
    );
  } else {
    return (
      <div>
        <div className="mb-5">
          <Header title={title_formater(params.category)} />
        </div>

        <MovieShowCase movies={movies} />
        <div className="flex justify-center my-5">
          <Button variant="destructive" disabled={isLoading} onClick={loadMoreData} className="text-off_white bg-red_power" >{isLoading ? 'Loading' : 'Load More'}</Button>
        </div>
      </div>
    );
  }

}