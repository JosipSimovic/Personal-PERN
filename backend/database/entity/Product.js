var EntitySchema = require("typeorm").EntitySchema;

module.exports = new EntitySchema({
  name: "Products",
  tableName: "products",
  columns: {
    id: {
      primary: true,
      type: "uuid",
    },
    name: {
      type: "varchar",
    },
    description: {
      type: "varchar",
    },
    price: {
      type: "numeric",
    },
    image: {
      type: "varchar",
    },
    color: {
      type: "integer",
    },
  },
});
