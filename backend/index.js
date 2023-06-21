import http from 'http';
import app from './app.js';

const port = process.env.PORT || 4040;

const server = http.createServer(app);

server.listen(port, () => {
  console.log(`Listening to port ${port}`);
});
