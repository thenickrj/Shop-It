import { BrowserRouter as Router, Link, Route, Routes } from "react-router-dom";
import "./App.css";
import shopItLogo from "./assets/Shop_it_Logo.png";
import HomePage from "./pages/HomePage";

function App() {
  // let signoutHandler = () => {};
  return (
    <Router>
      <div className="grid-container">
        <header className="row">
          <div>
            <Link className="brand" to="/">
              <img src={shopItLogo} className="header_logo" alt="" />
            </Link>
          </div>
          <div>
            <Link to="/cart">Cart</Link>
          </div>
        </header>
        <Routes>
          <Route path="/" exact element={<HomePage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
