const express = require("express")
const cookieParser = require("cookie-parser");

const cors = require("cors");

const app = express()
app.use(express.json())
app.use(cookieParser())
const {connectDB} = require("./db");
require('dotenv').config()

//Connecting the Database
connectDB();

app.use(cors({origin:process.env.CLIENT, credentials:true}));

app.use((req, res, next) => {
  console.log(req.headers['authorization'])
  res.header("Access-Control-Allow-Origin",process.env.CLIENT);
  res.header('Access-Control-Allow-Credentials', true)
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});


app.use("/login",require("./routes/login.js"))
app.use("/admin", require("./routes/admin.js"))
app.use('/manager',require('./routes/manager.js'))
app.use('/storekeeper',require('./routes/storekeeper.js'))
app.use("/assistant",require("./routes/assistant.js"))

app.use((req, res, next) => {
  console.log(req.path)
  const error = new Error("Not found");
  error.status = 404;
  next(error);
});

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
