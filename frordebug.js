const Admin = require("./quaries/admin.quary.js")
const User = require("./quaries/user.quary.js")
const controllerss=require("./controllers/adminController.js")
const dbConnection = require("./db.js")
const bcrypt = require("bcryptjs")


async function name(params) {
    const username = "admin"
    const password = "123456"
    const userSql=User.isUsernameExists(username)
    await dbConnection.readExecution(userSql).then(devices => { 
        console.log(devices)
    })

    // dbConnection.readExecution(userSql).then(result=>{
    //     console.log(result)
    // })
    console.log("3")
    if (resultUser) {
        console.log("user exists")
        return
    }
    if (password.length < 6) {
        console.log("password not enough")
    }
    try {
        bcrypt.hash(password, 10).then(async (hash) => {
            const sql= User.insertUser(username,hash)
            const userId =await dbConnection.insertExecution(sql) 

        })
    } catch (error) {
        console.log("baby i got you")
    }
}
dbConnection.connectDB()
controllerss.createAdminAccount("asd","asa","as")
