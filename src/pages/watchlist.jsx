import { useState } from "react";

const IMAGE_BASE = "https://image.tmdb.org/t/p/w500";

function Watchlist() {
  const [movies, setMovies] = useState(() => {
    return JSON.parse(localStorage.getItem("watchlist")) || [];
  });

  const removeMovie = (id) => {
    const updated = movies.filter((movie) => movie.id !== id);
    setMovies(updated);
    localStorage.setItem("watchlist", JSON.stringify(updated));
  };

  return (
    <div className="watchlist">
      <h1>My Watchlist</h1>

      <div className="watchlist_grid">
        {movies.map((movie) => (
          <div key={movie.id}>
            <img
              src={`${IMAGE_BASE}${movie.poster_path}`}
              alt={movie.title}
            />

            <h3>
              {movie.title ||
                movie.name ||
                movie.original_name}
            </h3>

            <button
              onClick={() => removeMovie(movie.id)}
            >
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Watchlist;