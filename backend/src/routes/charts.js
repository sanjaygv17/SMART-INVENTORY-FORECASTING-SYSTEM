const express = require("express");
const router = express.Router();

const Transaction = require("../models/Transaction");

router.get("/weekly-sales", async (req, res) => {

    try {

        const sales = await Transaction.aggregate([

            {
                $group: {

                    _id: {

                        $dateToString: {
                            format: "%Y-%m-%d",
                            date: "$transactionDate"
                        }

                    },

                    sales: {
                        $sum: "$revenue"
                    }

                }

            },

            {
                $sort: {
                    _id: 1
                }
            }

        ]);

        const chartData = sales.map((item) => ({

            week: item._id,

            sales: item.sales

        }));

        res.json({

            success: true,

            data: chartData

        });

    } catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

});

module.exports = router;