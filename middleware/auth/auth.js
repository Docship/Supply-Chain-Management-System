const jwt = require("jsonwebtoken")
const jwtSecret ='231e07bf113b22fabaca321b96e015aea7e853d91de217d264891f54a3fbce2f2831ea'

 
exports.adminAuth = (req, res, next) => {
  const token = req.cookies.jwt
  if (token) {
    jwt.verify(token, jwtSecret, (err, decodedToken) => {
      if (err) {
        return res.status(401).json({ 
          message: "Not authorized",
          tokenExists:true
        })
      } else {
        if (decodedToken.role !== "ADMIN") {
          return res.status(401).json({ 
            message: "Not authorized",
            tokenExists:true
          })
        } else {
          next()
        }
      }
    })
  } else {
    return res
      .status(401)
      .json({ 
        message: "Not authorized, token not available",
        tokenExists:false
      })
      //rederect to login
  }
}

exports.managerAuth = (req, res, next) => {
    const token = req.cookies.jwt
    if (token) {
      jwt.verify(token, jwtSecret, (err, decodedToken) => {
        if (err) {
          return res.status(401).json({ message: "Not authorized",
          tokenExists:true })
        } else {
          if (decodedToken.role !== "MANAGER") {
            return res.status(401).json({ message: "Not authorized",
            tokenExists:true })
          } else {
            next()
          }
        }
      })
    } else {
      return res
        .status(401)
        .json({ message: "Not authorized, token not available",
        tokenExists:false })
    }
  }

  exports.storekeeperAuth = (req, res, next) => {
    const token = req.cookies.jwt
    if (token) {
      jwt.verify(token, jwtSecret, (err, decodedToken) => {
        if (err) {
          return res.status(401).json({ message: "Not authorized",
          tokenExists:true })
        } else {
          if (decodedToken.role !== "STOREKEEPER") {
            return res.status(401).json({ message: "Not authorized",
            tokenExists:true })
          } else {
            next()
          }
        }
      })
    } else {
      return res
        .status(401)
        .json({ message: "Not authorized, token not available",
        tokenExists:false })
    }
  }

  exports.assistantAuth = (req, res, next) => {
    const token = req.cookies.jwt
    if (token) {
      jwt.verify(token, jwtSecret, (err, decodedToken) => {
        if (err) {
          return res.status(401).json({ message: "Not authorized",
          tokenExists:true })
        } else {
          if (decodedToken.role !== "ASSISTANT") {
            return res.status(401).json({ message: "Not authorized",
            tokenExists:true })
          } else {
            next()
          }
        }
      })
    } else {
      return res
        .status(401)
        .json({ message: "Not authorized, token not available",
        tokenExists:false })
    }
  }