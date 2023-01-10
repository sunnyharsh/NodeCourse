const express = require('express');
const {
    createTour,
    getTour,
    getAllTour,
    updateTour,
    deleteTour,
    aliasTopTours,
    getTourStats,
    getMonthlyPlan
} = require("../controllers/tourController");

const router = express.Router();

router.route("/top-5-cheap")
    .get(aliasTopTours, getAllTour);

router.route("/tour-stats")
    .get(getTourStats);

router.route("/monthly-plan/:year")
    .get(getMonthlyPlan);

router
    .route("/")
    .get(getAllTour)
    .post(createTour)

router
    .route("/:id")
    .get(getTour)
    .patch(updateTour)
    .delete(deleteTour)

module.exports = router;