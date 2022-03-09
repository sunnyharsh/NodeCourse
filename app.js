const express = require("express");
const app = express();
const AppError = require("./utils/appError");
const globalErrorHandler = require("./controllers/errorController");

app.get("/getData", (req, res, next) => {
  res.status(200).json({
    status: "success",
    msg: "api hit successful",
  });
});
app.all("*", (req, res, next) => {
  next(new AppError(`can't find ${req.originalUrl} on this server`, 400));
});
app.listen(1234, () => {
  let path = __dirname + "/views/pages/index.ejs";
  console.log("server start on 1234");
});
app.use(globalErrorHandler);
