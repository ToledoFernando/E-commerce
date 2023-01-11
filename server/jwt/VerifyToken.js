const jwt = require("jsonwebtoken");
require("dotenv").config();

const verifyToken = (req, res, next) => {
  try {
    if (!req.headers.authorization) throw Error("Token is required");
    const token = req.headers.authorization.split(" ")[1];
    const result = jwt.verify(token, process.env.SECRET_KEY);
    req.user = result;
    next();
  } catch (error) {
    console.log("NO TIENE TOKEN");
    res.status(400).send(error.message);
  }
};

module.exports = verifyToken;
