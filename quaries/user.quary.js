//insert user
exports.insertUser = (userId,username,password)=>{
    return `INSERT INTO user(User_ID,Username,Password) VALUES("${userId}","${username}","${password}")`;
}

exports.insertAdmin = (userId,username,password,name)=>{
    let sql =  `START TRANSACTION;INSERT INTO user(User_ID,Username,Password) VALUES("${userId}","${username}","${password}");INSERT INTO administrator SET User_ID = (select User_ID from user where User_ID = "${userId}"), Name = "${name}";COMMIT;`
    return sql.replace(/(\r\n|\n|\r)/gm, "");
}
//find user

//delete user
exports.deleteUser = (username)=>{
    return `DELETE FROM user WHERE Username = "${username}")`
}

exports.findUser = (username)=>{
    return `SELECT * FROM user WHERE Username="${username}"`
}

exports.findUserByUserId = (userId)=>{
    return `SELECT * FROM user WHERE User_ID="${userId}"`
}


exports.deleteUserAccount= (username)=>{
    return `DELETE FROM user WHERE Username="${username}"`
}

