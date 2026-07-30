import { Routes, Route } from "react-router-dom";
import Search from "./components/search";
import Home from "./pages/home";
import Trending from "./pages/Trending";
import AIPicks from "./pages/AIPicks";
import Categories from "./pages/Categories";
import WatchList from "./pages/watchlist";
import MovieDetails from "./pages/MovieDetails";


function App() {
  return (
    <Routes>
  <Route path="/" element={<Home />} />
  <Route path="/trending" element={<Trending />} />
  <Route path="/aipicks" element={<AIPicks />} />
  <Route path="/categories" element={<Categories />} />
  <Route path="/watchlist" element={<WatchList />} />
  <Route path="/movie/:id" element={<MovieDetails />} />
  <Route path="/search/:query" element={<Search />} />
</Routes>
  );
}

export default App;