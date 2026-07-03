const Stock = require("../models/Stock");

const checkInventoryAlert = async (productName) => {

    const stock = await Stock.findOne({
        productName
    });

    if (!stock) {
        throw new Error("Stock record not found");
    }

    if (stock.currentStock <= stock.reorderLevel) {

        return {

            alert: true,

            message: `${stock.productName} has reached the reorder level. Current stock: ${stock.currentStock}`

        };

    }

    return {

        alert: false,

        product: stock.productName,

        currentStock: stock.currentStock,

        reorderLevel: stock.reorderLevel,

        message: "Stock level is sufficient"

    };

};

module.exports = {
    checkInventoryAlert
};