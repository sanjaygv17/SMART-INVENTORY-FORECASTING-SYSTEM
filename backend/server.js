require("dotenv").config();

const express = require("express");
const cors = require("cors");

const connectDB = require("./src/config/db");
const transactionRoutes = require("./src/routes/transactions");
const predictRoutes = require("./routes/predictRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.json({
        message: "FreshMart Backend Running Successfully"
    });
});

app.use("/api", predictRoutes);
app.use("/api/transactions", transactionRoutes);

const PORT = process.env.PORT || 5000;

connectDB();

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});