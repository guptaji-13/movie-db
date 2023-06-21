import app from "./app.js"
import redis from './middleware/redis.js'
import http from 'http'

const port = process.env.PORT || 4040;

const server = http.createServer(app);

server.listen(port, ()=>{
  console.log(`Listening to port ${port}`);
  redis.client.connect().then(()=> {
    console.log('redis is connected')
  })
})
