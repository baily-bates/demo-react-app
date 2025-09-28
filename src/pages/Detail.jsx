import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./Detail.module.css";

function Detail() {
  const location = useLocation();
  const navigate = useNavigate();

  const image = location.state?.image;

  if (!image) {
    return <p>No Image data is available. Go back to main page please.</p>;
  }

  return (
    <div>
      <div>
        <img src={image.urls.regular} alt={image.alt_description} />
        <p>
          <strong>Photographer:</strong> {image.user.name}
        </p>
        <p>
          <strong>Description:</strong> {image.alt_description}
        </p>
      </div>
      <button onClick={() => navigate(-1)}>Go Back</button>
    </div>
  );
}

export default Detail;
