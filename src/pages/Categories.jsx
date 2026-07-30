import Navbar from "../components/navbar";
import MovieRow from "../components/movierow";
import { requests } from "../api";

function Categories() {
  return (
    <>
      <Navbar />

      <div style={{ paddingTop: "80px" }}>
        <MovieRow
          title="💥 Action Movies"
          fetchUrl={requests.fetchAction}
        />

        <MovieRow
          title="😂 Comedy Movies"
          fetchUrl={requests.fetchComedy}
        />

        <MovieRow
          title="👻 Horror Movies"
          fetchUrl={requests.fetchHorror}
        />

        <MovieRow
          title="❤️ Romance Movies"
          fetchUrl={requests.fetchRomance}
        />

        <MovieRow
          title="🎨 Animation"
          fetchUrl={requests.fetchAnimation}
        />

        <MovieRow
          title="🎥 Documentary"
          fetchUrl={requests.fetchDocumentary}
        />
      </div>
    </>
  );
}

export default Categories;