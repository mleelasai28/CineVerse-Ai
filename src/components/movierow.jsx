import "./movierow.css";
import axios from "../api";
import { useEffect, useState } from "react";
import YouTube from "react-youtube";
import movieTrailer from "movie-trailer";
import "./skeleton.css";

const IMAGE_BASE = "https://image.tmdb.org/t/p/w300";

function MovieRow({ title, fetchUrl }) {
  const [movies, setMovies] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState("");
  const [loading, setLoading] = useState(true);


  useEffect(() => {
  async function fetchData() {
    const request = await axios.get(fetchUrl);

    // delay to show skeleton loading
    setTimeout(() => {
      setMovies(request.data.results);
      setLoading(false);
    }, 2000);
  }

  fetchData();
}, [fetchUrl]);

  const handleClick = (movie) => {
    if (trailerUrl) {
      setTrailerUrl("");
    } else {
      movieTrailer(movie?.name || movie?.title)
        .then((url) => {
          const urlParams = new URLSearchParams(new URL(url).search);
          setTrailerUrl(urlParams.get("v"));
        })
        .catch(() => alert("Trailer not found"));
    }
  };

return (
    <div className="row">
      <h2>{title}</h2>

        <div className="row_posters">

  {loading
    ? Array(6).fill(0).map((_, index) => (
        <div key={index} className="skeleton"></div>
      ))
    : movies.map((movie) => (
        <img
          key={movie.id}
          className="row_poster"
          src={`${IMAGE_BASE}${movie.poster_path}`}
          alt={movie.name}
          onClick={() => handleClick(movie)}
          // onMouseLeave={() => setTrailerUrl("")}
        />
      ))}

</div>

      {trailerUrl && (
  <div style={{ position: "relative" }}>
    <YouTube
      videoId={trailerUrl}
      opts={{
        height: "300",
        width: "100%",
        playerVars: {
          autoplay: 0, // don't autoplay
          mute: 1, // start muted (allowed)
          controls: 1,
        },
      }}
      onReady={(e) => e.target.playVideo()}
      onPlay={(e) => e.target.unMute()} // 🔊 unmute after play
    />
  </div>
)}

    </div>
  );
}

export default MovieRow;