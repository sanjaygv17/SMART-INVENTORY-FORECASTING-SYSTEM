const mongoose = require("mongoose");

const stockSchema = new mongoose.Schema({
    productName: {
        type: String,
        required: true
    },

      category: {
        type: String,
        required: true
    },
    currentStock: {
        type: Number,
        required: true
    },
    reorderLevel: {
        type: Number,
        required: true
    },
    leadTimeDays: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model("Stock", stockSchema);