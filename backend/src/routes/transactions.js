const express = require("express");
const router = express.Router();

const Transaction = require("../models/Transaction");
const { updateStock } = require("../services/stockService");
const { checkInventoryAlert } = require("../services/inventoryService");

/*
POST /api/transactions
Create a new transaction
*/

router.post("/", async (req, res) => {
    try {

        const transaction = new Transaction(req.body);

        const savedTransaction = await transaction.save();

        // Update stock
        await updateStock(
            savedTransaction.productName,
            savedTransaction.quantitySold
        );

        // Check inventory after stock update
        const inventoryAlert = await checkInventoryAlert(
            savedTransaction.productName
        );

        res.status(201).json({
            success: true,
            message: "Transaction saved successfully",
            data: savedTransaction,
            inventoryAlert
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
});

module.exports = router;