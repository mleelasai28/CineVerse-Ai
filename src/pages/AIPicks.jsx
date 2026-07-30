import Navbar from "../components/navbar";
import MovieRow from "../components/movierow";
import { requests } from "../api";

function AIPicks() {
  return (
    <>
      <Navbar />

      <div style={{ paddingTop: "80px" }}>
        <MovieRow
          title="🤖 AI Recommended"
          fetchUrl={requests.fetchTopRated}
        />

        <MovieRow
          title="🔥 Trending For You"
          fetchUrl={requests.fetchTrending}
        />

        <MovieRow
          title="💥 Action Favorites"
          fetchUrl={requests.fetchAction}
        />

        <MovieRow
          title="😂 Comedy Picks"
          fetchUrl={requests.fetchComedy}
        />
      </div>
    </>
  );
}

export default AIPicks;