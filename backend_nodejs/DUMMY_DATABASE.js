// FAKER DUMMY DATA
const { faker } = require("@faker-js/faker");
const DATABASE = {};

let products = [];
for (let i = 0; i < 100; i++) {
  products.push({
    id: faker.string.uuid(),
    name: faker.commerce.product(),
    description: faker.commerce.productDescription(),
    price: faker.commerce.price({
      min: 1,
      dec: 2,
    }),
    image: faker.image.url(),
    color: faker.color.human(),
  });
}

products.sort((a, b) => a.name.localeCompare(b.name));

DATABASE.products = products;

exports.DATABASE = DATABASE;
