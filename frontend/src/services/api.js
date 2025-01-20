import axios from 'axios';

const API_KEY = import.meta.env.VITE_TMDB_API_KEY
const BASE_URL = "https://api.themoviedb.org/3/"

export const getNowPlaying = async () => {
  try {
    let response = await axios.get(`${BASE_URL}movie/now_playing?api_key=${API_KEY}`);
    let data = response.data;
    return data.results;
  }
  catch(error) {
    console.log(error);
  }
}

export const searchMovies = async (query) => {
  try {
    let response = await axios.get(`${BASE_URL}search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}`);
    let data = response.data;
    return data.results;
  }
  catch(error) {
    console.log(error);
  }
}

export const getMovieDetails = async (movieId) => {
  try {
    let response = await axios.get(`${BASE_URL}movie/${movieId}?api_key=${API_KEY}&append_to_response=videos`);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};