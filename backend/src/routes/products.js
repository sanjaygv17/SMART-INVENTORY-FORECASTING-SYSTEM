const express = require("express");
const router = express.Router();

const Product = require("../models/Product");

router.post("/", async (req, res) => {

    try {

        const product = new Product(req.body);

        const savedProduct = await product.save();

        res.status(201).json({
            success: true,
            message: "Product created successfully",
            data: savedProduct
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

});

router.get("/", async (req, res) => {

    try {

        const { search } = req.query;

        let query = {};

        if (search) {
            query.productName = {
                $regex: search,
                $options: "i"
            };
        }

        const products = await Product.find(query)
            .limit(10);

        res.json({
            success: true,
            data: products
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

});
router.put("/:id", async (req, res) => {

    try {

        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!updatedProduct) {

            return res.status(404).json({
                success: false,
                message: "Product not found"
            });

        }

        res.json({
            success: true,
            message: "Product updated successfully",
            data: updatedProduct
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

});

module.exports = router;