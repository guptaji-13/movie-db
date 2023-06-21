import express from 'express';
const router = express.Router();

import movies from "./movies.controller.js";

router.get("/", movies.getPopularMovies);
router.get("/search", movies.searchMovies);
router.get("/details", movies.getMovieDetails);

export default router;