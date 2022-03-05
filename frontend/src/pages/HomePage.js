import React, { useEffect, useState } from "react";
import Product from "../components/Product";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../actions/productActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";

function HomePage() {
  let dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  console.log(productList);
  const { loading, error, products } = productList;

  useEffect(() => {
    dispatch(listProducts());
  }, []);

  return (
    <div class="page_content">
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <>
          {products.length === 0 && <MessageBox>No Product Found</MessageBox>}
          <div className="row center">
            {products.map((product) => (
              <Product key={product._id} product={product} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default HomePage;
