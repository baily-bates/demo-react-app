import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const [query, setQuery] = useState("");
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const UNSPLASH_ACCESS_KEY = import.meta.env
    .VITE_REACT_APP_UNSPLASH_ACCESS_KEY;

  const navigate = useNavigate();

  const fetchImages = async (searchQuery) => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        `https://api.unsplash.com/search/photos?query=${searchQuery}&client_id=${UNSPLASH_ACCESS_KEY}`
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
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      fetchImages(query);
    }
  };

  const handleImageClick = (imageData) => {
    console.log("Navigating to details with:", imageData);
    navigate(`/details/${imageData.id}`, { state: { image: imageData } });
  };

  useEffect(() => {
    // default query
    fetchImages("nature");
  }, []);

  return (
    <div>
      <h1>Main Page</h1>
      <p>Please use search bar</p>
      <form onSubmit={handleSearch}>
        <input
          type="search"
          placeholder="Search here for..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>

      {loading && <p>Loading...</p>}
      <div>
        {images.map((image) => (
          <div key={image.id} onClick={() => handleImageClick(image)}>
            <img src={image.urls.small} alt={image.alt_description} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
