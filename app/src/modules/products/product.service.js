const pool = require("../../config/db");

async function getProducts(limit, offset) {
  const [rows] = await pool.query(
    `
    SELECT id, name, price, stock, category, created_at
    FROM products
    ORDER BY created_at DESC
    LIMIT ? OFFSET ?
  `,
    [limit, offset]
  );

  return rows;
}

module.exports = {
  getProducts,
};