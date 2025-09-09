// server.js
import express from "express";
import fetch from "node-fetch";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

const API_KEY = process.env.GNEWS_API_KEY;

// -------------------------
// ROUTES
// -------------------------

// 🔹 Top news for India only
// 🔹 Top news for India only (using GNews API)
app.get("/api/top-news", async (req, res) => {
  try {
    const response = await fetch(
      `https://gnews.io/api/v4/top-headlines?country=in&lang=en&max=20&apikey=${process.env.GNEWS_API_KEY}`
    );
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error("Error fetching India top news:", error);
    res.status(500).json({ error: "Failed to fetch India top news" });
  }
});


// 🔹 Category-based news
app.get("/api/news/:category", async (req, res) => {
  const category = req.params.category || "general";
  try {
    const response = await fetch(
      `https://newsapi.org/v2/top-headlines?country=in&category=${category}&apiKey=${API_KEY}`
    );
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error("Error fetching category news:", error);
    res.status(500).json({ error: "Failed to fetch category news" });
  }
});

// 🔹 Search route
app.get("/api/search", async (req, res) => {
  const query = req.query.q;
  if (!query) {
    return res.status(400).json({ error: "Query parameter is required" });
  }
  try {
    const response = await fetch(
      `https://newsapi.org/v2/everything?q=${query}&language=en&sortBy=publishedAt&apiKey=${API_KEY}`
    );
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error("Error searching news:", error);
    res.status(500).json({ error: "Failed to search news" });
  }
});

// 🔹 Default route
app.get("/", (req, res) => {
  res.send("NewsFresh backend is running 🚀");
});

// -------------------------
// START SERVER
// -------------------------
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
