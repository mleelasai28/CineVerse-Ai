import { useState } from "react";
import Navbar from "../components/navbar";
import SearchResults from "../components/SearchResults";

function Search() {
  const [query, setQuery] = useState("");

  return (
    <>
      <Navbar />

      <div
        style={{
          paddingTop: "100px",
          paddingLeft: "30px",
          paddingRight: "30px",
        }}
      >
        <input
          type="text"
          placeholder="Search movies..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          style={{
            width: "100%",
            padding: "15px",
            fontSize: "18px",
            borderRadius: "8px",
            outline: "none",
          }}
        />

        {query && <SearchResults query={query} />}
      </div>
    </>
  );
}

export default Search;