const express = require("express");

const router = express.Router();

const {

    getSeasonality

} = require("../controllers/analyticsController");

router.get(

    "/seasonality/:product",

    getSeasonality

);

module.exports = router;