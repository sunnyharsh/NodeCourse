const express = require('express');
const mongoose = require("mongoose");
const dotenv = require('dotenv')
dotenv.config({ path: "./config.env" })
var bodyParser = require('body-parser')

const AppError = require("./utils/appError");
const globalErrorHandler = require("./controllers/globalErrorController");
const adminRoute = require("./routes/admin.routes");
const tourRoute = require("./routes/tour.routes");

const app = express();
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())



const PORT = process.env.PORT || 5001;
const URI = process.env.DATABASE.replace('<PASSWORD>', process.env.DB_PWD);

mongoose.set('strictQuery', true);
const connectionParams = {
  useNewUrlParser: true,
  useUnifiedTopology: true
}
mongoose.connect(URI, connectionParams)
  .then(con => {
    console.log("database connected")
  }).catch(err => {
    console.error(err)
  })

//routes
app.use("/api/v1", adminRoute);
app.use("/api/v1/tour", tourRoute);


app.all("*", (req, res, next) => {
  next(new AppError(`can't find ${req.originalUrl} on this server`, 400));
});

app.listen(PORT, () => {
  console.log(`server start on ${PORT}`);
});

app.use(globalErrorHandler);
