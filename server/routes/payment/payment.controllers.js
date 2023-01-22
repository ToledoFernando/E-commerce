const Mercadopago = require("mercadopago");
const { users } = require("../../db");
require("dotenv").config();
const { ventaRealizada } = require("../email/emailConfig");

Mercadopago.configurations.setAccessToken(process.env.MPTOKEN);
const paymentID = async (req, res) => {
  try {
    const data1 = JSON.parse(req.body.description);
    const response = await Mercadopago.payment.save(req.body);
    const result = await users.findOne({ where: { id: data1.userID } });
    const { status, status_detail, id } = response.body;
    data1.idProduct = id;
    ventaRealizada({ data1, result, payer: req.body.payer });
    res.status(response.status).json({ status, status_detail, id });
  } catch (error) {
    res.status(400).json({ Error: error.message });
  }
};

module.exports = { paymentID };
