const mongoose = require("mongoose");
const fs = require('fs')
const dotenv = require('dotenv')
dotenv.config({ path: "./config.env" })
const Tour = require("../models/tourModal")
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
const tours = JSON.parse(fs.readFileSync(`${__dirname}/tours-sample.json`, 'utf-8'));

const importData = async () => {
    try {
        await Tour.create(tours);
        console.log("success")
    }
    catch (err) {
        console.log(err);
    }
    process.exit()
}
const deleteData = async () => {
    try {
        await Tour.deleteMany();
        console.log("delete data success")
    }
    catch (err) {
        console.log(err);
    }
    process.exit()
}
if (process.argv[2] === '--import') {
    importData()
}
if (process.argv[2] === '--delete') {
    deleteData()
}
console.log(process.argv)

// command for run import and delete
// node devData/import-dev-data.js --import