import supertest from 'supertest';
import app from "../app"

const request = supertest(app);

describe('GET /movies. movies.controller.getPopularMovies() tests', () => {
  it('Expect status 200 with an array of objects as response', async () => {
    const res = await request.get('/movies').query({page: 1});

    expect(res.status).toBe(200);

    const { results, pages, items } = res.body;
    expect(Array.isArray(results)).toBe(true);
    expect(typeof pages).toBe('number');
    expect(typeof items).toBe('number');
    results.forEach((movie) => {
      expect(movie.original_title).toBeDefined();
      expect(movie.release_date).toBeDefined();
    });
  });
});

describe('GET /movies/search. movies.controller.searchMovies() tests', () => {
  it('Expect status 200 with an array of objects as response', async () => {
    const res = await request.get('/movies/search').query({query: "avengers"});

    expect(res.status).toBe(200);

    const { results, pages, items } = res.body;
    expect(Array.isArray(results)).toBe(true);
    expect(typeof pages).toBe('number');
    expect(typeof items).toBe('number');
    results.forEach((movie) => {
      expect(movie.original_title).toBeDefined();
      expect(movie.release_date).toBeDefined();
    });
  });
});

describe('GET /movies/details. movies.controller.getMovieDetails() tests', () => {
  const id = 385687;
  it('Expect status 200 with an array of objects as response', async () => {
    const res = await request.get('/movies/details').query({id});

    expect(res.status).toBe(200);

    const movie = res.body;
    expect(movie.id).toEqual(id);
    expect(movie.poster_path).toBeDefined();
    expect(movie.original_title).toBeDefined();
    expect(movie.release_date).toBeDefined();
    expect(movie.overview).toBeDefined();
    expect(movie.runtime).toBeDefined();
  });
});