const { Router } = require('express');
const getRol = require('./getRolController');
const verifyToken = require('../../jwt/VerifyToken');

const route = Router();

route.get('/:id', verifyToken, getRol)

module.exports = route;