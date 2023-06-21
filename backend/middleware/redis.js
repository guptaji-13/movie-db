import * as redis from 'redis';
import dotenv from 'dotenv';
dotenv.config();

const client = redis.createClient({
  password: process.env.REDIS_PASSWORD,
  socket: {
      host: process.env.REDIS_HOST,
      port: process.env.REDIS_PORT
  }
});
client.connect().then(() => {
  console.log('redis is connected');
});

client.on('error',(error) => {
  console.log('Redis connection error :', error);
})
async function cache(req, res, next) {
  const key = `__express__${req.originalUrl}` || req.url;

  client.get(key).then((reply) => {
    if (reply) {
      res.send(JSON.parse(reply));
    } else {
      res.sendResponse = res.send;
      res.send = (body) => {
        // expire in 5 min
        client.set(key, JSON.stringify(body), { EX: 300 });
        res.sendResponse(body);
      };
      next();
    }
  }).catch((err) => {
    console.log(err);
    res.status(500).send(err);
  });
}

export default {
  client, cache,
};
