const catchAsync = require("../utils/catchAsync");
const Tour = require("../models/tourModal");
const APIFeatures = require("../utils/apiFeatures");
const { query } = require("express");
const AppError = require("../utils/appError");

// middleware
exports.aliasTopTours = catchAsync(async (req, res, next) => {
    req.query.limit = 5;
    req.query.sort = '-ratingsAverage,price';
    req.query.fields = 'name,price,ratingsAverage,summary,difficulty';
    next();
})


// createTour
exports.createTour = catchAsync(async (req, res, next) => {
    try {
        const newTour = await Tour.create(req.body);
        res.status(201).json({
            status: "success1",
            data: {
                tour: newTour
            }
        })
    } catch (error) {
        res.status(404).json({
            message: error,
            status: "fail"
        })
    }

})

//get tour by id
exports.getTour = catchAsync(async (req, res, next) => {
    console.log("req.params.id", req.params.id)
    try {
        const tour = await Tour.findById(req.params.id);
        res.status(200).json({
            status: 'sucess',
            data: {
                tour
            }
        })
    } catch (err) {
        res.status(404).json({
            msg: err,
            status: "fail"
        })
    }
})

// get all tour from database
exports.getAllTour = catchAsync(async (req, res, next) => {
    try {
        // EXECUTE QUERY
        const fetaures = new APIFeatures(Tour.find(), req.query)
            .filter()
            .sort()
            .limitFields()
            .paginate();
        const tours = await fetaures.query;

        res.status(200).json({
            status: 'sucess',
            results: tours.length,
            data: {
                tours
            }
        })
    } catch (error) {
        res.status(404).json({
            msg: error,
            status: "fail"
        })
    }
})

// get all tour from database
exports.updateTour = catchAsync(async (req, res, next) => {
    try {
        const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });
        res.status(200).json({
            status: 'sucess',
            data: {
                tour
            }
        })
    } catch (error) {
        res.status(404).json({
            msg: error,
            status: "fail"
        })
    }
})

// delete from database
exports.deleteTour = catchAsync(async (req, res, next) => {
    try {
        const newTour = await Tour.findByIdAndDelete(req.params.id);
        res.status(201).json({
            status: "success",
            message: "data succefully deleted",
            data: {
                tour: newTour
            }
        })
    } catch (error) {
        res.status(404).json({
            msg: error,
            status: "fail"
        })
    }
})