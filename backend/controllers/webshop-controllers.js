const DATABASE = require("../DUMMY_DATABASE").DATABASE;

const getWebshop = async (req, res, next) => {
  let { page, filters } = req.body;
  let numOfProducts = filters.numOfProducts;
  page = (page - 1) * numOfProducts;

  let products = DATABASE.products;

  Object.entries(filters).forEach(([key, value]) => {
    switch (key) {
      case "name":
        if (value && value.trim() !== "") {
          let filteredProducts = products.filter((product) =>
            product.name.toLowerCase().includes(value.toLowerCase())
          );
          products = filteredProducts;
        }
        break;
      case "sort":
        switch (value) {
          case 0:
            products.sort((a, b) => a.name.localeCompare(b.name));
            break;
          case 1:
            products.sort((a, b) => b.name.localeCompare(a.name));
            break;
          case 2:
            products.sort((a, b) => Number(a.price) - Number(b.price));
            break;
          case 3:
            products.sort((a, b) => Number(b.price) - Number(a.price));
            break;
          default:
            break;
        }
      case "colors":
        if (filters.colors.length > 0) {
          let filteredProducts = products.filter((product) =>
            filters.colors.includes(product.color)
          );
          products = filteredProducts;
        }
      case "price":
        if (filters.price[1] !== 0) {
          let filteredProducts = products.filter(
            (product) =>
              filters.price[0] <= product.price &&
              product.price <= filters.price[1]
          );
          products = filteredProducts;
        }
      default:
        break;
    }
  });

  let colors = [...new Set(DATABASE.products.map((item) => item.color))];

  let prices = [
    ...new Set(DATABASE.products.map((item) => Number(item.price))),
  ];
  let maxPrice = Math.ceil(...prices);

  let maxPages = Math.floor(products.length / numOfProducts);
  products = products.slice(page, page + numOfProducts);

  res.status(200);
  res.json({
    products: products,
    maxPages: maxPages,
    maxPrice: maxPrice,
    colors: colors,
  });
};

exports.getWebshopByPage = getWebshop;
