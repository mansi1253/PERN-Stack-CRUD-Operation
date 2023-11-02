const Pool = require("pg").Pool;

const pool = new Pool({
  user: "postgres",
  host: "",
  database: "product",
  password: "mansi12",
  port: 5432,
});

module.exports = {
    pool
}