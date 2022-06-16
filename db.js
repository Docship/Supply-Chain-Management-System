const mysql = require('mysql');
const util = require("util")
require('dotenv').config()
// console.log(process.env)


const con = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PWD,
  database: process.env.DB_NAME
});

// const con = mysql.createConnection({
//   host: 'localhost',
//   user: 'root',
//   password: '',
//   database: 'delivery_managemant_system'
// });

const connectDB = async () => {
  await con.connect(function (error) {
    if (error) throw error;
    console.log("Database Connected!");
  });
}

const insertExecution = (sql, vars) => new Promise((resolve, reject) => {
  let res = {
    status: 200,
    message: "success",
    result: ""
  }
  try {
    con.query(sql, vars, (error, result, fields) => {
      if (error) {
        console.log(error)
        res.status = 404
        res.message = "failed"
        reject(res)
        return
      }
      res.result = result
      resolve(res)
    });
  } catch (error) {
    console.log(error)
    res.status = 404
    res.message = "failed"
    reject(res)
  }
})

const findExecution = (sql, vars) => new Promise((resolve, reject) => {
  let res = {
    status: 200,
    result: "success",
    result: ""
  }
  try {
    con.query(sql, vars, (error, result) => {
      if (error) {
        console.log(error)
        res.status = 404
        res.message = "failed"
        reject(res)
        return
      }
      res.result = result
      resolve(res)
    });
  } catch (error) {
    console.log(error)
    res.status = 404
    res.message = "failed"
    reject(res)
  }
});

const updateDeleteExecution = (sql, vars) => new Promise((resolve, reject) => {
  let res = {
    status: 200,
    message: "success",
    result: ""
  }
  try {
    con.query(sql, vars, (error, result) => {
      if (error) {
        console.log(error)
        res.status = 404
        res.message = "failed"
        reject(res)
        return
      }
      res.result = result
      resolve(res)
    });
  } catch (error) {
    console.log(error)
    res.status = 404
    res.message = "failed"
    reject(res)
  }
})

const transactionExecutionInsert = (sql_1, sql_2, userVars, roleVars) => new Promise((resolve, reject) => {
  let res = {
    status: 200,
    message: "success",
    result: ""
  }
  const sql1 = mysql.format(sql_1, userVars)
  const sql2 = mysql.format(sql_2, roleVars)
  try {
    con.beginTransaction(function (error) {
      if (error) {
        console.log(error)
        res.status = 404
        res.message = "failed"
        reject(res)
      }
      con.query(sql1, function (error, results, fields) {
        if (error) {
          return con.rollback(function () {
            console.log(error)
            res.status = 404
            res.message = "failed"
            reject(res)
          });
        }
        con.query(sql2, function (error, results, fields) {
          if (error) {
            return con.rollback(function () {
              console.log(error)
              res.status = 404
              res.message = "failed"
              reject(res)
            });
          }
          con.commit(function (error) {
            if (error) {
              return con.rollback(function () {
                console.log(error)
                res.status = 404
                res.message = "failed"
                reject(res)
              });
            }
            console.log('success!');
            res.result = results
            resolve(res)
          });
        });
      });
    });
  } catch (error) {
    console.log(error)
    res.status = 404
    res.message = "failed"
    reject(res)
  }
})

const transactionExecutionUpdate = (sql_1, sql_2, username) => new Promise((resolve, reject) => {
  let res = {
    status: 200,
    message: "success",
    result: ""
  }
  try {
    con.beginTransaction(function (error) {
      if (error) {
        console.log(error)
        res.status = 404
        res.message = "failed"
        resolve(res)
      }
      con.query(sql_1, username, function (error, results, fields) {
        if (error) {
          return con.rollback(function () {
            console.log(error)
            res.status = 404
            res.message = "failed"
            resolve(res)
          });
        }


        con.query(sql_2, username, function (error, results, fields) {
          if (error) {
            return con.rollback(function () {
              console.log(error)
              res.status = 404
              res.message = "failed"
              resolve(res)
            });
          }
          con.commit(function (error) {
            if (error) {
              return con.rollback(function () {
                console.log(error)
                res.status = 404
                res.message = "failed"
                resolve(res)
              });
            }
            console.log('success!');
            console.log(fields)
            res.result = results
            resolve(res)
          });
        });
      });
    });
  } catch (error) {
    console.log(error)
    res.status = 404
    res.message = "failed"
    resolve(res)
  }
})

const transactionExecutionDelete = (sql_1, sql_2, username) => new Promise((resolve, reject) => {
  let res = {
    status: 200,
    message: "success",
    result: ""
  }
  try {
    con.beginTransaction(function (error) {
      if (error) {
        console.log(error)
        res.status = 404
        res.message = "failed"
        resolve(res)
      }
      con.query(sql_1, username, function (error, results, fields) {
        if (error) {
          return con.rollback(function () {
            console.log(error)
            res.status = 404
            res.message = "failed"
            resolve(res)
          });
        }
          con.query(sql_2, username, function (error, results, fields) {
            if (error) {
              return con.rollback(function () {
                console.log(error)
                res.status = 404
                res.message = "failed"
                resolve(res)
              });
            }
            con.commit(function (error) {
              if (error) {
                return con.rollback(function () {
                  console.log(error)
                  res.status = 404
                  res.message = "failed"
                  resolve(res)
                });
              }
              console.log('success!');
              console.log(fields)
              res.result = results
              resolve(res)
            });
          });
        
      });
    });
  } catch (error) {
    console.log(error)
    res.status = 404
    res.message = "failed"
    resolve(res)
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
  transactionExecutionDelete
}

