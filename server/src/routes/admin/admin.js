const { Router } = require('express');
const { getAllUserClient, getAllAdmin, clientBanned, adminBanned, deleteAcoutn } = require('./adminControllers');
const Verifytoken = require('../../jwt/VerifyToken');

const route = Router();

route.get('/allClient', Verifytoken, getAllUserClient);

route.get('/allAdmin', Verifytoken, getAllAdmin)

route.put('/clientBanned/:id', Verifytoken, clientBanned)

route.put('/adminBanned/:id', Verifytoken, adminBanned)

route.delete("/deleteAcount/:id", Verifytoken, deleteAcoutn)

module.exports = route;