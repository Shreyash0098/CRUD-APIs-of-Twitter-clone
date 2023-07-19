const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "twitter",
  password: "your password",
  port: "15432",
});

module.exports = pool;
