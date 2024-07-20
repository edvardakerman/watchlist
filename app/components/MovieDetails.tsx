import { StarHalf } from "lucide-react"
import { Movie } from "../models/movie"
import { Genre } from "../models/genre"

function time_convert(num: number) {
    var hours = Math.floor(num / 60);
    var minutes = num % 60;

    if (hours === 0) {
        return minutes + "m";
    } else if (minutes === 0) {
        return hours + "h";
    } else {
        return hours + "h " + minutes + "m";
    }
}

function concatGenres(genres: Genre[]) {

    let genreList = genres[0].name
    if (genres.length > 4) {
        genres = genres.slice(1, 5)
    } else {
        genres = genres.slice(1)
    }
    genres.map((genre) => {
        genreList += ' / ' + genre.name
    })
    return genreList
}


export default function MovieDetails(movie: Movie) {
    return (
        <>
            <div className="flex flex-row sm:space-x-10 space-x-7">

                {movie.vote_average > 0 &&
                    <div className="flex flex-row text-off_white">
                        <StarHalf />
                        <p>{Math.round(movie.vote_average * 10) / 10}</p>
                    </div>
                }

                {movie.runtime > 0 &&
                    <>
                        <p>|</p>
                        <div className="flex flex-row space-x-2 text-off_white">
                            <p>{time_convert(movie.runtime)}</p>
                        </div>
                    </>
                }

                {movie.release_date &&
                    <>
                        <p>|</p>
                        <div className="flex flex-row text-off_white">
                            <p>{movie.release_date.substring(0, 4)}</p>
                        </div>
                    </>
                }

                {movie.original_language &&
                    <>
                        <p>|</p>
                        <div className="flex flex-row text-off_white">
                            <p>{movie.original_language.toUpperCase()}</p>
                        </div>
                    </>
                }


            </div>
            {movie.genres[0] &&
                <p className="text-sm font-bold text-off_white">{concatGenres(movie.genres)}</p>
            }
            {movie.overview &&
                <p className="text-base text-grey_muted">{movie.overview}</p>
            }
        </>
    )
}