const redis = require("redis");
require("dotenv").config();

const client = redis.createClient({
  socket: {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
  },
});

client.on("error", (err) => {
  console.log("Redis Error", err);
});

(async () => {
  await client.connect();
})();

module.exports = client;