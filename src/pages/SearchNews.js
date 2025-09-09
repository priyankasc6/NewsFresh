import React, { useState } from "react";

function SearchNews({ addBookmark }) {
  const [query, setQuery] = useState("");
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false); // ✅ flag to check if search done

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query) return;

    try {
      setLoading(true);
      setSearched(true);
      setArticles([]); // clear previous results

      const res = await fetch(`http://localhost:5000/api/search?q=${query}`);
      const data = await res.json();

      if (data.articles && data.articles.length > 0) {
        setArticles(data.articles); // ✅ set search results
      } else {
        setArticles([]); // ✅ no results
      }
    } catch (error) {
      console.error("Error searching news:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Search News</h2>
      <form onSubmit={handleSearch} style={{ marginBottom: "20px" }}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for news..."
          style={{ padding: "10px", width: "300px" }}
        />
        <button
          type="submit"
          style={{ marginLeft: "10px", padding: "10px 15px" }}
        >
          Search
        </button>
      </form>

      {loading && <p>Loading results...</p>}

      {!loading && searched && articles.length === 0 && (
        <p>No results found for "{query}". Try a different search term.</p>
      )}

      <div style={{ display: "grid", gap: "20px" }}>
        {articles.map((article, index) => (
          <div
            key={index}
            style={{
              border: "1px solid #ddd",
              borderRadius: "8px",
              padding: "15px",
              background: "white",
            }}
          >
            <h3>{article.title}</h3>
            <p>{article.description}</p>
            <a href={article.url} target="_blank" rel="noopener noreferrer">
              Read more
            </a>
            <br />
            <button
              onClick={() => addBookmark(article)}
              style={{
                marginTop: "10px",
                padding: "8px 12px",
                background: "#6a11cb",
                color: "white",
                border: "none",
                borderRadius: "6px",
                cursor: "pointer",
              }}
            >
              Save
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SearchNews;
