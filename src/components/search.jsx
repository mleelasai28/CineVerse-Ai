import { useState } from "react";
import axios from "../api";
import "./search.css";

const IMAGE_BASE = "https://image.tmdb.org/t/p/w300";

function Search() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);

  const searchMovie = async (e) => {
    e.preventDefault();

    const res = await axios.get(
    `/search/movie?api_key=c5d9e209a8714da1245b7af1a699e17c&query=${query}`
    );

    setMovies(res.data.results);
  };

  return (
    <div className="search">
      <form onSubmit={searchMovie}>
        <input
          type="text"
          placeholder="Search movies..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />

        <button>Search</button>
      </form>

      <div className="search_results">
        {movies.map((movie) => (
          <img
            key={movie.id}
            src={`${IMAGE_BASE}${movie.poster_path}`}
            alt={movie.title}
          />
        ))}
      </div>
    </div>
  );
}

export default Search;