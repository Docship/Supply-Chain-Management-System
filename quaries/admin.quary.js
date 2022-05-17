exports.insertAdmin = (userId,name)=>{
    return `INSERT INTO administrator SET User_ID = (select User_ID from user where User_ID = "${userId}"), Name = "${name}"`;
}



exports.findAdmin = (userId)=>{
    return `SELECT * FROM administrator WHERE User_ID="${userId}"`
}


exports.findAdminByUserName = (username)=>{
    return `SELECT * FROM administrator WHERE User_ID = (select User_ID from user where Username = "${username}")`
}

// connection.query('SELECT * FROM health_records WHERE dob = ' + connection.escape(req.body.dob), (error, results) => {
//     if (error) throw error;
//     // ...
//   });
  
//   app.post("/auth", function (request, response) {
//     var username = request.body.username;
//     var password = request.body.password;
//     if (username && password) {
//      connection.query(
//       "SELECT * FROM accounts WHERE username = ? AND password = ?",
//       [username, password],
//       function (error, results, fields) {
//        ...
//       }
//      );
//     }
//    });
   













// app.post("/auth", function (request, response) {
//     var username = request.body.username;
//     var password = request.body.password;
//     if (username && password) {
//      connection.query(
//       "SELECT * FROM accounts WHERE username = ? AND password = ?",
//       [username, password],
//       function (error, results, fields) {
//        ...
//       }
//      );
//     }
//    });

// connection.query('SELECT * FROM health_records WHERE dob = ' + connection.escape(req.body.dob), (error, results) => {
//     if (error) throw error;
//     // ...
//   });
  
   
