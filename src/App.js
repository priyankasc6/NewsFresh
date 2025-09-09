// App.js
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Categories from "./pages/Categories";
import SearchNews from "./pages/SearchNews";
import Bookmarks from "./pages/Bookmarks";
import NewsList from "./pages/NewsList";
import About from "./pages/About";  // ✅ Import About page

function App() {
  const [bookmarks, setBookmarks] = useState([]);

  // Load bookmarks from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("bookmarks");
    if (saved) {
      setBookmarks(JSON.parse(saved));
    }
  }, []);

  // Save bookmarks whenever they change
  useEffect(() => {
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  }, [bookmarks]);

  const addBookmark = (article) => {
    if (!bookmarks.some((b) => b.url === article.url)) {
      setBookmarks([...bookmarks, article]);
    }
  };

  const removeBookmark = (url) => {
    setBookmarks(bookmarks.filter((b) => b.url !== url));
  };

  return (
    <Router>
      <Navbar />
      <div style={{ padding: "20px" }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/categories" element={<Categories />} />
          <Route
            path="/news/:category"
            element={<NewsList addBookmark={addBookmark} />}
          />
          <Route
            path="/search"
            element={<SearchNews addBookmark={addBookmark} />}
          />
          <Route
            path="/bookmarks"
            element={
              <Bookmarks bookmarks={bookmarks} removeBookmark={removeBookmark} />
            }
          />
          <Route path="/about" element={<About />} /> {/* ✅ Added About */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
