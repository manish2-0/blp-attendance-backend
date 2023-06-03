const mysql = require('mysql')
const connection = mysql.createConnection({
   host: process.env.DB_HOST,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
   database: process.env.DB_DBNAME

  // host: "localhost",
  // user: "root",
  // password: "",
  // database: "attendance"
})

connection.connect();

exports.connection = connection;