import express from 'express';

import movies from '../controller/movies.controller';

const router = express.Router();

router.get('/', movies.getPopularMovies);
router.get('/search', movies.searchMovies);
router.get('/details', movies.getMovieDetails);

export default router;
