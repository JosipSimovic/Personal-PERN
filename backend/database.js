const { Pool } = require("pg");

const types = require("pg").types;

types.setTypeParser(types.builtins.NUMERIC, (val) => {
  return Number(val);
});

// Create a PostgreSQL connection pool
const pool = new Pool({
  connectionString:
    "postgres://monkogry:b71r6_yvy0CRfP8MgHv9wcd2J411JUGF@snuffleupagus.db.elephantsql.com/monkogry",
});

// Test the database connection
pool.connect((err, client, done) => {
  if (err) {
    console.error("Error connecting to the database", err);
  } else {
    console.log("Connected to the database");
  }
});

module.exports = pool;
