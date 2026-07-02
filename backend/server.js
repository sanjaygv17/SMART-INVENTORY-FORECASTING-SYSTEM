require("dotenv").config();

const express = require("express");
const cors = require("cors");

const connectDB = require("./src/config/db");

const transactionRoutes = require("./src/routes/transactions");
const predictionRoutes = require("./src/routes/predictions");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.json({
        message: "Smart Inventory Management System API Running Successfully"
    });
});


app.use("/api/transactions", transactionRoutes);
app.use("/api", predictionRoutes);

const PORT = process.env.PORT || 5000;

connectDB();

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});