import React from "react";

function Bookmarks({ bookmarks, removeBookmark }) {
  return (
    <div>
      <h2>Your Bookmarks</h2>
      {bookmarks.length === 0 ? (
        <p>No bookmarks saved yet.</p>
      ) : (
        bookmarks.map((article, index) => (
          <div
            key={index}
            style={{
              border: "1px solid #ccc",
              padding: "15px",
              margin: "10px 0",
              borderRadius: "8px",
            }}
          >
            <h3>{article.title}</h3>
            <p>{article.description}</p>
            <a href={article.url} target="_blank" rel="noreferrer">
              Read more
            </a>
            <br />
            <button onClick={() => removeBookmark(article.url)}>
              Remove
            </button>
          </div>
        ))
      )}
    </div>
  );
}

export default Bookmarks;
