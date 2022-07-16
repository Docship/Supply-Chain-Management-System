const dbConnection = require("../db.js");
const userQuary = require("../quaries/user.quary.js");
const adminQuary = require("../quaries/admin.quary.js");
const managerQuary = require("../quaries/manager.quary.js")
const storekeeperQuary = require("../quaries/storekeeper.quary.js")
const assistantQuary = require("../quaries/assistant.quary.js")
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const jwtSecrete =
    "231e07bf113b22fabaca321b96e015aea7e853d91de217d264891f54a3fbce2f2831ea";

const uniqid = require("uniqid");
const res = require("express/lib/response");
var validator = require("validator");

exports.createUser = async (req, res, details, role) => {

    const userFindSql = userQuary.findUser();

    let results = await dbConnection.findExecution(userFindSql, [details.username]);
    if ((results.status != 200)) {
        res.status(404).json({
            message: "error"
        })
        return
    }
    if ((results.result.length != 0)) {
        res.status(400).json({
            message: "usename exists"
        })
        return
    }
    const userId = uniqid();
    console.log(role)
    try {
        let hash = await bcrypt.hash(details.password, 10);
        const userSql = userQuary.insertUser();
        const userVars = [userId, details.username, hash, role]
        let roleSql = ''
        let roleVars = []
        switch (role) {
            case "MANAGER":
                roleSql = managerQuary.insertManager()
                roleVars = [userId, details.fName, details.lName, details.managerRole]
                break;
            case "STOREKEEPER":
                roleSql = storekeeperQuary.insertStorekeeper()
                roleVars = [userId, details.fName, details.lName, details.city]
                break;
            case "ASSISTANT":
                roleSql = assistantQuary.insertAssistant()
                roleVars = [userId, details.fName, details.lName]
                break;
            default:
                res.status(400).json({
                    message: "Wrong role type",
                });
                return
        }

        console.log(details)
        console.log(userSql, roleSql)

        const result = await dbConnection.transactionExecutionInsert(userSql, roleSql, userVars, roleVars)

        if (result.status != 200) {
            res.status(result.status).json({
                message: result.message
            })
            console.log(67)
            return
        }
        res.status(result.status).json({
            message: result.message
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: "an error occured"
        })
        console.log(80)
    }
};



exports.deleteUserAccount = async (req, res, userId, role) => {
    const userFindSql = userQuary.findUserByUserId();
    const user = await dbConnection.findExecution(userFindSql, [userId])
    if (user.status != 200) {
        res.status(result.status).json({
            message: "error"
        })
        return
    }
    if (user.result.length == 0) {
        res.status(400).json({
            message: "user not exists"
        })
        return
    }
    let roleSql = ''
    switch (role) {
        case "MANAGER":
            roleSql = managerQuary.deleteManager()
            break;
        case "STOREKEEPER":
            roleSql = storekeeperQuary.deleteStorekeeper()
            break;
        case "ASSISTANT":
            roleSql = assistantQuary.deleteAssistant()
            break;
        default:
            res.status(400).json({
                message: "Wrong role type",
            });
            return
    }
    // const userSql = userQuary.deleteUser()
    const result = await dbConnection.transactionExecutionDelete(roleSql, [userId])
    console.log(result)
    if (result.status != 200) {
        res.status(result.status).json({
            message: result.message
        })
        return
    }
    res.status(200).json({
        message: result.message
    })
}


exports.findUserAccount = async (username) => {
    const sql = userQuary.findUser(username);
    let result = dbConnection.findExecution(sql);
    //console.log(result)
    if (result.length != 0) {
        console.log(result);
        return true;
    } else {
        res.status(400).json({
            message: "Username not exists",
        });
        return false;
    }
};