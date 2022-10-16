import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Link, Route, Routes } from "react-router-dom";
import { signout } from "./actions/userActions";
import "./App.css";
import shopItLogo from "./assets/Shop_it_Logo.png";
import CartPage from "./pages/CartPage";
import HomePage from "./pages/HomePage";
import PaymentMethodPage from "./pages/PaymentMethodPage";
import PlaceOrderPage from "./pages/PlaceOrderPage";
import ProductPage from "./pages/ProductPage";
import RegisterPage from "./pages/RegisterPage";
import ShippingAddressPage from "./pages/ShippingAddressPage";
import SigninPage from "./pages/SigninPage";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import OrderPage from "./pages/OrderPage";
import OrderHistoryPage from "./pages/OrderHistoryPage";
import ProductListPage from "./pages/ProductListPage";
import AdminRoute from "./components/AdminRoute";
import ProductEditPage from "./pages/ProductEditPage";
import OrderListPage from "./pages/OrderListPage";
import UserListPage from "./pages/UserListPage";
import UserEditPage from "./pages/UserEditPage";
import PrivateRoute from "./components/PrivateRoute";
import ProfilePage from "./pages/ProfilePage";
import SearchBox from "./components/SearchBox";
import LoadingBox from "./components/LoadingBox";
import MessageBox from "./components/MessageBox";
import { listProductCategories } from "./actions/productActions";
import SellerPage from "./pages/SellerPage";
import SearchPage from "./pages/SearchPage";
import SellerRoute from "./components/SellerRoute";
import DashboardScreen from "./pages/DashboardScreen";
import SupportPage from "./pages/SupportPage";
import ChatBox from "./components/ChatBox";
import styled from "styled-components";
import Test from "./pages/Test";
import Slider from "react-slick";

let promise = loadStripe(
  "pk_test_51JjToBSAz6mTYX283KnxV1hqIZJZcpb62a4ObSHVBL9wgdmgNhewq1BdCHJNO6i43a2K3cOmb1cAKzsNilTw9yfS00Iv2R8pKk"
);

const Container = styled.div`
  background-color: #eaeded;
  .navBar {
    box-shadow: rgb(0 0 0 / 25%) 0px 25px 50px -12px;
  }
  .open-sidebar,
  .close-sidebar {
    border: none;
  }
  .close-sidebar {
    font-size: 2rem;
  }
  .sidebarOptions {
    color: #212121;
  }
  .sidebarOptions:visited {
    color: #3569a2;
  }
`;

function App() {
  let dispatch = useDispatch();
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  let [sidebarIsOpen, setSidebarIsOpen] = useState(false);

  let productCategoryList = useSelector((state) => state.productCategoryList);
  let {
    loading: loadingCategories,
    error: errorCategories,
    categories,
  } = productCategoryList;

  useEffect(() => {
    dispatch(listProductCategories());
  }, [dispatch]);

  let signoutHandler = () => {
    dispatch(signout());
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <Container>
      <Router>
        <div className="">
          <header className="navBar row mob-row">
            <div>
              <button
                type="button"
                className="open-sidebar"
                onClick={() => setSidebarIsOpen(true)}
              >
                <i className="fa fa-bars"></i>
              </button>

              <Link className="brand" to="/">
                <img src={shopItLogo} className="header_logo" alt="" />
              </Link>
            </div>
            <div>
              <SearchBox />
            </div>
            <div>
              <Link to="/cart">
                <svg
                  class="V3C5bO"
                  width="14"
                  height="14"
                  viewBox="0 0 16 16"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    class="_1bS9ic"
                    d="M15.32 2.405H4.887C3 2.405 2.46.805 2.46.805L2.257.21C2.208.085 2.083 0 1.946 0H.336C.1 0-.064.24.024.46l.644 1.945L3.11 9.767c.047.137.175.23.32.23h8.418l-.493 1.958H3.768l.002.003c-.017 0-.033-.003-.05-.003-1.06 0-1.92.86-1.92 1.92s.86 1.92 1.92 1.92c.99 0 1.805-.75 1.91-1.712l5.55.076c.12.922.91 1.636 1.867 1.636 1.04 0 1.885-.844 1.885-1.885 0-.866-.584-1.593-1.38-1.814l2.423-8.832c.12-.433-.206-.86-.655-.86"
                    fill="#fff"
                  ></path>
                </svg>
                Cart
                {cartItems.length > 0 && (
                  <span className="badge">{cartItems.length}</span>
                )}
              </Link>
              {userInfo ? (
                <div className="dropdown">
                  <Link to="#">
                    {userInfo.name} <i className="fa fa-caret-down"></i>{" "}
                  </Link>
                  <ul className="dropdown-content">
                    <li>
                      <Link to="/profile">User Profile</Link>
                    </li>
                    <li>
                      <Link to="/orderhistory">Order History</Link>
                    </li>
                    <li>
                      <Link to="#signout" onClick={signoutHandler}>
                        Sign Out
                      </Link>
                    </li>
                  </ul>
                </div>
              ) : (
                <Link to="/signin">Sign In</Link>
              )}
              {userInfo && userInfo.isSeller && (
                <div className="dropdown">
                  <Link to="#admin">
                    Seller <i className="fa fa-caret-down"></i>
                  </Link>
                  <ul className="dropdown-content">
                    <li>
                      <Link to="/productlist/seller">Products</Link>
                    </li>
                    <li>
                      <Link to="/orderlist/seller">Orders</Link>
                    </li>
                  </ul>
                </div>
              )}
              {userInfo && userInfo.isAdmin && (
                <div className="dropdown">
                  <Link to="#admin">
                    Admin <i className="fa fa-caret-down"></i>
                  </Link>
                  <ul className="dropdown-content">
                    <li>
                      <Link to="/dashboard">Dashboard</Link>
                    </li>
                    <li>
                      <Link to="/productlist">Products</Link>
                    </li>
                    <li>
                      <Link to="/orderlist">Orders</Link>
                    </li>
                    <li>
                      <Link to="/userlist">Users</Link>
                    </li>
                    <li>
                      <Link to="/support">Support</Link>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </header>
          <aside className={sidebarIsOpen ? "open" : ""}>
            <ul className="categories">
              <li>
                <strong>Categories</strong>
                <button
                  onClick={() => setSidebarIsOpen(false)}
                  className="close-sidebar"
                  type="button"
                >
                  <i className="fa fa-close"></i>
                </button>
              </li>
              {loadingCategories ? (
                <LoadingBox></LoadingBox>
              ) : errorCategories ? (
                <MessageBox variant="danger">{errorCategories}</MessageBox>
              ) : (
                categories.map((c) => (
                  <li key={c}>
                    <Link
                      to={`/search/category/${c}`}
                      className="sidebarOptions"
                      onClick={() => setSidebarIsOpen(false)}
                    >
                      {c}
                    </Link>
                  </li>
                ))
              )}
            </ul>
          </aside>
          <main>
            <Routes>
              <Route path="/signin" element={<SigninPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/product/:id" element={<ProductPage />} />
              <Route path="/product/:id/edit" element={<ProductEditPage />} />
              <Route path="/cart">
                <Route path=":id" element={<CartPage />} />
                <Route path="" element={<CartPage />} />
              </Route>
              <Route path="/shipping" element={<ShippingAddressPage />} />
              <Route path="/payment" element={<PaymentMethodPage />} />
              <Route path="/placeorder" element={<PlaceOrderPage />} />
              <Route path="/productlist" element={<AdminRoute />}>
                <Route path="" element={<ProductListPage />} />
              </Route>
              <Route path="/productlist/seller" element={<SellerRoute />}>
                <Route path="" element={<ProductListPage />} />
              </Route>
              <Route path="/orderlist/seller" element={<SellerRoute />}>
                <Route path="" element={<OrderListPage />} />
              </Route>
              <Route
                path="/productlist/pageNumber/:pageNumber"
                element={<SellerRoute />}
              >
                <Route path="" element={<ProductListPage />} />
              </Route>
              <Route path="/profile" element={<PrivateRoute />}>
                <Route path="" element={<ProfilePage />} exact />
              </Route>
              <Route path="/orderlist" element={<AdminRoute />}>
                <Route path="" element={<OrderListPage />} exact />
              </Route>
              <Route
                path="/order/:id"
                element={
                  <>
                    <Elements stripe={promise}>
                      <OrderPage />
                    </Elements>
                  </>
                }
              ></Route>
              <Route path="/orderhistory" element={<OrderHistoryPage />} />

              <Route path="/userlist" element={<AdminRoute />}>
                <Route path="" element={<UserListPage />} />
              </Route>
              <Route path="/user/:id/edit" element={<AdminRoute />}>
                <Route path="" element={<UserEditPage />} />
              </Route>
              <Route path="/dashboard" element={<AdminRoute />}>
                <Route path="" element={<DashboardScreen />} />
              </Route>
              <Route path="/support" element={<AdminRoute />}>
                <Route path="" element={<SupportPage />} />
              </Route>
              <Route path="/search/name" element={<SearchPage />} exact>
                <Route path=":name" element={<SearchPage />} exact />
              </Route>
              <Route
                path="/search/category/:category"
                element={<SearchPage />}
                exact
              />
              <Route
                path="/search/category/:category/name/:name"
                element={<SearchPage />}
                exact
              />

              <Route
                path="/search/category/:category/name/:name/min/:min/max/:max/rating/:rating/order/:order/pageNumber/:pageNumber"
                element={<SearchPage />}
                exact
              />

              <Route path="/seller/:id" element={<SellerPage />} />

              <Route path="/test" exact element={<Test />} />

              <Route path="/" exact element={<HomePage />} />
            </Routes>
          </main>
          <footer className="row center">
            {userInfo && !userInfo.isAdmin && <ChatBox userInfo={userInfo} />}
          </footer>
        </div>
      </Router>
    </Container>
  );
}

export default App;
