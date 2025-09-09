import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav
      style={{
        background: "#6a11cb",
        color: "white",
        padding: "15px",
        display: "flex",
        gap: "20px",
      }}
    >
      <Link to="/" style={{ color: "white", textDecoration: "none" }}>
        Home
      </Link>
      <Link to="/categories" style={{ color: "white", textDecoration: "none" }}>
        Categories
      </Link>
      <Link to="/search" style={{ color: "white", textDecoration: "none" }}>
        Search
      </Link>
      <Link to="/bookmarks" style={{ color: "white", textDecoration: "none" }}>
        Bookmarks
      </Link>
      <Link to="/about" style={{ color: "white", textDecoration: "none" }}>
        About
      </Link>
    </nav>
  );
}

export default Navbar;
