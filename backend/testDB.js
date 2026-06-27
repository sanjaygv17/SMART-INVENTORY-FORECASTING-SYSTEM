require("dotenv").config();

const mongoose = require("mongoose");

const Transaction = require("./src/models/Transaction");

async function testDatabase() {

    try {

        await mongoose.connect(process.env.MONGODB_URI);

        console.log("✅ Connected to MongoDB");

        const transaction = new Transaction({

            productName: "Amul Butter",

            quantitySold: 10,

            revenue: 550

        });

        const savedTransaction = await transaction.save();

        console.log("Transaction Saved");

        console.log(savedTransaction);

        mongoose.connection.close();

    } catch (error) {

        console.log(error);

    }

}

testDatabase();