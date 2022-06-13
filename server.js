const express = require("express")
const cookieParser = require("cookie-parser");
const app = express()
app.use(express.json())
app.use(cookieParser())
const {connectDB} = require("./db");

//Connecting the Database
connectDB();

// const { adminAuth, userAuth } = require("./middleware/auth/auth");

// app.get("/admin", adminAuth, (req, res) => res.send("Admin Route"));
// app.get("/basic", userAuth, (req, res) => res.send("User Route"));
app.use("/login",require("./routes/login.js"))
app.use("/admin", require("./routes/admin.js"))
app.use('/manager',require('./routes/manager.js'))
app.use('/storekeeper',require('./routes/storekeeper.js'))

app.use((req, res, next) => {
  const error = new Error("Not found");
  error.status = 404;
  next(error);
});

// app.use("/assistant",require("./routes/assistant.js"))

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
