const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    productName: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
   
    brand: String,
    costPrice: Number,
    sellingPrice: Number,
     image: {
    type: String,
    default: ""
}
});

module.exports = mongoose.model("Product", productSchema);