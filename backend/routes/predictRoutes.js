const express = require("express");

const router = express.Router();

router.post("/predict", (req, res) => {

    const { product } = req.body;

    res.json({
        success: true,
        product: product,
        prediction: "Dummy Prediction"
    });

});

module.exports = router;