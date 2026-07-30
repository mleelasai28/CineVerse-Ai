import Navbar from "../components/navbar";
import "./watchlist.css";
function WatchList() {
  const movies = JSON.parse(localStorage.getItem("myList")) || [];

  return (
    <>
      <Navbar />

      <div className="watchlist">
  <h1>❤️ My List</h1>

  <div className="watchlist-grid">
    {movies.map((movie) => (
      <img
        key={movie.id}
        className="watchlist-poster"
        src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
        alt={movie.title}
      />
    ))}
  </div>
</div>
    </>
  );
}

export default WatchList;