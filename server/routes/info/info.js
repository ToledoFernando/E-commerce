const { Router } = require("express");
const { getMarcas, getCategories } = require("./info.controllers");

const route = Router();

route.get("/marcas", getMarcas);

route.get("/category", getCategories);

module.exports = route;
