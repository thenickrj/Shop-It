import axios from "axios";
import { CART_ADD_ITEM_FAIL } from "../constants/cartConstants";

export let addToCart = (productId, qty) => async (dispatch, getState) => {
  let { data } = await axios.get(`/api/products/${productId}`);
  let {
    cart: { cartItems },
  } = getState();

  dispatch({
    type: CART_ADD_ITEM_FAIL,
    payload: {
      name: data.name,
      image: data.image,
      price: data.price,
      countInStock: data.countInStock,
      product: data._id,
      qty,
    },
  });
  console.log(cartItems);
  //   localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};
