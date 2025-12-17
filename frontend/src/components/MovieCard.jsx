import { useState } from "react";
import MovieModal from "./MovieModal";
import "../css/MovieCard.css";
import { useMovieContext } from "../contexts/MovieContext";

function MovieCard({ movie }) {
  const [showModal, setShowModal] = useState(false);
  const { isFavorite, addToFavorites, removeFromFavorites } = useMovieContext();
  const favorite = isFavorite(movie.id);

  function onFavoriteClick(e) {
    e.preventDefault();
    e.stopPropagation();
    if (favorite) removeFromFavorites(movie.id);
    else addToFavorites(movie);
  }

  return (
    <>
      <div
        className="movie-card"
        onClick={() => setShowModal(true)}
      >
        <div className="movie-poster">
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
          />

          <div className="movie-overlay">
            <button
              className={`favorite-btn ${favorite ? "active" : ""}`}
              onClick={onFavoriteClick}
            >
              ♥
            </button>
          </div>

          <div className="movie-rating">
            ⭐ {movie.vote_average?.toFixed(1)}/10
          </div>
        </div>

        <div className="movie-info">
          <h3>{movie.title}</h3>
          <p>{movie.release_date?.split("-")[0]}</p>
        </div>
      </div>

      {showModal && (
        <MovieModal
          movieId={movie.id}
          onClose={() => setShowModal(false)}
        />
      )}
    </>
  );
}

export default MovieCard;
