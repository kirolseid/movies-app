process.on("uncaughtException", (err) => {
  console.log("uncaughtException", err);
});

const express = require("express");
const app = express();
var cookieParser = require('cookie-parser')

app.use(cookieParser())
require("dotenv").config({ path: "./config/.env" });

const port = process.env.PORT || 4000;
const { dbConnection } = require("./src/database/dbconnection");
var morgan = require("morgan");
const globalMiddlewareErr = require("./src/utils/globalMiddlewareErr");
const AppError = require("./src/utils/AppError");



// middleware
app.use(express.json());
if (process.env.MODE_ENV == "development") {
  app.use(morgan("dev"));
}

app.use("/api/v1/movies", require("./src/routes/movies.routes"));
app.use("/api/v1/watchlist", require("./src/routes/user.routes"));

app.all("*", (req, res, next) => {
  next(
    new AppError(`can't find this route: ${req.originalUrl} on server`, 404)
  );
});

// global error handling middleware
app.use(globalMiddlewareErr);


dbConnection();
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
process.on("unhandledRejection", (err) => {
  console.log("unhandledRejection", err);
});
module.exports=app
