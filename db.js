const mysql = require('mysql');
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




const insertExecutionDummy = (sql,vars) => new Promise((resolve, reject) => {
  try {
    con.query(sql, vars, (err, result) => {
      if (err) {
        resolve(-1)
        console.log(err)
        // reject(err.sqlMessage)
        //throw err;
      }
      resolve(result)
    });
  } catch (error) {
    console.log(error)
    reject(-1)
  }
})


const insertExecution = (sql,) => new Promise((resolve, reject) => {
  try {
    con.query(sql, (err, result) => {
      if (err) {
        resolve(-1)
        console.log(err)
        // reject(err.sqlMessage)
        //throw err;
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
    con.query(sql, (err, result) => {
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

const updateDeleteExecution = (sql) => new Promise((resolve, reject) => {
  try {
    con.query(sql, (err, result) => {
      if (err) {
        resolve(-1);
      }
      //console.log(result)
      resolve(result)
    });
  } catch (error) {
    console.log(error)
    reject(-1)
  }
})

const transactionExecutionInsert = (sql_1, sql_2) => new Promise((resolve, reject) => {
  try {
    con.beginTransaction(function (err) {
      if (err) {
        throw err;
      }
      query(sql_1, function (error, results, fields) {
        if (error) {
          return con.rollback(function () {
            throw error;
          });
        }
        con.query(sql_2,function (error, results, fields) {
          if (error) {
            return con.rollback(function () {
              console.log("error passed here2222222")
              throw error.sqlMessage;
            });
          }
          con.commit(function (err) {
            if (err) {
              return con.rollback(function () {
                throw err;
              });
            }
            console.log('success!');
            resolve(1)
          });
        });
      });
    });
  } catch (error) {
    console.log("error passed here")
    throw error
  }
})

const transactionExecutionUpdate = (sql_1, sql_2,userId) => new Promise((resolve, reject) => {
  try {
    con.beginTransaction(function (err) {
      if (err) {
        throw err;
      }
      query(sql_1, function (error, results, fields) {
        if (error) {
          return con.rollback(function () {
            throw error;
          });
        }

        if (results.length != 0) {
          con.query(sql_2, function (error, results, fields) {
            if (error) {
              return con.rollback(function () {
                throw error;
              });
            }
            con.commit(function (err) {
              if (err) {
                return con.rollback(function () {
                  throw err;
                });
              }
              console.log('success!');
              resolve(true)
            });
          });
        }else{
          resolve(true)
        }
      });
    });
  } catch (error) {

  }
})

module.exports = {
  connectDB,
  con,
  insertExecution,
  updateDeleteExecution,
  findExecution,
  transactionExecutionInsert,
  transactionExecutionUpdate,
  insertExecutionDummy
}