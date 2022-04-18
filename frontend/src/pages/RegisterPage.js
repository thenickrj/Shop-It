import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Link,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { register } from "../actions/userActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import shopItLogo from "../assets/Shop_it_Logo.png";
import styled from "styled-components";

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
    height: 550px;
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

  a {
    color: white;
  }
  a:hover {
    color: #ff8000;
  }
`;

function RegisterPage() {
  let [name, setName] = useState("");
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [confirmPassword, setConfirmPassword] = useState("");

  const [searchParams] = useSearchParams();
  const { search } = useLocation();

  let redirect = search ? search.split("=")[1] : "/";
  let userRegister = useSelector((state) => state.userRegister);
  let { userInfo, error, loading } = userRegister;
  let dispatch = useDispatch();
  let navigate = useNavigate();

  let submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Password and confirm password are not match");
    } else {
      dispatch(register(name, email, password));
    }
  };

  useEffect(() => {
    if (userInfo) {
      navigate(`/${redirect}`, { replace: true });
    }
  }, [userInfo, redirect, navigate]);

  return (
    <Container>
      <div className="login_container">
        <div id="container">
          <form onSubmit={submitHandler}>
            <img src={shopItLogo} className="header_logo" alt="" />
            <div>
              <h1 style={{ color: "white" }}>Create Account</h1>
            </div>
            {loading && <LoadingBox></LoadingBox>}
            {error && <MessageBox variant="danger">{error}</MessageBox>}{" "}
            <input
              type="text"
              id="name"
              placeholder="Enter Name"
              required
              className="login_Input"
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="text"
              id="name"
              placeholder="Enter Email"
              required
              className="login_Input"
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="text"
              id="name"
              placeholder="Enter Password"
              required
              className="login_Input"
              onChange={(e) => setPassword(e.target.value)}
            />
            <input
              type="text"
              id="name"
              placeholder="Confirm Password"
              required
              className="login_Input"
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <button className="login_submit" type="submit">
              Register
            </button>
            <div>
              <label />
              Already have an account?
              <Link to={`/signin?redirect=${redirect}`}>Sign In</Link>
            </div>
          </form>
        </div>

        {/* <form className="form" onSubmit={submitHandler}>
        <p>Dss</p>
        <input type="text" />
        <div>
          <h1>Create Account</h1>
        </div>
        {loading && <LoadingBox></LoadingBox>}
        {error && <MessageBox variant="danger">{error}</MessageBox>}
        <div>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            placeholder="Enter Name"
            required
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="name">Email Address</label>
          <input
            type="email"
            id="email"
            placeholder="Enter Email"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="name">Password</label>
          <input
            type="password"
            id="password"
            placeholder="Enter Password"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="name">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            placeholder="Enter Password Again"
            required
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <div>
          <label />
          <button className="primary" type="submit">
            Register
          </button>
        </div>
        <div>
          <label />
          Already have an account?
          <Link to={`../sigin?redirect=${redirect}`}>Sign In</Link>
        </div>
      </form>


       */}
      </div>
    </Container>
  );
}

export default RegisterPage;
