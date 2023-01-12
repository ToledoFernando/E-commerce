const { Router } = require("express");
const {
  getMarcas,
  getCategories,
  postMarca,
  deleteMarca,
  postCategory,
  deleteCategory,
} = require("./info.controllers");
const verifyToken = require("../../jwt/VerifyToken");

const route = Router();

route.get("/marcas", getMarcas);

route.post("/newMarca", verifyToken, postMarca);

route.delete("/deleteMarca/:name", verifyToken, deleteMarca);

route.get("/category", getCategories);

route.post("/newCategory", verifyToken, postCategory);

route.delete("/deleteCategory/:name", verifyToken, deleteCategory);

module.exports = route;
