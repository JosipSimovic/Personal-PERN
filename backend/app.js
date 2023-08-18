const express = require("express");
const bodyParser = require("body-parser");

const webshopRoutes = require("./routes/webshop-routes");
const userRoutes = require("./routes/user-routes");

const app = express();

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization, admin_id"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");
  next();
});

app.use(bodyParser.json());

// ROUTES //
app.use("/api/webshop", webshopRoutes);
app.use("/api/user", userRoutes);

app.use((error, req, res, next) => {
  res.status(error.code || 500);
  res.json({ message: error.message || "An unknown error ocurred." });
});

app.listen(5000);
