const express = require('express');
const { getUser, saveUser } = require("../controllers/adminRouteController");

const router = express.Router();

router.route("/userData")
    .get(getUser)
    .post(saveUser)

module.exports = router;