const Pool = require("pg").Pool;

const types = require("pg").types;

types.setTypeParser(types.builtins.NUMERIC, (val) => {
  return Number(val);
});

const pool = new Pool({
  user: "postgres",
  host: "webshop-project.czgcidl0q2rb.eu-central-1.rds.amazonaws.com",
  port: 5432,
  password: "personalwebshop",
  database: "webshop",
  ssl: {
    rejectUnauthorized: false,
  },
});

module.exports = pool;
