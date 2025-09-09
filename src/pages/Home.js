// src/pages/Home.js
import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

function Home() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);

  // 🔹 Fetch India Top News (from backend)
  useEffect(() => {
    const fetchIndiaNews = async () => {
      setLoading(true);
      try {
        const res = await fetch("http://localhost:5000/api/top-news");
        const data = await res.json();
        setArticles(data.articles || []);
      } catch (error) {
        console.error("Error fetching India news:", error);
        setArticles([]);
      } finally {
        setLoading(false);
      }
    };

    fetchIndiaNews();
  }, []);

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h1 style={{ fontSize: "36px", color: "#6a11cb" }}>🇮🇳 Top News in India</h1>

      {/* Loading / Empty state */}
      {loading && <p>Loading news...</p>}
      {!loading && articles.length === 0 && <p>No results found.</p>}

      {/* Swiper News Carousel */}
      {!loading && articles.length > 0 && (
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={20}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          style={{ marginTop: "30px", maxWidth: "800px" }}
        >
          {articles.map((article, index) => (
            <SwiperSlide key={index}>
              <div
                style={{
                  border: "1px solid #ddd",
                  borderRadius: "12px",
                  padding: "20px",
                  background: "white",
                  textAlign: "left",
                }}
              >
                {article.image && (
                  <img
                    src={article.image}
                    alt="news"
                    style={{
                      width: "100%",
                      height: "300px",
                      objectFit: "cover",
                      borderRadius: "12px",
                      marginBottom: "15px",
                    }}
                  />
                )}
                <h3>{article.title}</h3>
                <p>{article.description}</p>
                <a
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: "#6a11cb", fontWeight: "bold" }}
                >
                  Read more →
                </a>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </div>
  );
}

export default Home;
