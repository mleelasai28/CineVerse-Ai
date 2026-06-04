import { useParams } from "react-router-dom";
import axios from "../api";
import { useEffect, useState } from "react";
import "./MovieDetails.css";


const IMAGE_BASE = "https://image.tmdb.org/t/p/original";

function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    async function fetchMovie() {
      const response = await axios.get(
        `/movie/${id}?api_key=${import.meta.env.VITE_TMDB_KEY}`
      );

      setMovie(response.data);
    }

    fetchMovie();
  }, [id]);

  if (!movie) return <h2>Loading...</h2>;

  return (
    <div className="movie_details">
      <img
        src={`${IMAGE_BASE}${movie.poster_path}`}
        alt={movie.title}
      />

      <h1>{movie.title}</h1>

      <p>⭐ {movie.vote_average}</p>

      <p>{movie.overview}</p>

      <p>Release Date: {movie.release_date}</p>

      <p>Runtime: {movie.runtime} mins</p>

      <p>
        Genres:
        {movie?.genres?.map((genre) => (
          <span key={genre.id}>
            {genre.name}
          </span>
        ))}
      </p>
    </div>
  );
}

export default MovieDetails;