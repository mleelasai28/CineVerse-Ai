import { useParams, useNavigate } from "react-router-dom";
import axios from "../api";
import { useEffect, useState } from "react";
import movieTrailer from "movie-trailer";
import YouTube from "react-youtube";
import "./MovieDetails.css";

const IMAGE_BASE = "https://image.tmdb.org/t/p/original";
const API_KEY = import.meta.env.VITE_TMDB_KEY;

function MovieDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [movie, setMovie] = useState(null);
  const [similarMovies, setSimilarMovies] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState("");

  useEffect(() => {
    async function fetchMovie() {
      try {
        const response = await axios.get(
          `/movie/${id}?api_key=${API_KEY}`
        );

        setMovie(response.data);

        const similar = await axios.get(
          `/movie/${id}/similar?api_key=${API_KEY}`
        );

        setSimilarMovies(similar.data.results || []);
      } catch (err) {
        console.error(err);
      }
    }

    fetchMovie();
  }, [id]);

  const playTrailer = async () => {
    try {
      const url = await movieTrailer(
        movie.title || movie.name
      );

      const params = new URLSearchParams(
        new URL(url).search
      );

      setTrailerUrl(params.get("v"));
    } catch {
      alert("Trailer not found");
    }
  };

  if (!movie) return <h2>Loading...</h2>;

  return (
    <div className="movie_details">

      <div
        className="details_banner"
        style={{
          backgroundImage: `url(${IMAGE_BASE}${movie.backdrop_path})`,
        }}
      >
        <div className="banner_overlay"></div>
      </div>

      <div className="details_content">

        <img
          className="details_poster"
          src={`${IMAGE_BASE}${movie.poster_path}`}
          alt={movie.title}
        />

        <div className="details_info">

          <h1>{movie.title}</h1>

          <p>⭐ {movie.vote_average.toFixed(1)}</p>

          <p>📅 {movie.release_date}</p>

          <p>⏱ {movie.runtime} mins</p>

          <div className="genre_list">
            {movie.genres.map((genre) => (
              <span
                className="genre_badge"
                key={genre.id}
              >
                {genre.name}
              </span>
            ))}
          </div>

          <p className="overview">
            {movie.overview}
          </p>

          <div className="details_buttons">
            <button onClick={playTrailer}>
              ▶ Watch Trailer
            </button>

            <button>
              ❤️ My List
            </button>
          </div>

        </div>

      </div>

      {trailerUrl && (
        <div className="trailer_modal">
          <YouTube
            videoId={trailerUrl}
            opts={{
              width: "100%",
              height: "500",
              playerVars: {
                autoplay: 1,
              },
            }}
          />
        </div>
      )}

      <h2 className="similar_title">
        Similar Movies
      </h2>

      <div className="similar_movies">

        {similarMovies.map((item) => (

          <div
            key={item.id}
            className="similar_card"
            onClick={() => navigate(`/movie/${item.id}`)}
          >

            <img
              src={`${IMAGE_BASE}${item.poster_path}`}
              alt={item.title}
            />

            <p>{item.title}</p>

          </div>

        ))}

      </div>

    </div>
  );
}

export default MovieDetails;