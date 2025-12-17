import { useState, useEffect } from "react";
import {
  searchMovies,
  getPopularMovies,
  getMoviesByGenre,
  getTopRatedMovies,
  getTrendingMoviesDaily,
} from "../services/api";

import MovieCard from "../components/MovieCard";
import HeroCarousel from "../components/HeroCarousel";
import GenreFilter from "../components/GenreFilter";

import "../css/Home.css";

function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [activeGenre, setActiveGenre] = useState(null);
  const [activeSource, setActiveSource] = useState("popular");

  useEffect(() => {
    loadPopular();
  }, []);

  const loadPopular = async () => {
    setLoading(true);
    try {
      const data = await getPopularMovies();
      setMovies(data);
      setActiveSource("popular");
      setActiveGenre(null);
      setError(null);
    } catch {
      setError("Failed to load movies");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    setLoading(true);
    try {
      const results = await searchMovies(searchQuery);
      setMovies(results);
      setActiveGenre(null);
      setActiveSource("search");
      setError(null);
    } catch {
      setError("Failed to search movies");
    } finally {
      setLoading(false);
    }
  };

  const handleGenreSelect = async (genreId) => {
    setLoading(true);
    setActiveGenre(genreId);
    setActiveSource(`genre-${genreId}`);
    setSearchQuery("");

    try {
      const genreMovies = await getMoviesByGenre(genreId);
      setMovies(genreMovies);
      setError(null);
    } catch {
      setError("Failed to load genre movies");
    } finally {
      setLoading(false);
    }
  };

  const handleTopRated = async () => {
    setLoading(true);
    setActiveGenre(null);
    setActiveSource("top");
    setSearchQuery("");

    try {
      const top = await getTopRatedMovies();
      setMovies(top);
      setError(null);
    } catch {
      setError("Failed to load top rated movies");
    } finally {
      setLoading(false);
    }
  };

  const handleTrending = async () => {
    setLoading(true);
    setActiveGenre(null);
    setActiveSource("trending");
    setSearchQuery("");

    try {
      const trending = await getTrendingMoviesDaily();
      setMovies(trending);
      setError(null);
    } catch {
      setError("Failed to load trending movies");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="home">
      {/* 🎬 Hero */}
      <HeroCarousel />

      {/* 🎭 Genre Buttons */}
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

      {/* 🔥 Top / Trending BELOW search */}
      <div className="extra-filters centered">
        <button
          className={`genre-chip ${activeSource === "top" ? "active" : ""}`}
          onClick={handleTopRated}
        >
          🌟 Top Rated
        </button>

        <button
          className={`genre-chip ${activeSource === "trending" ? "active" : ""}`}
          onClick={handleTrending}
        >
          🔥 Trending
        </button>
      </div>

      {error && <div className="error-message">{error}</div>}

      {loading ? (
        <div className="loading">Loading...</div>
      ) : (
        <div className="movies-grid">
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;
