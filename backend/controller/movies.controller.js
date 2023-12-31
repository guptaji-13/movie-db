import moviesService from '../services/movies.service.js';

const getPopularMovies = async (req, res) => {
  try {
    const page = req.query.page || 1;
    const data = await moviesService.fetchPopularMovies(page);
    return res.send(data);
  } catch (err) {
    console.log(err);
    return res.send(err);
  }
};

const getMovieDetails = async (req, res) => {
  try {
    const { id } = req.query;
    const data = await moviesService.getMovieDetails(id);
    return res.send(data);
  } catch (err) {
    console.log(err);
    return res.send(err);
  }
};

const searchMovies = async (req, res) => {
  try {
    let {
      page = 1, query = '', sort_by = 'popularity', order = 'desc',
    } = req.query;
    query = query.toString().toLowerCase();
    sort_by = sort_by.toString().toLowerCase();
    order = order.toString().toLowerCase();
    console.log({
      page, query, sort_by, order,
    });
    const data = await moviesService.searchMovies(page, query, sort_by, order);
    return res.send(data);
  } catch (err) {
    console.log(err);
    return res.send(err);
  }
};

export default {
  getPopularMovies,
  searchMovies,
  getMovieDetails,
};
