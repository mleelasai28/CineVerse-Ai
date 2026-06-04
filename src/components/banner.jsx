import "./banner.css";
import axios from "../api";
import { useEffect, useState } from "react";
import { requests } from "../api";
import movieTrailer from "movie-trailer";
import YouTube from "react-youtube";

const IMAGE_BASE = "https://image.tmdb.org/t/p/original";

function Banner() {
  const [movies, setMovies] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [trailerUrl, setTrailerUrl] = useState("");

  const movie = movies[currentIndex];

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(requests.fetchTrending);
      setMovies(request.data.results);
    }

    fetchData();
  }, []);

  useEffect(() => {
    if (!movies.length) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) =>
        prev === movies.length - 1 ? 0 : prev + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [movies]);

  const truncate = (str, n) =>
    str?.length > n ? str.substr(0, n - 1) + "..." : str;

  const closeTrailer = () => {
    setTrailerUrl("");
  };

  const handleTrailer = async (movie) => {
  if (!movie) return;

  try {
    const url = await movieTrailer(
      movie?.title ||
      movie?.name ||
      movie?.original_name
    );

    if (!url) {
      alert("Trailer not found");
      return;
    }

    const urlParams = new URLSearchParams(
      new URL(url).search
    );

    setTrailerUrl(urlParams.get("v"));
  } catch {
    alert("Trailer not found");
  }
};
  return (
    <header
      className="banner"
      style={{
        backgroundImage: `url(${IMAGE_BASE}${movie?.backdrop_path})`,
      }}
    >
      <div className="banner_overlay"></div>

      <div className="banner_contents">
        <h1 className="banner_title">
          {movie?.title || movie?.name || movie?.original_name}
        </h1>

        <p className="banner_rating">
          ⭐ {movie?.vote_average?.toFixed(1)}
        </p>

        <div className="banner_buttons">
          <button
            className="banner_button play"
            onClick={() => handleTrailer(movie)}
          >
            ▶ Watch Trailer
          </button>

          <button className="banner_button list">
            + My List
          </button>
        </div>

        <div className="banner_navigation">
          <button
            onClick={() =>
              setCurrentIndex(
                currentIndex === 0
                  ? movies.length - 1
                  : currentIndex - 1
              )
            }
          >
            ❮
          </button>

          <button
            onClick={() =>
              setCurrentIndex(
                currentIndex === movies.length - 1
                  ? 0
                  : currentIndex + 1
              )
            }
          >
            ❯
          </button>
        </div>

        <div className="banner_dots">
          {movies.slice(0, 10).map((_, index) => (
            <span
              key={index}
              className={
                currentIndex === index
                  ? "dot active"
                  : "dot"
              }
              onClick={() => setCurrentIndex(index)}
            />
          ))}
        </div>

        <p className="banner_desc">
          {truncate(movie?.overview, 180)}
        </p>
      </div>

      {trailerUrl && (
  <div className="trailer_modal">
    <div className="trailer_container">
      <button
        className="close_button"
        onClick={closeTrailer}
      >
        ✕
      </button>

      <YouTube
        videoId={trailerUrl}
        opts={{
          height: "500",
          width: "100%",
          playerVars: {
            autoplay: 1,
          },
        }}
      />
    </div>
  </div>
)}

      <div className="banner_fadeBottom" />
    </header>
  );
}

export default Banner;