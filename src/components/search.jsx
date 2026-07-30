import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios, { API_KEY } from "../api";
import { useNavigate } from "react-router-dom";
import "../pages/watchlist.css";
const IMAGE = "https://image.tmdb.org/t/p/w300";

function Search() {
  const { query } = useParams();

  const [movies, setMovies] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
  async function searchMovie() {
    try {
      const request = await axios.get(
        `/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}`
      );

      console.log(request.data);

      setMovies(request.data.results || []);
    } catch (err) {
      console.error("Search Error:", err);
      setMovies([]);
    }
  }

  if (query) {
    searchMovie();
  }
}, [query]);
  return (
    <div className="watchlist-container">
  <h2>Search Results for "{query}"</h2>

  {movies.length === 0 ? (
    <p>No movies found.</p>
  ) : (
    <div className="watchlist-grid">
      {movies.map((movie) => (
        <div
          className="watchlist-card"
          key={movie.id}
          onClick={() => navigate(`/movie/${movie.id}`)}
        >
          <img
            src={`${IMAGE}${movie.poster_path}`}
            alt={movie.title}
          />

          <h3>{movie.title}</h3>

          <p>⭐ {movie.vote_average?.toFixed(1)}</p>
        </div>
      ))}
    </div>
  )}
</div>
  );
}

export default Search;