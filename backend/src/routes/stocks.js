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

router.get("/product/:productName", async (req, res) => {

    try {

        const stock = await Stock.findOne({

            productName: req.params.productName

        });

        if (!stock) {

            return res.status(404).json({

                success: false,

                message: "Stock not found"

            });

        }

        res.json({

            success: true,

            data: stock

        });

    }

    catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

})

module.exports = router;