import axios from "axios";
import {
  CART_ADD_ITEM,
  CART_ADD_ITEM_FAIL,
  CART_SAVE_PAYMENT_METHOD,
  CART_SAVE_SHIPPING_ADDRESS,
} from "../constants/cartConstants";

export let addToCart = (productId, qty) => async (dispatch, getState) => {
  let { data } = await axios.get(`/api/products/${productId}`);
  let {
    cart: { cartItems },
  } = getState();

  if (cartItems.length > 0 && data.seller._id !== cartItems[0].seller._id) {
    dispatch({
      type: CART_ADD_ITEM_FAIL,
      payload: `Can't Add to Cart, Buy only from ${cartItems[0].seller.seller.name} in this order.`,
    });
  } else {
    dispatch({
      type: CART_ADD_ITEM,
      payload: {
        name: data.name,
        image: data.image,
        price: data.price,
        countInStock: data.countInStock,
        product: data._id,
        seller: data.seller,
        qty,
      },
    });
    localStorage.setItem(
      "cartItems",
      JSON.stringify(getState().cart.cartItems)
    );
  }
};

export let removeFromCart = (productId) => (dispatch, getState) => {
  dispatch({ type: CART_SAVE_SHIPPING_ADDRESS, payload: productId });

  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

export let saveShippingAddress = (data) => (dispatch) => {
  dispatch({ type: CART_SAVE_SHIPPING_ADDRESS, payload: data });
  localStorage.setItem("shippingAddress", JSON.stringify(data));
};

export let savePaymentMethod = (data) => (dispatch) => {
  dispatch({ type: CART_SAVE_PAYMENT_METHOD, payload: data });
};
