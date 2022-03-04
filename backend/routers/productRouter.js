let express = require("express");
let expressAsyncHandler = require("express-async-handler");
const Product = require("../models/productModel");

let productRouter = express.Router();

productRouter.get(
  "/",
  expressAsyncHandler(async (req, res) => {
    const name = req.query.name || "";
    const price = req.query.price || "";
    const category = req.query.category || "";

    const products = await Product.find();
    res.send(products);
  })
);

module.exports = productRouter;
