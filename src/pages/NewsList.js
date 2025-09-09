// NewsList.js
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function NewsList({ addBookmark }) {
  const { category } = useParams();
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `http://localhost:5000/api/news/${category || "general"}`
        );
        const data = await res.json();
        if (data.articles) {
          setArticles(data.articles);
        } else {
          setArticles([]);
        }
      } catch (error) {
        console.error("Error fetching news:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [category]);

  return (
    <div>
      <h2>{category ? category.toUpperCase() : "GENERAL"} NEWS</h2>
      {loading && <p>Loading news...</p>}
      {articles.length === 0 && !loading && <p>No news found.</p>}
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

export default NewsList;
