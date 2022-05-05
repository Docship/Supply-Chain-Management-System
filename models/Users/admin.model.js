const mysql = require('mysql');
const {
    con
} = require('../../db.js');

// insert statment
exports.insertAdmin = async (username, password) => {
    try {
        let sql = `INSERT INTO admin(username,password) VALUES("${username}","${password}")`;
        // execute the insert statment
        const [id] = con.query(sql,(err, result)=> {
            if (err) console.log(err);
            console.log(result.insertId);
          });
        
        con.end();
        console.log(id)
        return id
    } catch (err) {
        return -1
    }
}