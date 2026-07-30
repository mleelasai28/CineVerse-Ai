import Navbar from "../components/navbar";
import MovieRow from "../components/movierow";
import { requests } from "../api";

function Trending() {
  return (
    <>
      <Navbar />

      <div style={{ paddingTop: "90px" }}>
        <MovieRow
          title="🔥 Trending Movies"
          fetchUrl={requests.fetchTrending}
        />
      </div>
    </>
  );
}

export default Trending;