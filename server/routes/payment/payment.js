const { Router } = require("express");
const { paymentID } = require("./payment.controllers");
const verifyToken = require("../../jwt/VerifyToken");

const route = Router();

route.post("/preferensID", verifyToken, paymentID);

route.get("/getAllPay", verifyToken);

route.put("/updatePay", verifyToken);

module.exports = route;
