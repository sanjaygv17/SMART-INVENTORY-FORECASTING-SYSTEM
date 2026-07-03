require("dotenv").config();

const mongoose = require("mongoose");
const fs = require("fs");
const csv = require("csv-parser");

const connectDB = require("./src/config/db");

const Product = require("./src/models/Product");
const Stock = require("./src/models/Stock");

// Change this path if your CSV is elsewhere
const DATASET_PATH = "../data/cleaned/final_product_forecasting.csv";
async function importProducts() {

    try {

        await connectDB();

        console.log("✅ MongoDB Connected");

        const products = [];

        fs.createReadStream(DATASET_PATH)
            .pipe(csv())
            .on("data", (row) => {

                products.push(row);

            })
            .on("end", async () => {

                const uniqueProducts = {};

                products.forEach(product => {

                    if (!uniqueProducts[product.Product_Name]) {

                        uniqueProducts[product.Product_Name] = product;

                    }

                });

                let inserted = 0;
                let skipped = 0;

                for (const key in uniqueProducts) {

                    const item = uniqueProducts[key];

                    const exists = await Product.findOne({
                        productName: item.Product_Name
                    });

                    if (exists) {

                        skipped++;
                        continue;

                    }

                    await Product.create({

                        productName: item.Product_Name,
                        category: item.Category,
                        brand: item.Brand,
                        currentStock: Math.round(item.Average_Stock),
                        reorderLevel: Math.round(item.Average_Stock * 0.2),
                        leadTimeDays: 7

                    });

                    await Stock.create({

                        productName: item.Product_Name,
                        currentStock: 100,
                        reorderLevel: 20,
                        leadTimeDays: 7

                    });

                    inserted++;

                }

                console.log("\n========== IMPORT SUMMARY ==========");

                console.log("Inserted :", inserted);

                console.log("Skipped  :", skipped);

                console.log("====================================");

                mongoose.connection.close();

            });

    } catch (error) {

        console.log(error.message);

        mongoose.connection.close();

    }

}

importProducts();