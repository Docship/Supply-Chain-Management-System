exports.insertAdmin = (userId,name)=>{
    return `INSERT INTO administrator SET User_ID = (select User_ID from user where User_ID = "${userId}"), Name = "${name}"`;
}

exports.findAdmin = (userId)=>{
    return `SELECT * FROM administrator WHERE User_ID="${userId}"`
}


exports.findAdminByUserName = ()=>{
    return 'SELECT * FROM administrator WHERE User_ID = (select User_ID from user where Username = ?)'
}













