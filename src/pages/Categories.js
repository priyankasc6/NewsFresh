// src/pages/Categories.js
import React from "react";
import { Link } from "react-router-dom";

function Categories() {
  const categories = [
    "business",
    "entertainment",
    "general",
    "health",
    "science",
    "sports",
    "technology",
  ];

  return (
    <div>
      <h2 style={{ marginBottom: "20px" }}>News Categories</h2>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {categories.map((category) => (
          <li key={category} style={{ margin: "10px 0" }}>
            <Link
              to={`/news/${category}`}
              style={{
                textDecoration: "none",
                color: "#6a11cb",
                fontSize: "18px",
                fontWeight: "bold",
              }}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Categories;
