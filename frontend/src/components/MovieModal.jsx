import React, { useEffect, useState } from "react";
import { getMovieDetails } from "../services/api";
import "../css/MovieModal.css";

function MovieModal({ movieId, onClose }) {
  const [details, setDetails] = useState(null);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const data = await getMovieDetails(movieId);
        setDetails(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchDetails();
  }, [movieId]);

  if (!details) return null;

  //official trailer
  const trailer = details.videos.results.find(
    (vid) => vid.type === "Trailer" && vid.site === "YouTube"
  );

  const posterUrl = details.backdrop_path
    ? `https://image.tmdb.org/t/p/original${details.backdrop_path}`
    : "";

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>
          ✕
        </button>

        {posterUrl && (
          <div
            className="modal-header"
            style={{ backgroundImage: `url(${posterUrl})` }}
          >
            <div className="modal-gradient" />
            <h2 className="modal-title">{details.title}</h2>
          </div>
        )}

        <div className="modal-body">
          <p className="modal-overview">{details.overview}</p>

          <div className="modal-info">
            <span>⭐ {details.vote_average?.toFixed(1)}/10</span>
            <span>📅 {details.release_date}</span>
            {details.genres && (
              <span>
                🎭{" "}
                {details.genres.map((g) => g.name).join(", ")}
              </span>
            )}
          </div>

          {trailer && (
            <a
              className="trailer-btn"
              href={`https://www.youtube.com/watch?v=${trailer.key}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              ▶ Watch Trailer
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

export default MovieModal;
