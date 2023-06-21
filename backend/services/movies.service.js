import axios from 'axios';

const fetchConfig = async () => {
  try {
    const response = await axios
      .get(
        `https://api.themoviedb.org/3/configuration?api_key=${process.env.MOVIE_DB_API_KEY}`,
      );
    return response.data;
  } catch (error) {
    console.error(error);
    return error;
  }
};

const fetchPopularMovies = async (page) => {
  try {
    const response = await axios
      .get(
        `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.MOVIE_DB_API_KEY}&page=${page}`,
      );
    return {
      results: response.data.results,
      pages: response.data.total_pages,
      items: response.data.total_results,
    };
  } catch (error) {
    console.error(error);
    return error;
  }
};

const searchMovies = async (page, query, sort_by, order) => {
  try {
    const response = await axios
      .get(
        `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_DB_API_KEY}&page=${page}&query=${query}&sort_by=${sort_by}.${order}`,
      );
    console.log(response.data.total_pages);
    return {
      results: response.data.results,
      pages: response.data.total_pages,
      items: response.data.total_results,
    };
  } catch (error) {
    console.error(error);
    return error;
  }
};

const getMovieDetails = async (id) => {
  try {
    const response = await axios
      .get(
        `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.MOVIE_DB_API_KEY}`,
      );
    return response.data;
  } catch (error) {
    console.error(error);
    return error;
  }
};

export default {
  fetchPopularMovies,
  searchMovies,
  fetchConfig,
  getMovieDetails,
};
