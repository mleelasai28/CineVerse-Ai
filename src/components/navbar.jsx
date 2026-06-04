import "./navbar.css";
import { useEffect, useState } from "react";
import {
  FaSearch,
  FaBell,
  FaMoon,
  FaUserCircle,
  FaChevronDown
} from "react-icons/fa";

function Navbar() {
  const [show, setShow] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShow(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle("light-theme");
  };

  return (
    <nav className={`nav ${show ? "nav_black" : ""}`}>
      {/* Left Section */}
      <div className="nav_left">
        <h2 className="logo">MovieTrailers</h2>

        <div className="nav_links">
          <a href="#">Home</a>
          <a href="#">Trending</a>
          <a href="#">My List</a>
          <a href="#">AI Picks</a>

          <div className="dropdown">
            <span>
              Categories <FaChevronDown />
            </span>

            <div className="dropdown_content">
              <a href="#">Action</a>
              <a href="#">Comedy</a>
              <a href="#">Drama</a>
              <a href="#">Thriller</a>
              <a href="#">Sci-Fi</a>
            </div>
          </div>
        </div>
      </div>

      {/* Right Section */}
      <div className="nav_right">
        <div
          className={`search_box ${searchOpen ? "active" : ""}`}
        >
          <FaSearch
            className="icon"
            onClick={() => setSearchOpen(!searchOpen)}
          />

          <input
            type="text"
            placeholder="Search movies..."
          />
        </div>

        <FaBell className="icon" />

        <FaMoon
          className="icon"
          onClick={toggleTheme}
        />

        <div className="profile">
          <img
            className="avatar"
            src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"
            alt="avatar"
          />

          <div className="profile_dropdown">
            <p>Profile</p>
            <p>Watchlist</p>
            <p>Settings</p>
            <p>Logout</p>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;