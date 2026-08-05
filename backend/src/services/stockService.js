const Stock = require("../models/Stock");

const updateStock = async (productName, quantitySold) => {

    const stock = await Stock.findOne({ productName });

    if (!stock) {
        throw new Error("Stock record not found");
    }
    if (stock.currentStock < quantitySold) {
    throw new Error("Insufficient stock available");
}

    stock.currentStock -= quantitySold;

    await stock.save();

    return stock;
};

const restockStock = async (stockId, quantity) => {

    const stock = await Stock.findById(stockId);

    if (!stock) {
        throw new Error("Stock record not found");
    }

    stock.currentStock += quantity;

    await stock.save();

    return stock;

};

module.exports = {
    updateStock,
    restockStock
};