const express = require("express");
const { getUser } = require("../controllers/adminRouteController");

const adminRoute = express.Router();

adminRoute.get("/userData", getUser);

module.exports = adminRoute;