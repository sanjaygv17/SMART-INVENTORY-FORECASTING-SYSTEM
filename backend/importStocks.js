require("dotenv").config();

const mongoose = require("mongoose");

const connectDB = require("./src/config/db");

const Product = require("./src/models/Product");
const Stock = require("./src/models/Stock");

const importStocks = async () => {

    try {

        await connectDB();

        const products = await Product.find();

        let inserted = 0;
        let skipped = 0;

        for (const product of products) {

            const exists = await Stock.findOne({
                productName: product.productName
            });

            if (exists) {
                skipped++;
                continue;
            }

            await Stock.create({

                productName: product.productName,

                category: product.category,

                currentStock: Math.floor(Math.random() * 200) + 20,

                reorderLevel: 20

            });

            inserted++;

        }

        console.log("\n========== STOCK IMPORT ==========");
        console.log("Inserted :", inserted);
        console.log("Skipped  :", skipped);
        console.log("==================================");

        process.exit();

    } catch (error) {

        console.error(error);

        process.exit(1);

    }

};

importStocks();