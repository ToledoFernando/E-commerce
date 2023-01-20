const { Router } = require("express");
const { paymentID } = require("./payment.controllers");

const route = Router();

route.post("/preferensID", paymentID);

module.exports = route;
