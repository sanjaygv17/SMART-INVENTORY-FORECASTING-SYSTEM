const express = require("express");

const router = express.Router();

const { predict } = require("../services/mlService");


router.get("/predict-product", async (req, res) => {

    try {

        const product = req.query.product;
        if (!product) {
            return res.status(400).json({
                error: "Product query parameter is required"
            });
        }

        const result = await predict(
            "product",
            product
        );

        res.json(result);

    } catch (error) {

        res.status(500).json({

            error: error.message

        });

    }

});


router.get("/predict-category", async (req, res) => {

    try {

        const category = req.query.category;

        if (!category) {
            return res.status(400).json({
                error: "Category query parameter is required"
        });
        }

        const result = await predict(
            "category",
            category
        );

        res.json(result);

    } catch (error) {

        res.status(500).json({

            error: error.message

        });

    }

});

module.exports = router;