const express = require("express");
const router = express.Router();

const Product = require("../models/Product");
const Transaction = require("../models/Transaction");
const Stock = require("../models/Stock");

router.get("/dashboard-data", async (req, res) => {

    try {

        const totalProducts =
            await Product.countDocuments();

        const totalTransactions =
            await Transaction.countDocuments();

        const lowStockItems =
            await Stock.countDocuments({

                $expr: {

                    $lte: [
                        "$currentStock",
                        "$reorderLevel"
                    ]

                }

            });

        const revenue =
            await Transaction.aggregate([

                {

                    $group: {

                        _id: null,

                        totalRevenue: {

                            $sum: "$revenue"

                        }

                    }

                }

            ]);

        res.json({

            success: true,

            data: {

                totalProducts,

                totalTransactions,

                lowStockItems,

                totalRevenue:

                    revenue.length > 0

                        ? revenue[0].totalRevenue

                        : 0

            }

        });

    } catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

});

module.exports = router;