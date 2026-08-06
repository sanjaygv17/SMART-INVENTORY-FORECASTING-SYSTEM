const fs = require("fs");
const csv = require("csv-parser");
const mongoose = require("mongoose");
const path = require("path");

const HistoricalSales = require("../models/HistoricalSales");



require("dotenv").config({
    path: path.join(__dirname, "../.env")
});

console.log(process.env.MONGODB_URI);

mongoose.connect(process.env.MONGODB_URI);

const results = [];

const csvPath = path.join(
    __dirname,
    "../../data/cleaned/final_product_forecasting.csv"
);

console.log("Reading CSV from:", csvPath);

fs.createReadStream(csvPath)

.pipe(csv())

.on("data", (row) => {

    results.push({

        year: Number(row.Year),

        month: Number(row.Month),

        week: Number(row.Week),

        category: row.Category,

        brand: row.Brand,

        productName: row.Product_Name,

        weeklyUnitsSold: Number(row.Weekly_Units_Sold),

        weeklyRevenue: Number(row.Weekly_Revenue),

        weeklyMargin: Number(row.Weekly_Margin),

        averageStock: Number(row.Average_Stock),

        lag1: Number(row.Lag_1),

        lag2: Number(row.Lag_2),

        lag3: Number(row.Lag_3),

        lag4: Number(row.Lag_4),

        rolling4WeekAvg: Number(row.Rolling_4_Week_Avg),

        rolling8WeekAvg: Number(row.Rolling_8_Week_Avg),

        target: Number(row.Target),

        productEncoded: Number(row.Product_Encoded),

        categoryEncoded: Number(row.Category_Encoded),

        brandEncoded: Number(row.Brand_Encoded)

    });

}).on("end", async () => {

    try {

        await HistoricalSales.deleteMany({});

        await HistoricalSales.insertMany(results);

        console.log(
            `Imported ${results.length} records successfully`
        );

    } catch (error) {

        console.error(error);

    }

    process.exit();

});