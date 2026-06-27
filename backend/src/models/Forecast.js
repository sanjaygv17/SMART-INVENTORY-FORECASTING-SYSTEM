const mongoose = require("mongoose");

const forecastSchema = new mongoose.Schema({
    productName: {
        type: String,
        required: true
    },
    predictedDemand: Number,
    forecastDate: Date,
    modelUsed: {
        type: String,
        default: "XGBoost"
    }
});

module.exports = mongoose.model("Forecast", forecastSchema);