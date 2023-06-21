import http from 'http';
import app from './app';
import redis from './middleware/redis';

const port = process.env.PORT || 4040;

const server = http.createServer(app);

server.listen(port, () => {
  console.log(`Listening to port ${port}`);
  redis.client.connect().then(() => {
    console.log('redis is connected');
  });
});
