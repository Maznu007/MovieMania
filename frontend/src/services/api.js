const API_KEY = "e07d7a3411cc129029c14c9dcd952e6a";
const BASE_URL = "https://api.themoviedb.org/3";

export async function getPopularMovies(){
    const response = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}`);
    const data = await response.json();
    return data.results;        
}

export async function searchMovies(query){
    const response = await fetch(`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}`);
    const data = await response.json();
    return data.results;        
}
// fetch trending movies
export async function getTrendingMovies() {
  const response = await fetch(`${BASE_URL}/trending/movie/day?api_key=${API_KEY}`);
  const data = await response.json();
  return data.results;
}

//Get genre list
export async function getGenres() {
  const response = await fetch(`${BASE_URL}/genre/movie/list?api_key=${API_KEY}`);
  const data = await response.json();
  return data.genres;
}

//Get movies by genre ID
export async function getMoviesByGenre(genreId) {
  const response = await fetch(
    `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=${genreId}`
  );
  const data = await response.json();
  return data.results;
}

//fetch modal details

export async function getMovieDetails(movieId) {
  const response = await fetch(
    `${BASE_URL}/movie/${movieId}?api_key=${API_KEY}&append_to_response=videos,credits`
  );
  const data = await response.json();
  return data;
}

// top trend
export async function getTrendingMoviesDaily() {
  const response = await fetch(`${BASE_URL}/trending/movie/day?api_key=${API_KEY}`);
  const data = await response.json();
  return data.results;
}

export async function getTopRatedMovies() {
  const response = await fetch(`${BASE_URL}/movie/top_rated?api_key=${API_KEY}`);
  const data = await response.json();
  return data.results;
}
