const pool = require("../database");
const queries = require("../queries/webshop-queries");

const HttpError = require("../models/http-error");

const { faker } = require("@faker-js/faker");

const getProductsWithFilters = async (req, res, next) => {
  let { page, filters } = req.body;
  let numOfProducts = filters.numOfProducts;
  page = (page - 1) * numOfProducts;

  // GET ALL COLORS //
  let count_price_result;
  try {
    count_price_result = (await pool.query(queries.getCountAndMaxPrice()))
      .rows[0];
  } catch (e) {
    console.log(e);
  }
  let { count, max_price: maxPrice } = count_price_result;

  try {
    let products = (
      await pool.query(queries.getProductsWithFilters(filters, page))
    ).rows;

    let colorsInfo = (await pool.query(queries.getProductColors)).rows[0]
      .grouped_colors;
    console.log(colorsInfo);

    let maxPages = Math.floor(products.length / numOfProducts);

    res.status(200);
    res.json({
      products: products,
      maxPages: maxPages,
      maxPrice: maxPrice,
      colors: colorsInfo,
    });
  } catch (e) {
    throw e;
  }
};

const insertNewProduct = async (req, res, next) => {
  const { name, description, color, image, price } = req.body;
  let result;

  // FILL DATABASE FOR TESTING //
  // try {
  //   for (let i = 0; i < 240; i++) {
  //     result = await pool.query(queries.insertNewProduct, [
  //       faker.commerce.product(),
  //       faker.commerce.productDescription(),
  //       faker.number.int({ min: 2, max: 11 }),
  //       null,
  //       faker.commerce.price({ dec: 2 }),
  //     ]);
  //   }
  // } catch (e) {
  //   next(new HttpError("Something went wrong: " + e, 400));
  // }

  try {
    result = await pool.query(queries.insertNewProduct, [
      name,
      description,
      color,
      image,
      price,
    ]);
  } catch (e) {
    next(new HttpError("Something went wrong: " + e, 400));
  }

  res.status(201);
  res.json({
    message: "Product added.",
  });
};

exports.getProductsWithFilters = getProductsWithFilters;
exports.insertNewProduct = insertNewProduct;
