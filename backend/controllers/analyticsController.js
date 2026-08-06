const HistoricalSales = require("../models/HistoricalSales");



const getSeasonality = async (req, res) => {

    try {

        const productName = req.params.product;

        const monthNames = [
            "",
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec"
        ];

        // Monthly Sales
        let monthlySales = await HistoricalSales.aggregate([

            {
                $match: {
                    productName
                }
            },

            {
                $group: {
                    _id: "$month",
                    units: {
                        $sum: "$weeklyUnitsSold"
                    },
                    revenue: {
                        $sum: "$weeklyRevenue"
                    }
                }
            },

            {
                $sort: {
                    _id: 1
                }
            }

        ]);

        // Convert month number to month name
        monthlySales = monthlySales.map(item => ({

            month: monthNames[item._id],

            units: item.units,

            revenue: item.revenue

        }));

        // Weekly Sales
        let weeklySales = await HistoricalSales.aggregate([

            {
                $match: {
                    productName
                }
            },

            {
                $group: {
                    _id: "$week",
                    units: {
                        $sum: "$weeklyUnitsSold"
                    },
                    revenue: {
                        $sum: "$weeklyRevenue"
                    }
                }
            },

            {
                $sort: {
                    _id: 1
                }
            }

        ]);

        weeklySales = weeklySales.map(item => ({

            week: item._id,

            units: item.units,

            revenue: item.revenue

        }));

        res.status(200).json({

            success: true,

            product: productName,

            monthlySales,

            weeklySales

        });

    }

    catch (error) {

        console.error(error);

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};

module.exports = {

    getSeasonality

};