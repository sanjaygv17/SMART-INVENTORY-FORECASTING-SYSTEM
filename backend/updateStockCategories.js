require("dotenv").config();

const connectDB = require("./src/config/db");

const Product = require("./src/models/Product");
const Stock = require("./src/models/Stock");

const updateCategories = async () => {

    try {

        await connectDB();

        const stocks = await Stock.find();

        let updated = 0;

        for (const stock of stocks) {

            const product = await Product.findOne({
                productName: stock.productName
            });

            if (product) {

                stock.category = product.category;

                await stock.save();

                updated++;

            }

        }

        console.log(`Updated ${updated} stock records.`);

        process.exit();

    } catch (error) {

        console.error(error);

        process.exit(1);

    }

};

updateCategories();