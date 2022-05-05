var mysql = require('mysql');

var con = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'delivery_managemant_system'
});

const connectDB = async () => {
  await con.connect(function (err) {
    if (err) throw err;
    console.log("Database Connected!");
  });
}

module.exports = {connectDB,con}