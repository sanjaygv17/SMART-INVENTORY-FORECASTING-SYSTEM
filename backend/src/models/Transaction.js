const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
    productName: {
        type: String,
        required: true
    },
    quantitySold: Number,
    revenue: Number,
    transactionDate: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("Transaction", transactionSchema);