import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import movieRoute from './routes/movies.route';
import redis from './middleware/redis';

dotenv.config({ path: '.env' });
const app = express();
const whitelist = ['http://localhost:3000', 'http://localhost:4040'];
const corsOptions = {
  credentials: true,
  exposedHeaders: ['set-cookie'],
  origin: (origin, callback) => {
    if (whitelist.includes(origin)) return callback(null, true);
    return callback(new Error('Not allowed by CORS'));
  },
};
app.use(cors(corsOptions));
app.use(redis.cache);

app.use('/movies', movieRoute);

export default app;
