const Mercadopago = require("mercadopago");
require("dotenv").config();
const { ventaRealizada } = require("../email/emailConfig");

Mercadopago.configurations.setAccessToken(process.env.MPTOKEN);
const paymentID = async (req, res) => {
  try {
    const response = await Mercadopago.payment.save(req.body);
    const { status, status_detail, id } = response.body;
    ventaRealizada(JSON.parse(req.body.description));
    res.status(response.status).json({ status, status_detail, id });
  } catch (error) {
    res.status(400).json({ Error: error.message });
  }
};

module.exports = { paymentID };
