import { useEffect, useState } from "react";
import { getGenres } from "../services/api";
import "../css/GenreFilter.css";

function GenreFilter({ onGenreSelect, activeGenre }) {
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    const loadGenres = async () => {
      try {
        const data = await getGenres();
        setGenres(data);
      } catch (err) {
        console.error("Failed to fetch genres", err);
      }
    };
    loadGenres();
  }, []);

  return (
    <div className="genre-filter">
      {genres.map((genre) => (
        <button
          key={genre.id}
          className={`genre-chip ${activeGenre === genre.id ? "active" : ""}`}
          onClick={() => onGenreSelect(genre.id)}
        >
          {genre.name}
        </button>
      ))}
    </div>
  );
}

export default GenreFilter;
