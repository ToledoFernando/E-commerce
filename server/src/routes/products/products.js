const { Router } = require('express');
const { getProducts, postProduct, updateProducts, deleteProduct } = require('./productsControllers')
const VerifyToken = require('../../jwt/VerifyToken');

const route = Router();

route.get('/', getProducts);

route.post('/newProduct', VerifyToken, postProduct);

route.put('/updateProduct', VerifyToken, updateProducts);

route.delete('/deleteProduct/:id', VerifyToken, deleteProduct);

module.exports = route