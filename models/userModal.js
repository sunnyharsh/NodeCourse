const mongoose = require("mongoose");

const userScehma = new mongoose.Schema({
    name: {
        type: String,
        required:[true, "name is required"]
    },
    rating: {
        type: Number,
        default:4.5
    },
    age: {
        type:Number
    }
})

const User = mongoose.model('User', userScehma);
module.exports = User;