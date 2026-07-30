import React, { useEffect, useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import "./movierow.css";
import axios from "../api";
import YouTube from "react-youtube";
import movieTrailer from "movie-trailer";
import "./skeleton.css";

const IMAGE_BASE = "https://image.tmdb.org/t/p/w300";

function MovieRow({ title, fetchUrl }) {
  const [movies, setMovies] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState("");
  const [loading, setLoading] = useState(true);
  const [myList, setMyList] = useState(
  JSON.parse(localStorage.getItem("myList")) || []
);
  


useEffect(() => {
  async function fetchData() {
    try {
      setLoading(true);

      const request = await axios.get(fetchUrl);

      setTimeout(() => {
        setMovies(request?.data?.results || []);
        setLoading(false);
      }, 1000);
    } catch (error) {
      console.error("Error fetching movies:", error);
      setMovies([]);
      setLoading(false);
    }
  }

  if (fetchUrl) {
    fetchData();
  }
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

const toggleMyList = (movie) => {
  let updatedList;

  if (myList.some((item) => item.id === movie.id)) {
    updatedList = myList.filter((item) => item.id !== movie.id);
  } else {
    updatedList = [...myList, movie];
  }

  setMyList(updatedList);
  localStorage.setItem("myList", JSON.stringify(updatedList));
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
  <div className="movie-card" key={movie.id}>
    <img
  className="row_poster"
  src={`${IMAGE_BASE}${movie.poster_path}`}
  alt={movie.title}
  onClick={() => handleClick(movie)}
/>

    <button
  className="heart-btn"
  onClick={(e) => {
    e.stopPropagation();
    toggleMyList(movie);
  }}
>
      {myList.some((item) => item.id === movie.id) ? (
  <FaHeart />
) : (
  <FaRegHeart />
)}
    </button>
  </div>
))
}

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