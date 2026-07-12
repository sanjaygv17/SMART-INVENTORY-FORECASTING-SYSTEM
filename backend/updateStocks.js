require("dotenv").config();

const connectDB = require("./src/config/db");
const Stock = require("./src/models/Stock");

const updateStocks = async () => {

    try {

        await connectDB();

        const stocks = await Stock.find();

        for (let i = 0; i < stocks.length; i++) {

            if (i < 5) {

                stocks[i].currentStock = 0;

            } else if (i < 15) {

                stocks[i].currentStock = Math.floor(Math.random() * 15) + 5;

            } else {

                stocks[i].currentStock = Math.floor(Math.random() * 150) + 50;

            }

            stocks[i].reorderLevel = 20;

            await stocks[i].save();

        }

        console.log("✅ Stock values updated successfully.");

        process.exit();

    } catch (error) {

        console.error(error);

        process.exit(1);

    }

};

updateStocks();