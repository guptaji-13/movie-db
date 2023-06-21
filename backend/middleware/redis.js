import * as redis from 'redis';
const client = redis.createClient({
  host: "127.0.0.1",
  port: 6379,
});
async function cache(req, res, next) {
  const key = "__express__" + req.originalUrl || req.url;

  client.get(key).then(reply => {
    
    if (reply) {
      res.send(JSON.parse(reply));
    } else {
      res.sendResponse = res.send;
      res.send = (body) => {
        //expire in 5 min
        client.set(key, JSON.stringify(body), {'EX':300});
        res.sendResponse(body);
      };
      next();
    }
  }).catch(err=>{
    console.log(err);
    res.status(500).send(err)
  });
}

export default {
  client, cache
};