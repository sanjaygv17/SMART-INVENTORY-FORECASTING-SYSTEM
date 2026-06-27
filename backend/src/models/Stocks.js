const mongoose = require("mongoose");

const stockSchema = new mongoose.Schema({
    productName: {
        type: String,
        required: true
    },
    currentStock: Number,
    reorderLevel: Number,
    leadTimeDays: Number
});

module.exports = mongoose.model("Stock", stockSchema);