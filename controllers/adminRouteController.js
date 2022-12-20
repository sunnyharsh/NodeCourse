const catchAsync = require("../utils/catchAsync");

exports.getUser = catchAsync(async (req, res, next) => {
    try {
        var data = { name: "sunny", age: 28, salary: 97000 };
        res.status(200).json({ data })
    } catch (err) {
        res.status(404).json({
            msg: 'error',
            status: "fail"
        })
    }
})

