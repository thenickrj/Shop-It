var express = require("express");
var mongoose = require("mongoose");
const productRouter = require("./routers/productRouter");
const userRouter = require("./routers/userRouter");

var app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect(process.env.MONGODB_URL || "mongodb://localhost/shopit", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use("/api/users", userRouter);
app.use("/api/products", productRouter);
const port = process.env.PORT || 5000;

app.listen(5000, () => {
  console.log(`Server at http://localhost:${port}`);
});
