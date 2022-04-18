let jwt = require("jsonwebtoken");

let generateToken = (user) => {
  return jwt.sign(
    {
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      isSeller: user.isSeller,
    },
    process.env.JWT_SECRET || "somethingsecret",
    {
      expiresIn: "30d",
    }
  );
};

let isAuth = (req, res, next) => {
  let authorization = req.headers.authorization;

  if (authorization) {
    let token = authorization.slice(7, authorization.length); // Bearer XXXXXXX
    jwt.verify(
      token,
      process.env.JWT_SECRET || "somethingsecret",
      (err, decode) => {
        if (err) {
          console.log(err);
          res.status(401).send({ message: "Invalid token" });
        } else {
          req.user = decode;
          next();
        }
      }
    );
  } else {
    res.status(401).send({ meessage: "No token" });
  }
};

let isAdmin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401).send({ message: "Invalid Admin Token" });
  }
};

let isSeller = (req, res, next) => {
  if (req.user && req.user.isSeller) {
    next();
  } else {
    res.status(401).send({ message: "Invalid Admin Token" });
  }
};

let isSellerOrAdmin = (req, res, next) => {
  if ((req.user && req.user.isSeller) || req.user.isAdmin) {
    next();
  } else {
    res.status(401).send({ message: "Invalid Admin/Seller Token" });
  }
};

module.exports = { generateToken, isAuth, isAdmin, isSeller, isSellerOrAdmin };
