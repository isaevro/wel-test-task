const Pool = require('pg').Pool
const pool = new Pool({
   user: "postgres",
   password: "jatp123",
   host: "localhost",
   port: 5432,
   database: "wel",
})

module.exports = pool