const { Router } = require('express');
const user = require('./user/user');
const products = require('./products/products');
const rol = require('./getRol/getRol');
const admin = require('./admin/admin');
const jwt = require('jsonwebtoken');

const route = Router();

route.use('/user', user);

route.use('/products', products);

route.use('/getRol', rol);

route.use('/admin', admin);

route.get("/*", (req, res) => res.send('Not found pibe xd'))

module.exports = route;