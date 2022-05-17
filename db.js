const mysql = require('mysql2');
const util = require("util")

const con = mysql.createConnection({
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

const query = util.promisify(con.query).bind(con);
//table create
exports.tableCreate = async (sql) => {

}

const insertExecution = (sql) => new Promise((resolve,reject)=>{
  try {
    query(sql, (err, result) => {
      if (err) {
        throw err;
      }
      resolve(result)
    });
  } catch (error) {
    console.log(error)
    reject(-1)
  }
})

const findExecution = (sql) => new Promise((resolve, reject) => {
  try {
    query(sql, (err, result) => {
      if (err) {
        throw err;
      }
      //console.log("Update"+result)
      resolve(result)
    });
  } catch (error) {
    console.log(error)
    reject(-1)
  }
});

const updateDeleteExecution = (sql) => new Promise((resolve,reject)=>{
  try {
    query(sql, (err, result) => {
      if (err) {
        throw err;
      }
      //console.log(result)
      resolve(result)
    });
  } catch (error) {
    console.log(error)
    reject(-1)
  }
})

// const updateExecution1 = async (username, password, sql) => {
//   try {
//     // let sql = quary;
//     // execute the insert statment
//     const [id] = con.query(sql, (err, result) => {
//       if (err) console.log(err);
//       resolve(result)
//       //console.log(result.insertId);
//     });

//     con.end();
//     console.log(id)
//     return id
//   } catch (err) {
//     return -1
//   }
// }


// const deleteExecution = async (sql) => {
//   try {
//     // let sql = quary;
//     // execute the insert statment
//     const [id] = con.query(sql, (err, result) => {
//       if (err) console.log(err);
//       //console.log(result.insertId);
//       resolve(result)
//     });

//     con.end();
//     console.log(id)
//     return id
//   } catch (err) {
//     return -1
//   }
// }


module.exports = {
  connectDB,
  con,
  insertExecution,
  updateDeleteExecution,
  findExecution
}