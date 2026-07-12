const express = require("express");

const router = express.Router();

const Stock = require("../models/Stock");

router.get("/", async (req, res) => {

    try {

        const stocks = await Stock.find();

        

        const alerts = stocks.map(stock => {

            let severity = "Healthy";
            let message = "Stock level is sufficient.";

            if (stock.currentStock === 0) {

                severity = "Critical";

                message = "Out of Stock! Restock immediately.";

            }

            else if (stock.currentStock <= stock.reorderLevel) {

                severity = "Warning";

                message = "Stock is below reorder level.";

            }

            return {

                _id: stock._id,

                product: stock.productName,

                currentStock: stock.currentStock,

                reorderLevel: stock.reorderLevel,

                severity,

                message

            };

        });

        res.json({

            success: true,

            count: alerts.length,

            data: alerts

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