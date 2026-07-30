import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import "./navbar.css";

function Navbar() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    if (!query.trim()) return;

    navigate(`/search/${encodeURIComponent(query.trim())}`);
    setQuery("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <nav className="navbar">
      {/* Logo */}
      <Link to="/" className="logo">
        CineVerse
      </Link>

      {/* Navigation Links */}
      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/trending">Trending</Link>
        <Link to="/categories">Categories</Link>
        <Link to="/aipicks">AI Picks</Link>
        <Link to="/watchlist">My List</Link>
      </div>

      {/* Search */}
      <div className="search-box">
        <input
          type="text"
          placeholder="Search movies..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
        />

        <button className="search-btn" onClick={handleSearch}>
          <FaSearch />
        </button>
      </div>
    </nav>
  );
}

export default Navbar;