const express = require("express");
const mongoose = require("mongoose");
const dotenv = require('dotenv')
const app = express();

const AppError = require("./utils/appError");
const globalErrorHandler = require("./controllers/globalErrorController");
const adminRoute = require("./routes/admin.routes");

dotenv.config({ path: "./config.env" })

const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DB_PWD);

console.log(DB)
mongoose.set("strictQuery", false);
mongoose.connect(DB,{
  useNew
})

app.use("/api/v1", adminRoute)

app.all("*", (req, res, next) => {
  next(new AppError(`can't find ${req.originalUrl} on this server`, 400));
});

app.listen(1234, () => {
  console.log("server start on 1234");
});

app.use(globalErrorHandler);
