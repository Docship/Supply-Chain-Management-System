const express = require("express")
const cookieParser = require("cookie-parser");
const app = express()
app.use(express.json())
app.use(cookieParser())
const {connectDB} = require("./db");
require('dotenv').config()

//Connecting the Database
connectDB();

app.use("/login",require("./routes/login.js"))
app.use("/admin", require("./routes/admin.js"))
app.use('/manager',require('./routes/manager.js'))
app.use('/storekeeper',require('./routes/storekeeper.js'))
app.use("/assistant",require("./routes/assistant.js"))

app.use((req, res, next) => {
  const error = new Error("Not found");
  error.status = 404;
  next(error);
});


const PORT = process.env.PORT || 5000

const server = app.listen(PORT, () =>
  console.log(`Server Connected to port ${PORT}`)
)

// Handling Error
process.on("unhandledRejection", err => {
  //console.log("server err")
  console.log(`An error occurred: ${err.message}`)
  server.close(() => process.exit(1))
})