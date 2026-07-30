import Navbar from "../components/navbar";
import Banner from "../components/banner";
import MovieRow from "../components/movierow";
import { requests } from "../api";

function Home() {
  return (
    <>
      <Navbar />
      <Banner />

      <MovieRow
        title="🔥 Trending Now"
        fetchUrl={requests.fetchTrending}
      />

      <MovieRow
        title="⭐ Top Rated"
        fetchUrl={requests.fetchTopRated}
      />

      <MovieRow
        title="💥 Action Movies"
        fetchUrl={requests.fetchAction}
      />

      <MovieRow
        title="😂 Comedy Movies"
        fetchUrl={requests.fetchComedy}
      />

      <MovieRow
        title="🎬 Upcoming Movies"
        fetchUrl={requests.fetchUpcoming}
      />
    </>
  );
}

export default Home;