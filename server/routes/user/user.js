const { Router } = require('express');
const { userLogin,
  newUser,
  deleteUser,
  updateUser,
  validarTokenUser,
  getAllUsers,
  senEmailVerifyEmail,
  verifiAcoutn } = require('./userController');
const verifyToken = require('../../jwt/VerifyToken');

const route = Router();

route.get('/validateToken', validarTokenUser);

route.post("/validateAcount", verifyToken, senEmailVerifyEmail)

route.get("/acountVerify", verifyToken, verifiAcoutn)

route.post("/", userLogin);

route.post("/createUser", newUser);

route.delete("/deleteUser/:id", verifyToken, deleteUser);

route.put('/updateUser', verifyToken, updateUser);

route.get("/allUsers", verifyToken, getAllUsers);

module.exports = route;