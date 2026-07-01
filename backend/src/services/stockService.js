const Stock = require("../models/Stock");

const updateStock = async (productName, quantitySold) => {

    const stock = await Stock.findOne({ productName });

    if (!stock) {
        throw new Error("Stock record not found");
    }

    stock.currentStock -= quantitySold;

    await stock.save();

    return stock;
};

module.exports = {
    updateStock
};