import axios from "axios";

export const API_KEY = import.meta.env.VITE_TMDB_KEY;

const instance = axios.create({
  baseURL: "https://api.themoviedb.org/3",
});

export const requests = {
  // Home
  fetchTrending: `/trending/movie/week?api_key=${API_KEY}`,
  fetchTopRated: `/movie/top_rated?api_key=${API_KEY}`,
  fetchNetflixOriginals: `/discover/tv?api_key=${API_KEY}&with_networks=213`,

  // Categories
  fetchAction: `/discover/movie?api_key=${API_KEY}&with_genres=28`,
  fetchComedy: `/discover/movie?api_key=${API_KEY}&with_genres=35`,
  fetchHorror: `/discover/movie?api_key=${API_KEY}&with_genres=27`,
  fetchRomance: `/discover/movie?api_key=${API_KEY}&with_genres=10749`,
  fetchAnimation: `/discover/movie?api_key=${API_KEY}&with_genres=16`,
  fetchDocumentary: `/discover/movie?api_key=${API_KEY}&with_genres=99`,
  fetchUpcoming: `/movie/upcoming?api_key=${API_KEY}&language=en-US`,
};

export default instance;