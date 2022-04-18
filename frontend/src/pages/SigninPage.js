import React, { useEffect, useState } from "react";
import shopItLogo from "../assets/Shop_it_Logo.png";
import {
  Link,
  Navigate,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import styled from "styled-components";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { signin } from "../actions/userActions";
import { useDispatch, useSelector } from "react-redux";

let Container = styled.div`
  margin: -1rem;

  .login_container {
    height: 100vh;
    background: url("https://media.istockphoto.com/photos/online-shopping-and-payment-man-using-tablet-with-shopping-cart-icon-picture-id1206800961?k=20&m=1206800961&s=612x612&w=0&h=hcPoUKhWtzHXR3PIAHVgPVZDZaO7R8yZ1wNPkUSsgwU=")
      no-repeat center center fixed;
    background-size: cover;
  }

  #container {
    width: 350px;
    height: 500px;
    background: inherit;
    position: absolute;
    overflow: hidden;
    top: 50%;
    left: 50%;
    margin-left: -175px;
    margin-top: -250px;
    border-radius: 8px;
  }

  #container:before {
    width: 400px;
    height: 550px;
    content: "";
    position: absolute;
    top: -25px;
    left: -25px;
    bottom: 0;
    right: 0;
    background: inherit;
    box-shadow: inset 0 0 0 200px rgba(255, 255, 255, 0.2);
    filter: blur(20px);
  }

  form {
    text-align: center;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }

  .login_Input,
  .login_submit {
    background: 0;
    width: 200px;
    outline: 0;
    border: 0;
    border-bottom: 2px solid rgb(21 1 1 /62%);
    margin: 20px 0;
    padding-bottom: 10px;
    font-size: 18px;
    font-weight: bold;
    /* color: white; */
    color: white;
  }

  .login_Input::placeholder {
    color: #f5b657;
  }

  .login_submit {
    border: 0;
    border-radius: 8px;
    padding-bottom: 0;
    height: 50px;
    background: #e6961c;
    color: white;
    cursor: pointer;
    transition: all 600ms ease-in-out;
  }

  .login_submit:hover {
    background: #c0392b;
  }
`;
function SigninPage() {
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");

  let dispatch = useDispatch();
  let navigate = useNavigate();

  let [searchParams] = useSearchParams();
  let { search } = useLocation();

  let userSignin = useSelector((state) => state.userSignin);
  const redirect = search ? search.split("=")[1] : "/";
  let { userInfo, loading, error } = userSignin;

  let submitHandler = (e) => {
    e.preventDefault();
    dispatch(signin(email, password));
  };

  useEffect(() => {
    if (userInfo) {
      navigate(`../${redirect}`, { replace: true });
    }
  }, [navigate, redirect, userInfo]);

  return (
    <Container>
      <div className="login_container">
        <div id="container">
          <form onSubmit={submitHandler}>
            <img src={shopItLogo} className="header_logo" alt="" />
            {loading && <LoadingBox></LoadingBox>}
            {error && <MessageBox variant="danger">{error}</MessageBox>}
            <input
              type="text"
              id="name"
              placeholder="Enter Email"
              required
              className="login_Input"
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              id="password"
              placeholder="Enter Password"
              required
              className="login_Input"
              onChange={(e) => setPassword(e.target.value)}
            />
            <button className="login_submit" type="submit">
              Sign In
            </button>
            <div>
              <label />
              Don't have an account?
              <Link to={`../register?redirect=${redirect}`}>Register</Link>
            </div>
          </form>
        </div>
      </div>
    </Container>
  );
}

export default SigninPage;
