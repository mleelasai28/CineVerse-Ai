import axios from "axios";

const API_KEY = import.meta.env.VITE_TMDB_KEY;

const instance = axios.create({
  baseURL: "https://api.themoviedb.org/3",
});

export const requests = {
  fetchTrending: `/trending/all/week?api_key=${API_KEY}`,
  fetchAction: `/discover/movie?api_key=${API_KEY}&with_genres=28`,
  fetchComedy: `/discover/movie?api_key=${API_KEY}&with_genres=35`,
  fetchTopRated: `/movie/top_rated?api_key=${API_KEY}`,
  fetchUpcoming: `/movie/upcoming?api_key=${API_KEY}`,
};

export default instance;