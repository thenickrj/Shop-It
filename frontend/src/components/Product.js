import React from "react";
import { Link } from "react-router-dom";
import Rating from "./Rating";

function Product({ product }) {
  return (
    <div className="product_container" key={product._id}>
      <Link to={`/product/${product._id}`}>
        <img className="medium" src={product.image} alt="product" />
      </Link>
      <div className="card_body">
        <Link to="product.html">
          <h2>{product.name}</h2>
        </Link>
        <Rating rating={product.rating} numReviews={product.numReviews} />
        <div className="row">
          <div className="price">₹ {product.price}</div>
        </div>
      </div>
    </div>
  );
}

export default Product;
