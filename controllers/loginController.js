const dbConnection = require("../db.js");
const userQuary = require("../quaries/user.quary.js");
const adminQuary = require("../quaries/admin.quary.js");
const managerQuary = require("../quaries/manager.quary.js");
const assistantQuary = require("../quaries/assistant.quary.js");
const storekeeperQuary = require("../quaries/storekeeper.quary.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const jwtSecrete =
  "231e07bf113b22fabaca321b96e015aea7e853d91de217d264891f54a3fbce2f2831ea";

exports.login = async (req, res, next) => {
  const {
    username,
    password,
    // role
  } = req.body;
  // Check if username and password is provided
  //console.log(username, password)
  if (!username || !password) {
    return res.status(400).json({
      message: "Username Password not present",
      isLogged: false,
    });
  }

  const vars = [username];

  const sql = userQuary.findUser();
  const userResult = await dbConnection.findExecution(sql, vars);

  if (userResult.status != 200) {
    res.status(result.status).json({
      message: "Login not successful",
    });
    return;
  }
  if (userResult.result.length == 0) {
    res.status(400).json({
      message: "User not found",
    });
    return;
  }
  console.log(userResult.result[0].Role);

  const userId = userResult.result[0].User_ID;
  const userRole = userResult.result[0].Role;
  try {
    bcrypt.compare(password, userResult.result[0].Password).then((result) => {
      if (result) {
        const maxAge = 3 * 60 * 60;
        const token = jwt.sign(
          {
            id: userId,
            username: username,
            role: userRole,
          },
          jwtSecrete,
          {
            expiresIn: maxAge, // 3hrs in sec
          }
        );
        res.cookie("jwt", token, {
          httpOnly: true,
          maxAge: maxAge * 1000, // 3hrs in ms
        });
        // console.log(token)
        res.status(200).json({
          message: "User successfully Logged in",
          user: { username: username, userId: userId, role: userRole },
          token:token
        });
      } else {
        res.status(400).json({
          message: "Login not succesful",
          user: userId,
        });
      }
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "An error occurred",
    });
  }
};
