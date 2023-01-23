const Mercadopago = require("mercadopago");
const { users, products, category, marca } = require("../../db");
require("dotenv").config();
const { ventaRealizada } = require("../email/emailConfig");

Mercadopago.configurations.setAccessToken(process.env.MPTOKEN);

const paymentID = async (req, res) => {
  try {
    const data1 = JSON.parse(req.body.description);

    const response = await Mercadopago.payment.save(req.body);
    const userResult = await users.findOne({ where: { id: data1.userID } });
    const productResult = await products.findOne({
      where: { id: data1.productID },
      include: [
        {
          model: category,
          attributes: ["name"],
        },
        { model: marca, attributes: ["name"] },
      ],
      attributes: {
        exclude: ["marcaId", "category", "updatedAt"],
      },
    });
    const { status, status_detail, id } = response.body;
    if (status == "approved")
      ventaRealizada({
        product: productResult,
        user: userResult,
        payer: req.body.payer,
        entrega: data1,
      });
    res.status(response.status).json({ status, status_detail, id });
  } catch (error) {
    console.log(error);
    res.status(400).json({ Error: error.message });
  }
};

module.exports = { paymentID };
