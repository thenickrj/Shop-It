import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { deliverOrder, detailsOrder, payOrder } from "../actions/orderActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";

import {
  ORDER_DELIVER_RESET,
  ORDER_PAY_RESET,
} from "../constants/orderConstants";

import CurrencyFormat from "react-currency-format";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import axios from "axios";

function OrderPage() {
  let { id } = useParams();
  let orderId = id;

  let [sdkReady, setSdkReady] = useState(false);
  let [clientSecret, setClientSecret] = useState(true);

  let orderPay = useSelector((state) => state.orderPay);
  let { loading: loadingPay, error: errorPay, success: successPay } = orderPay;

  let orderDeliver = useSelector((state) => state.orderDeliver);
  let {
    loading: loadingDeliver,
    error: errorDeliver,
    success: successDeliver,
  } = orderDeliver;

  let stripe = useStripe();
  let elements = useElements();

  let orderDetails = useSelector((state) => state.orderDetails);
  let { order, loading, error } = orderDetails;

  let dispatch = useDispatch();
  let userSignin = useSelector((state) => state.userSignin);
  let { userInfo } = userSignin;

  useEffect(() => {
    //generate the special stripe secret which allows us to charge the customer
    let getClientSecret = async () => {
      let response = await axios({
        method: "post",
        url: `/api/payments/create?total=${order.totalPrice * 100}`,
      });
      setSdkReady(true);
      setClientSecret(response.data.clientSecret);
    };
    if (order) {
      getClientSecret();
    }

    if (
      !order ||
      successPay ||
      successDeliver ||
      (order && order._id !== orderId)
    ) {
      dispatch({ type: ORDER_PAY_RESET });
      dispatch({ type: ORDER_DELIVER_RESET });
      dispatch(detailsOrder(orderId));
    }
  }, [dispatch, order, orderId, sdkReady, successDeliver, successPay]);

  let handlerSubmit = async (e) => {
    e.preventDefault();

    let payload = await stripe
      .confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      })
      .then(({ paymentIntent }) => {
        // paymentIntent=payment confirmation
        console.log(paymentIntent);

        if (paymentIntent) {
          dispatch(payOrder(order, paymentIntent));
          // stattus,id,created,amount
          // setSucceeded(true);
          // setProcessing(false);
          dispatch({ type: ORDER_PAY_RESET });
          dispatch(detailsOrder(orderId));
        }
      });

    if (
      !order ||
      successPay ||
      successDeliver ||
      (order && order._id !== orderId)
    ) {
      dispatch({ type: ORDER_PAY_RESET });
      dispatch({ type: ORDER_DELIVER_RESET });
      dispatch(detailsOrder(orderId));
    }
  };

  let handleChange = (event) => {
    // Listen for changes in the CardElement
    // and displays any errors as the customer types their card details
    // setDisabled(event.empty);
    // setError(event.error ? event.error.message : "");
  };

  let deliverHandler = () => {
    dispatch(deliverOrder(order._id));
  };
  return (
    <div>
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <div>
          <h1>Order {order._id}</h1>
          <div className="row top">
            <div className="col-2">
              <ul>
                <li>
                  <div className="card card-body">
                    <h2>Shipping</h2>
                    <p>
                      <strong>Name:</strong> {order.shippingAddress.fullName}{" "}
                      <br />
                      <strong>Address: </strong> {order.shippingAddress.address}
                      ,{order.shippingAddress.city},{" "}
                      {order.shippingAddress.postalCode},
                      {order.shippingAddress.country}
                    </p>
                    {order.isDelivered ? (
                      <MessageBox variant="success">
                        Delivered at {order.deliveredAt}
                      </MessageBox>
                    ) : (
                      <MessageBox variant="danger">Not Delivered</MessageBox>
                    )}
                  </div>
                </li>
                <li>
                  <div className="card card-body">
                    <h2>Payment</h2>
                    <p>
                      <strong>Method:</strong>
                      {order.paymentMethod}
                    </p>
                    {order.isPaid ? (
                      <MessageBox variant="success">
                        Paid At {order.paidAt}
                      </MessageBox>
                    ) : (
                      <MessageBox variant="danger">Not Paid</MessageBox>
                    )}
                  </div>
                </li>
                <li>
                  <div className="card card-body">
                    <h2>Order Items</h2>
                    <ul>
                      {order.orderItems.map((item) => (
                        <li key={item.product}>
                          <div className="row">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="small"
                            />
                          </div>
                          <div className="min-30">
                            <Link to={`/product/${item.product}`}>
                              {item.name}
                            </Link>
                          </div>
                          <div>
                            {item.qty}x ₹{item.price}=₹{item.qty * item.price}
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </li>
              </ul>
            </div>
            <div className="col-1">
              <div className="card card-body">
                <ul>
                  <li>
                    <h2>Order Summary</h2>
                  </li>
                  <li>
                    <div className="row">
                      <div>Items</div>
                      <div>₹{order.itemsPrice.toFixed(2)}</div>
                    </div>
                  </li>
                  <li>
                    <div className="row">
                      <div>Shipping</div>
                      <div>₹{order.shippingPrice.toFixed(2)}</div>
                    </div>
                  </li>
                  <li>
                    <div className="row">
                      <div>Tax</div>
                      <div>₹{order.taxPrice.toFixed(2)}</div>
                    </div>
                  </li>
                  <li>
                    <div className="row">
                      <div>
                        <strong>Order Total</strong>
                      </div>
                      <div>
                        <strong>₹{order.totalPrice}</strong>
                      </div>
                    </div>
                  </li>
                  {!order.isPaid && (
                    <li>
                      {!sdkReady ? (
                        <LoadingBox></LoadingBox>
                      ) : (
                        <>
                          {errorPay && (
                            <MessageBox variant="danger">{error}</MessageBox>
                          )}
                          {loadingPay && <LoadingBox></LoadingBox>}
                          <div>
                            <form onSubmit={handlerSubmit}>
                              <CardElement onChange={handleChange} />
                              <CurrencyFormat
                                renderText={(value) => (
                                  <>
                                    <h3>Order Total: {value}</h3>
                                    <h6>
                                      For Test type 4242..... till the end
                                    </h6>
                                  </>
                                )}
                                decimalScale={2}
                                value={order.totalPrice}
                                displayType={"text"}
                                thousandSeparator={true}
                                prefix={"₹"}
                              />
                              <button>
                                <span>Buy Now</span>
                              </button>
                            </form>
                          </div>
                        </>
                      )}
                    </li>
                  )}
                  {userInfo.isAdmin && order.isPaid && !order.isDelivered && (
                    <li>
                      {loadingDeliver && <LoadingBox></LoadingBox>}
                      {errorDeliver && (
                        <MessageBox variant="danger">{errorDeliver}</MessageBox>
                      )}
                      <button
                        type="button"
                        className="primary block"
                        onClick={deliverHandler}
                      >
                        Deliver Order
                      </button>
                    </li>
                  )}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default OrderPage;
