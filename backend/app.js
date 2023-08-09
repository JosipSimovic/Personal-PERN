const express = require("express");
const bodyParser = require("body-parser");

const webshopRoutes = require("./routes/webshop-routes");

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

// ROUTES //
app.use("/api/webshop", webshopRoutes);

app.listen(5000);
