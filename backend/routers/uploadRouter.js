let express = require("express");
let multer = require("multer");
const { isAuth } = require("../utils");

let uploadRouter = express.Router();

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "uploads/");
  },
  filename(req, file, cb) {
    cb(null, `${Date.now()}.jpg`);
  },
});

const upload = multer({ storage });

uploadRouter.post("/", isAuth, upload.single("image"), (req, res) => {
  console.log(req.file);
  res.send(`/${req.file.path}`);
});

module.exports = uploadRouter;
