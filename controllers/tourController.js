const catchAsync = require("../utils/catchAsync");
const Tour = require("../models/tourModal");
const { query } = require("express");

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

        // BUILD QUERY
        // 1A.) filtering
        const queryObj = { ...req.query };
        const excludedFields = ['page', 'sort', 'limit', 'fields'];
        excludedFields.forEach(el => delete queryObj[el]);

        // 1B.) advanced Filtering
        let queryStr = JSON.stringify(queryObj);
        queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);
        let query = Tour.find(JSON.parse(queryStr));

        // 2.) sorting
        if (req.query.sort) {
            const sortBy = req.query.sort.split(',').join(' ')
            query = query.sort(sortBy);
        } else {
            query = query.sort('-createdAt');
        }

        // 3.) Field Query
        if (req.query.fields) {
            const fields = req.query.fields.split(',').join(' ');
            query = query.select(fields)
        } else {
            query = query.select('-__v')
        }

        const tours = await query;

        // const tours = await Tour.find()
        //     .where('duration')
        //     .equals(8)
        //     .where('difficulty')
        //     .equals('easy');
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