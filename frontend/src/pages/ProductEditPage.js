import axios from "axios";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { detailsProduct, updatedProduct } from "../actions/productActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import Product from "../components/Product";
import { PRODUCT_UPDATE_RESET } from "../constants/productConstants";

const Container = styled.div`
  input,
  select,
  textarea,
  button {
    padding: 1rem;
    border-radius: 0.5rem;
    border: 0.1rem #a4a4a4 solid;
    font-size: 1.6rem;
    font-family: Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  input:hover,
  select:hover,
  textarea:hover,
  button:hover {
    border: 0.1rem #404040 solid;
  }
`;

function ProductEditPage() {
  let navigate = useNavigate();
  let dispatch = useDispatch();
  let { id } = useParams();
  let productId = id;
  const [name, setName] = useState("");
  let [price, setPrice] = useState("");
  let [image, setImage] = useState("");
  let [category, setCategory] = useState("");
  let [countInStock, setCountInStock] = useState("");
  let [brand, setBrand] = useState("");
  let [description, setDescription] = useState("");

  let productDetails = useSelector((state) => state.productDetails);
  let { loading, error, product } = productDetails;

  let productUpdate = useSelector((state) => state.productUpdate);
  let {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = productUpdate;

  let [loadingUpload, setLoadingUpload] = useState(false);
  let [errorUpload, setErrorUpload] = useState(false);

  let userSignin = useSelector((state) => state.userSignin);
  let { userInfo } = userSignin;

  let uploadFileHandler = async (e) => {
    let file = e.target.files[0];
    let bodyFormData = new FormData();

    bodyFormData.append("image", file);
    setLoadingUpload(true);

    try {
      let { data } = await axios.post("/api/uploads", bodyFormData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${userInfo.token}`,
        },
      });
      setImage(data);
      setLoadingUpload(false);
    } catch (error) {
      setErrorUpload(error.message);
      setLoadingUpload(false);
    }
  };
  useEffect(() => {
    if (successUpdate) {
      navigate("/productList");
    }
    if (!product || product._id !== productId || successUpdate) {
      dispatch({ type: PRODUCT_UPDATE_RESET });
      dispatch(detailsProduct(productId));
    } else {
      setName(product.name);
      setPrice(product.price);
      setImage(product.image);
      setCategory(product.category);
      setCountInStock(product.countInStock);
      setBrand(product.brand);
      setDescription(product.description);
    }
  }, [dispatch, navigate, product, productId, successUpdate]);

  let submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updatedProduct({
        _id: productId,
        name,
        price,
        image,
        category,
        brand,
        countInStock,
        description,
      })
    );
    console.log(loadingUpdate, errorUpdate);
  };
  return (
    <Container>
      <div>
        <form className="form" onSubmit={submitHandler}>
          <div>
            <h1>Edit Product {product?.name}</h1>
          </div>
          {loadingUpdate && <LoadingBox></LoadingBox>}
          {errorUpdate && (
            <MessageBox variant="danger">{errorUpdate}</MessageBox>
          )}
          {loading ? (
            <LoadingBox></LoadingBox>
          ) : error ? (
            <MessageBox variant="danger">{error}</MessageBox>
          ) : (
            <>
              <div>
                <label htmlFor="name">Name</label>
                <input
                  id="name"
                  type="text"
                  placeholder="Enter Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="price">Price</label>
                <input
                  id="price"
                  type="text"
                  placeholder="Enter Price"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                ></input>
              </div>
              <div>
                <label htmlFor="image">Image</label>
                <input
                  id="image"
                  type="text"
                  placeholder="Enter Image"
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                ></input>
              </div>
              <div>
                <label htmlFor="imageFile">Image File</label>
                <input
                  type="file"
                  id="imageFile"
                  label="Choose Image"
                  onChange={uploadFileHandler}
                ></input>
                {loadingUpload && <LoadingBox></LoadingBox>}
                {errorUpload && (
                  <MessageBox variant="danger">{errorUpload}</MessageBox>
                )}
              </div>
              <div>
                <label htmlFor="category">Category</label>
                <input
                  id="category"
                  type="text"
                  placeholder="Enter Category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                ></input>
              </div>
              <div>
                <label htmlFor="brand">Brand</label>
                <input
                  id="brand"
                  type="text"
                  placeholder="Enter Brand"
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                ></input>
              </div>
              <div>
                <label htmlFor="countInStock">Count In Stock</label>
                <input
                  id="countInStock"
                  type="text"
                  placeholder="Enter Count In Stock"
                  value={countInStock}
                  onChange={(e) => setCountInStock(e.target.value)}
                ></input>
              </div>
              <div>
                <label htmlFor="description">Description</label>
                <textarea
                  id="description"
                  rows="3"
                  type="text"
                  placeholder="Enter Description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                ></textarea>
              </div>
              <div>
                <label></label>
                <button className="primary" type="submit">
                  Update
                </button>
              </div>
            </>
          )}
        </form>
      </div>
    </Container>
  );
}

export default ProductEditPage;
