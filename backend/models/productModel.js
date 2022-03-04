let mongoose = require("mongoose");

let productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    image: { type: String, required: true },
    brand: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    countInStock: { type: Number, required: true },
    description: { type: String, required: true },
    rating: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

let Product = mongoose.model("Products", productSchema);

module.exports = Product;
