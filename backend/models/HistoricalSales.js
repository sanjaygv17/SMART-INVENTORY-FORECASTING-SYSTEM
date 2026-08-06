const mongoose = require("mongoose");

const historicalSalesSchema = new mongoose.Schema({

    year: Number,

    month: Number,

    week: Number,

    category: String,

    brand: String,

    productName: String,

    weeklyUnitsSold: Number,

    weeklyRevenue: Number,

    weeklyMargin: Number,

    averageStock: Number,

    lag1: Number,

    lag2: Number,

    lag3: Number,

    lag4: Number,

    rolling4WeekAvg: Number,

    rolling8WeekAvg: Number,

    target: Number,

    productEncoded: Number,

    categoryEncoded: Number,

    brandEncoded: Number

});

module.exports = mongoose.model(
    "HistoricalSales",
    historicalSalesSchema
);