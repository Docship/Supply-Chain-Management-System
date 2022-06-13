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

exports.createUserDummy = async (req, res, details, role) => {

    const userSql = userQuary.findUser(details.username);

    let results = await dbConnection.findExecution(userSql);
    if (results.length != 0) {
        res.status(400).json({
            message: "Username already exists",
        });
        return
    }

    try {
        const userId = uniqid();
        let hash = await bcrypt.hash(details.password, 10);
        const userSql = userQuary.insertUser(userId, details.username, hash, role);
        var roleSql = ''
        switch (role) {
            case "MANAGER":
                roleSql = managerQuary.insertManager(userId, details.fName, details.lName, details.managerRole)
                break;
            case "STOREKEEPER":
                roleSql = storekeeperQuary.insertStorekeeper(userId, details.fName, details.lName)
                break;
            case "ASSISTANT":
                roleSql = assistantQuary.insertAssistant(userId, details.fName, details.lName)
                break;
            default:
                return res.status(400).json({
                    message: "Wrong role type",
                });
        }
        console.log(details)
        console.log(userSql, roleSql)
        try {
            const result = await dbConnection.transactionExecutionInsert(userSql, roleSql)
            res.status(200).json({
                message: "Success"
            })
        } catch (error) {
            console.log("i got here")
            res.status(401).json({
                message: "failed",
                erorr: error
            })
        }

    } catch (error) {
        console.log(error)
        return res.status(401).json({
            message: "error occured",
        });
    }
};


exports.createUserAccount = async (req, res, username, password, role) => {
    //console.log(username, password, role, name)
    if (!validator.isEmail(username)) {
        res.status(400).json({
            message: "wrong username format ",
        });
        return -1;
    }
    const userSql = userQuary.findUser(username);
    const userId = uniqid();

    let results = await dbConnection.findExecution(userSql);
    if (results.length != 0) {
        res.status(400).json({
            message: "Username already exists",
        });
        return -1;
    } else {
        if (password.length < 6) {
            res.status(400).json({
                message: "Password less than 6 characters",
            });
            return -1;
        }
        try {
            let hash = await bcrypt.hash(password, 10);
            const sql = userQuary.insertUser(userId, username, hash, role);
            let result = await dbConnection.insertExecution(sql);

            return userId;
        } catch (error) {
            res.status(401).json({
                message: "error occured",
            });
            return -1;
        }
    }
    //return userId
};

exports.deleteUserAccount = async (username) => {
    const userSql = userQuary.findUser(username);
    try {
        const sql = userQuary.deleteUserAccount(username);
        //console.log(sql)
        let result = await dbConnection.updateDeleteExecution(sql);
        return result;
    } catch (error) {
        console.log("user account deletion failed");
        return -1;
    }
};

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