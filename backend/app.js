import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import movieRoute from './routes/movies.route.js';
import redis from './middleware/redis.js';

dotenv.config({ path: '.env' });
const app = express();
app.use(redis.cache);
app.use(cors({
  origin: '*',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': '*',
  'Access-Control-Allow-Methods': '*',
  methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH', 'OPTIONS']
}));
app.use('/movies', movieRoute);

export default app;
