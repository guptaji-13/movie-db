import axios from 'axios';

const fetchConfig = async () => {
  try {
    let response = await axios
      .get(
        `https://api.themoviedb.org/3/configuration?api_key=${process.env.MOVIE_DB_API_KEY}`
      );
    return response.data;;
  } catch (error) {
    console.error(error);
  }
}

const fetchPopularMovies = async (page, query) => {
  try {
    let response = await axios
      .get(
        `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.MOVIE_DB_API_KEY}&page=${page}`
      );
    return {
      results: response.data.results,
      pages: response.data.total_pages,
      items: response.data.total_results
    }
  } catch (error) {
    console.error(error);
  }
};

const searchMovies = async (page, query, sort_by, order) => {
  try {
    let response = await axios
      .get(
        `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_DB_API_KEY}&page=${page}&query=${query}&sort_by=${sort_by}.${order}`
      );
      console.log(response.data.total_pages);
    return {
      results: response.data.results,
      pages: response.data.total_pages,
      items: response.data.total_results
    }
  } catch (error) {
    console.error(error);
  }
};

const getMovieDetails = async (id) => {
  try {
    let response = await axios
      .get(
        `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.MOVIE_DB_API_KEY}`
      );
    return response.data;;
  } catch (error) {
    console.error(error);
  }
};

export default {
  fetchPopularMovies,
  searchMovies,
  fetchConfig,
  getMovieDetails
};