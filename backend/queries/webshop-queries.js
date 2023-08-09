const getCountAndMaxPrice = () => {
  let query =
    "SELECT COUNT(p.*) AS count, MAX(p.price) as max_price " +
    "FROM products p " +
    "JOIN product_colors c ON p.color = c.id";
  console.log(query);
  return query;
};

const getProductsWithFilters = (filters, page) => {
  let query =
    "SELECT * FROM products p " +
    "JOIN product_colors c ON p.color = c.id " +
    setQueryFilters(filters, page);
  return query;
};

const getProductColors =
  "SELECT json_object_agg(id, json_build_object('color_name', color_name, 'hex', hex)) AS grouped_colors " +
  "FROM product_colors";

const insertNewColor =
  "INSERT INTO product_colors (color_name, hex) VALUES ($1, $2)";

const insertNewProduct =
  "INSERT INTO products (name, description, color, image, price) " +
  "VALUES ($1, $2, $3, $4, $5)";

// FUNCTIONS //
const setQueryFilters = (filters, page) => {
  let whereClause = [];
  // Check if the 'name' filter is provided and add it to the WHERE clause
  if (filters.name && filters.name.trim() !== "") {
    whereClause.push(`LOWER(name) LIKE $${values.length + 1}`);
    values.push(`%${filters.name.toLowerCase()}%`);
  }

  // Check if the 'colors' filter is provided and add it to the WHERE clause
  if (filters.colors.length > 0) {
    whereClause.push(
      `c.color_name IN (${filters.colors
        .map((c, i) => `'${c.toLowerCase()}'`)
        .join(", ")})`
    );
  }

  // Check if the 'price' filter is provided and add it to the WHERE clause
  let [startPrice, endPrice] = filters.price;
  if (endPrice !== 0) {
    whereClause.push(`p.price BETWEEN ${startPrice} AND ${endPrice}`);
  }

  let whereCondition;
  try {
    // Combine the WHERE clause conditions and create the final query string
    whereCondition =
      whereClause.length > 0 ? `WHERE ${whereClause.join(" AND ")}` : "";
  } catch (e) {
    throw e;
  }

  let sortCondition;
  switch (filters.sort) {
    case 0:
      sortCondition = " ORDER BY p.name ASC";
      break;
    case 1:
      sortCondition = " ORDER BY p.name DESC";
      break;
    case 2:
      sortCondition = " ORDER BY p.price ASC";
      break;
    case 3:
      sortCondition = " ORDER BY p.price DESC";
      break;

    default:
      break;
  }
  whereCondition += sortCondition;
  console.log(whereCondition);

  // Add number of products to get based on user page
  whereCondition += ` LIMIT ${filters.numOfProducts} OFFSET ${
    page * filters.numOfProducts
  }`;
  console.log(whereCondition);

  return whereCondition;
};

module.exports = {
  getProductsWithFilters,
  insertNewProduct,
  getCountAndMaxPrice,
  insertNewColor,
  getProductColors,
};
