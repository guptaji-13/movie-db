import express from 'express';
import movieRoute from './movies/movies.route.js';
import dotenv from 'dotenv';
import cors from 'cors';
dotenv.config({path: '.env'})

const app = express();
const port = process.env.PORT || 4040;

const whitelist = ['http://localhost:3000', 'http://localhost:4040'];
const corsOptions = {
  credentials: true,
  exposedHeaders: ["set-cookie"],
  origin: (origin, callback) => {
    if(whitelist.includes(origin))
      return callback(null, true)
      callback(new Error('Not allowed by CORS'));
  }
}
app.use(cors(corsOptions));

app.use("/movies", movieRoute);

app.listen(port, ()=>{
  console.log(`Listening to port ${port}`)
})