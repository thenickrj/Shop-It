let express = require("express");
let expressAsyncHandler = require("express-async-handler");
const Product = require("../models/productModel");
const { isAuth, isSellerOrAdmin, isAdmin } = require("../utils");

let productRouter = express.Router();

productRouter.get(
  "/",
  expressAsyncHandler(async (req, res) => {
    let pageSize = 6;
    let page = Number(req.query.pageNumber) || 1;
    let name = req.query.name || "";
    let price = req.query.price || "";
    let category = req.query.category || "";
    let seller = req.query.seller || "";
    let order = req.query.order || "";
    let min =
      req.query.min && Number(req.query.min) !== 0 ? Number(req.query.min) : 0;
    let max =
      req.query.max && Number(req.query.max) !== 0 ? Number(req.query.max) : 0;
    let rating =
      req.query.rating && Number(req.query.rating) !== 0
        ? Number(req.query.rating)
        : 0;

    let nameFilter = name ? { name: { $regex: name, $options: "i" } } : {};
    let sellerFilter = seller ? { seller } : {};
    let categoryFilter = category ? { category } : {};
    let priceFilter = min && max ? { price: { $gte: min, $lte: max } } : {};
    let ratingFilter = rating ? { rating: { $gte: rating } } : {};
    let sortOrder =
      order === "lowest"
        ? { price: 1 }
        : order == "highest"
        ? { price: -1 }
        : order === "toprated"
        ? { rating: -1 }
        : { _id: -1 };

    let count = await Product.count({
      ...sellerFilter,
      ...nameFilter,
      ...categoryFilter,
      ...priceFilter,
      ...ratingFilter,
    });

    let products = await Product.find({
      ...sellerFilter,
      ...nameFilter,
      ...categoryFilter,
      ...priceFilter,
      ...ratingFilter,
    })
      .populate("seller", "seller.name seller.logo")
      .sort(sortOrder)
      .skip(pageSize * (page - 1))
      .limit(pageSize);

    res.send({
      products,
      page,
      pages: Math.ceil(count / pageSize),
      productsCount: count,
    });
  })
);

productRouter.get(
  "/categories",
  expressAsyncHandler(async (req, res) => {
    const categories = await Product.find().distinct("category");
    res.send(categories);
  })
);

productRouter.get(
  "/:id",
  expressAsyncHandler(async (req, res) => {
    let product = await Product.findById(req.params.id).populate(
      "seller",
      "seller.name seller.logo seller.rating seller.numReviews"
    );

    if (product) {
      res.send(product);
    } else {
      res.status(404).send({ message: "Product not found" });
    }
  })
);

productRouter.post(
  "/",
  isAuth,
  isSellerOrAdmin,
  expressAsyncHandler(async (req, res) => {
    const product = new Product({
      name: "Sample name " + Date.now(),
      seller: req.user._id,
      image: "https://m.media-amazon.com/images/I/91silkm4v5L._UX569_.jpg",
      category: "Sample Category test",
      price: 0,
      countInStock: 0,
      brand: "Sample Brand",
      rating: 0,
      numReviews: 0,
      description: "Sample Description",
    });
    const createdProduct = await product.save();
    res.send({ message: "Product Created", product: createdProduct });
  })
);

productRouter.put(
  "/:id",
  isAuth,
  isSellerOrAdmin,
  expressAsyncHandler(async (req, res) => {
    console.log(req.user);
    let productId = req.params.id;
    let product = await Product.findById(productId);
    if (product) {
      product.name = req.body.name;
      product.price = req.body.price;
      product.image = req.body.image;
      product.category = req.body.category;
      product.brand = req.body.brand;
      product.countInStock = req.body.countInStock;
      product.description = req.body.countInStock;
      let updatedProduct = await product.save();
      res.send({ message: "Product Updated", product: updatedProduct });
    } else {
      res.status(404).send({ message: "Product Not Found" });
    }
  })
);

productRouter.delete(
  "/:id",
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (product) {
      const deleteProduct = await product.remove();
      res.send({ message: "Product Deleted", product: deleteProduct });
    } else {
      res.status(404).send({ message: "Product Not found" });
    }
  })
);

productRouter.post(
  "/:id/reviews",
  isAuth,
  isSellerOrAdmin,
  expressAsyncHandler(async (req, res) => {
    const productId = req.params.id;
    const product = await Product.findById(productId);
    if (product) {
      if (product.reviews.find((x) => x.name === req.user.name)) {
        return res
          .status(400)
          .send({ message: "You already submitted a review" });
      }
      const review = {
        name: req.user.name,
        rating: Number(req.body.rating),
        comment: req.body.comment,
      };
      product.reviews.push(review);
      product.numReviews = product.reviews.length;
      product.rating =
        product.reviews.reduce((a, c) => c.rating + a, 0) /
        product.reviews.length;
      const updatedProduct = await product.save();
      res.status(201).send({
        message: "Review Created",
        review: updatedProduct.reviews[updatedProduct.reviews.length - 1],
      });
    } else {
      res.status(404).send({ message: "Product Not Found" });
    }
  })
);

module.exports = productRouter;
