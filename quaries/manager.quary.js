exports.findManagerByUserName = ()=>{
    return 'SELECT * FROM staff_member WHERE User_ID = (select User_ID from user where Username = ?)'
}
exports.findManagerByUserId = (username)=>{
    return `SELECT * FROM staff_member WHERE User_ID ="${username}"`
}

//insert manager
exports.insertManager = ()=>{
    return 'INSERT INTO staff_member SET User_ID = ?, First_Name = ?,Last_Name = ?,Role = ?)';
}

//delete manager
exports.deleteManager = ()=>{
    return 'DELETE FROM staff_member WHERE User_ID =?'
}

//update manager
exports.updateManagerSQL = ()=>{
    return 'UPDATE staff_member SET First_Name = ?,Last_Name = ?,role=? WHERE User_ID =(SELECT User_ID from user WHERE Username = ?)'
}
exports.getManagers = ()=>{
    return 'SELECT * FROM staff_member'
}