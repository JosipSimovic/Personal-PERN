const pool = require("../database");
const queries = require("../queries/webshop-queries");

const HttpError = require("../models/http-error");

const { faker } = require("@faker-js/faker");

const getAllProducts = async (req, res, next) => {
  try {
    const resultData = await pool.query(queries.getAllProducts);

    res.status(200);
    res.json(resultData.rows);
  } catch (e) {
    return next(new HttpError("Something went wrong. " + e));
  }
};

const getProductsWithFilters = async (req, res, next) => {
  let { page, filters } = req.body;
  let numOfProducts = filters.numOfProducts;
  page = page - 1;

  // GET ALL COLORS //
  let count_price_result;
  try {
    count_price_result = (
      await pool.query(queries.getCountAndMaxPrice(filters))
    ).rows[0];
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

    let maxPages = Math.ceil(count / numOfProducts);

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
  console.log("Creating new product.");
  //const { name, description, color, image, price } = req.body;
  let result;

  // FILL DATABASE FOR TESTING //
  // try {
  //   for (let i = 0; i < 115; i++) {
  //     result = await pool.query(queries.insertNewProduct, [
  //       faker.commerce.product(),
  //       faker.commerce.productDescription(),
  //       faker.number.int({ min: 2, max: 11 }),
  //       faker.image.urlLoremFlickr({ category: "fashion" }),
  //       faker.commerce.price({ dec: 2 }),
  //     ]);
  //   }
  // } catch (e) {
  //   return next(new HttpError("Something went wrong: " + e, 400));
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
    return next(new HttpError("Something went wrong: " + e, 400));
  }

  res.status(201);
  res.json({
    message: "Product added.",
  });
};

const updateProduct = async (req, res, next) => {
  const { pid, formData } = req.body;
  const { name, description, price } = formData;

  try {
    const result = await pool.query(queries.updateProduct, [
      name,
      description,
      price,
      pid,
    ]);

    if (result.rowCount > 0) {
      res.status(201);
      res.json({
        message: "aaa",
      });
    } else {
      return next(new HttpError("Could not find product to update.", 500));
    }
  } catch (e) {}
};

module.exports = {
  getProductsWithFilters,
  insertNewProduct,
  getAllProducts,
  updateProduct,
};
