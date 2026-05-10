const productService = require("./product.service");
const redisClient = require("../../config/redis");

async function getProducts(req, res) {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 20;

    const offset = (page - 1) * limit;

    const cacheKey = `products:${page}:${limit}`;

    const cached = await redisClient.get(cacheKey);

    if (cached) {
      return res.json({
        source: "redis",
        data: JSON.parse(cached),
      });
    }

    const products = await productService.getProducts(limit, offset);

    await redisClient.setEx(cacheKey, 60, JSON.stringify(products));

    res.json({
      source: "database",
      data: products,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
}

module.exports = {
  getProducts,
};