const express = require("express");
require("dotenv").config();

const limiter = require("./middleware/rateLimiter");
const productRoutes = require("./modules/products/product.routes");

const app = express();

app.use(express.json());
app.use(limiter);

app.use("/products", productRoutes);

app.get("/", (req, res) => {
  res.json({
    message: "Scalable Commerce Engine API",
  });
});

app.listen(process.env.PORT, () => {
  console.log(`Server running on ${process.env.PORT}`);
});