const { Router } = require("express");
const user = require("./user/user");
const products = require("./products/products");
const rol = require("./getRol/getRol");
const admin = require("./admin/admin");
const info = require("./info/info");
const payments = require("./payment/payment");

const route = Router();

route.use("/user", user);

route.use("/products", products);

route.use("/getRol", rol);

route.use("/admin", admin);

route.use("/info", info);

route.use("/payment", payments);

module.exports = route;
