const rateLimit = require("express-rate-limit");

const limiter = rateLimit({
  windowMs: 60 * 1000,
  max: 100,
  message: {
    message: "Too many requests",
  },
});

module.exports = limiter;