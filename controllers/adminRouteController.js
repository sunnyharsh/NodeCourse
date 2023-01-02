const catchAsync = require("../utils/catchAsync");
const User=require("../models/userModal")

exports.getUser = catchAsync(async (req, res, next) => {
    try {
        const userData = await User.find();
        res.status(201).json
    } catch (err) {
        res.status(404).json({
            msg: 'error',
            status: "fail"
        })
    }
})

exports.saveUser = async (req, res) => {
    console.log("req", req)
    try {
        const newUser = await User.create(req.body);
        res.status(201).json({
            data: newUser,
            message:"user created successfully"
        })
    } catch (err) {
        res.status(400).json({
            status:'fail',
            message:'Invalid data sent'
        })
    }
}