import Navbar from "../components/navbar";
import Banner from "../components/banner";
import MovieRow from "../components/movierow";
import Search from "../components/search";
import { requests } from "../api";

function Home() {
  return (
    <div className="home">
      <Navbar />

      <Banner />

      <Search />

      <MovieRow
        title="🤖 AI Recommended For You"
        fetchUrl={requests.fetchTrending}
      />

      <MovieRow
        title="▶ Continue Watching"
        fetchUrl={requests.fetchTrending}
      />

      <MovieRow
        title="🔥 Trending Now"
        fetchUrl={requests.fetchTrending}
      />

      <MovieRow
        title="🎬 Action Movies"
        fetchUrl={requests.fetchAction}
      />

      <MovieRow
        title="😂 Comedy Movies"
        fetchUrl={requests.fetchComedy}
      />

      <MovieRow
        title="⭐ Top Rated"
        fetchUrl={requests.fetchTopRated}
      />

      <MovieRow
        title="📅 Coming Soon"
        fetchUrl={requests.fetchUpcoming}
      />
    </div>
  );
}

export default Home;