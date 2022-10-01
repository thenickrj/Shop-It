import React from "react";
import { Link } from "react-router-dom";
import Rating from "./Rating";
import styled from "styled-components";

const Container = styled.div`
  a {
    color: #212121;
  }
  a:visited {
    color: #3569a2;
  }
`;

function Product({ product }) {
  return (
    <Container>
      <div className="product_container" key={product._id}>
        <Link to={`/product/${product._id}`}>
          <img className="medium" src={product.image} alt="product" />
        </Link>
        <div className="card_body">
          <Link to={`/product/${product._id}`}>
            <h2>{product.name}</h2>
          </Link>
          <Rating rating={product.rating} numReviews={product.numReviews} />
          <div className="row">
            <div className="price">₹ {product.price}</div>
          </div>
        </div>
      </div>
    </Container>
  );
}

export default Product;
