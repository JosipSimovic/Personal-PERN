const express = require("express");
const bodyParser = require("body-parser");

const webshopRoutes = require("./routes/webshop-routes");

const typeorm = require("typeorm");

// DATABASE
const EntitySchema = typeorm.EntitySchema;

const dataSource = new typeorm.DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "root",
  database: "webshop",
  synchronize: true,
  entities: [require("./database/entity/Product")],
});

dataSource.initialize();

const app = express();

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");
  next();
});
app.use(bodyParser.json());


app.use("/api/webshop", webshopRoutes);

app.listen(5000);
