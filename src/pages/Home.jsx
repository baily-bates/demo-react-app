import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Home.module.css";

function Home() {
  const [query, setQuery] = useState("");
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const UNSPLASH_ACCESS_KEY = import.meta.env
    .VITE_REACT_APP_UNSPLASH_ACCESS_KEY;

  const navigate = useNavigate();

  const fetchImages = useCallback(
    async (searchQuery) => {
      if (!searchQuery.trim()) {
        setImages([]);
        return;
      }

      setLoading(true);
      setError("");

      try {
        const response = await fetch(
          `https://api.unsplash.com/search/photos?query=${searchQuery}&client_id=${UNSPLASH_ACCESS_KEY}&per_page=9`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch images. Please try again.");
        }
        const data = await response.json();
        setImages(data.results);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    },
    [UNSPLASH_ACCESS_KEY]
  );

  useEffect(() => {
    const initialQuery = query || "nature";

    const handler = setTimeout(() => {
      fetchImages(initialQuery);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [query, fetchImages]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      fetchImages(query);
    }
  };

  const handleImageClick = (imageData) => {
    navigate(`/details/${imageData.id}`, { state: { image: imageData } });
  };

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  useEffect(() => {
    // default query
    fetchImages("nature");
  }, []);

  return (
    <div className={styles.homeContainer}>
      <div className={styles.heading}>
        <h1>Welcome</h1>
        <p>Explore our collection</p>
      </div>
      <div className={styles.searchBar}>
        <input
          type="search"
          placeholder="Search here for..."
          value={query}
          onChange={handleInputChange}
          className={styles.input}
        />
      </div>

      {error && <p>Error: {error}</p>}
      {loading && <p>Loading...</p>}
      <div className={styles.imageContainer}>
        {images.map((image) => (
          <div
            key={image.id}
            onClick={() => handleImageClick(image)}
            className="image-card"
          >
            <img
              src={image.urls.small}
              alt={image.alt_description}
              className={styles.imageCard}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
