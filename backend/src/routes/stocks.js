const express = require("express");

const router = express.Router();

const Stock = require("../models/Stock");

router.get("/", async (req, res) => {

    try {

        const stocks = await Stock.find();

        res.json({

            success: true,

            count: stocks.length,

            data: stocks

        });

    }

    catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

});

module.exports = router;