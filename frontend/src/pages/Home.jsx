import { useState, useEffect } from "react";
import {
  searchMovies,
  getPopularMovies,
  getMoviesByGenre,
} from "../services/api";
import MovieCard from "../components/MovieCard";
import HeroCarousel from "../components/HeroCarousel";
import GenreFilter from "../components/GenreFilter";
import "../css/Home.css";

function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeGenre, setActiveGenre] = useState(null);

  useEffect(() => {
    const loadPopularMovies = async () => {
      try {
        const popularMovies = await getPopularMovies();
        setMovies(popularMovies);
      } catch (err) {
        console.log(err);
        setError("Failed to load movies...");
      } finally {
        setLoading(false);
      }
    };

    loadPopularMovies();
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    if (loading) return;

    setLoading(true);
    try {
      const searchResults = await searchMovies(searchQuery);
      setMovies(searchResults);
      setError(null);
      setActiveGenre(null); // Clear active genre on search
    } catch (err) {
      console.log(err);
      setError("Failed to search movies...");
    } finally {
      setLoading(false);
    }
  };

  const handleGenreSelect = async (genreId) => {
    if (genreId === activeGenre) return;
    setActiveGenre(genreId);
    setSearchQuery(""); // Clear search on genre filter
    setLoading(true);
    try {
      const genreMovies = await getMoviesByGenre(genreId);
      setMovies(genreMovies);
      setError(null);
    } catch (err) {
      console.log(err);
      setError("Failed to load genre movies.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="home">
      {/* 🎬 Hero Banner */}
      <HeroCarousel />

      {/* 🏷️ Genre Filter */}
      <GenreFilter
        onGenreSelect={handleGenreSelect}
        activeGenre={activeGenre}
      />

      {/* 🔍 Search */}
      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          placeholder="Search for movies..."
          className="search-input"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button type="submit" className="search-button">
          Search
        </button>
      </form>

      {error && <div className="error-message">{error}</div>}

      {loading ? (
        <div className="loading">Loading...</div>
      ) : (
        <div className="movies-grid">
          {movies.map((movie) => (
            <MovieCard movie={movie} key={movie.id} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;
