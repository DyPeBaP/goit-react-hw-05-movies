import axios from "axios";
axios.defaults.baseURL = "https://api.themoviedb.org/3";
const API_KEY = "ed8fe7b810f597a44e1a3ecad79e932f";

export default async function getTrendingMovies() {
  const {
    data: { results },
  } = await axios.get(`/trending/all/day?api_key=${API_KEY}`);
  return results;
}

export async function getMoviesByQuery(query) {
  const {
    data: { results },
  } = await axios.get(`/search/movie?api_key=${API_KEY}&query=${query}`);
  return results;
}

export async function getMoviesById(id) {
  const { data } = await axios.get(`/movie/${id}?api_key=${API_KEY}`);
  return data;
}

export async function getMoviesCast(id) {
  const { data } = await axios.get(`/movie/${id}/credits?api_key=${API_KEY}`);
  return data;
}

export async function getMoviesReview(id) {
  const { data } = await axios.get(`/movie/${id}/reviews?api_key=${API_KEY}`);
  return data;
}