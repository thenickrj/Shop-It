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

let promise = loadStripe(
  "pk_test_51JjToBSAz6mTYX283KnxV1hqIZJZcpb62a4ObSHVBL9wgdmgNhewq1BdCHJNO6i43a2K3cOmb1cAKzsNilTw9yfS00Iv2R8pKk"
);

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
  return (
    <Router>
      <div className="grid-container">
        <header className="row mob-row">
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

            <Route path="/" exact element={<HomePage />} />
          </Routes>
        </main>
        <footer className="row center">
          {userInfo && !userInfo.isAdmin && <ChatBox userInfo={userInfo} />}
        </footer>
      </div>
    </Router>
  );
}

export default App;
