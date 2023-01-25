const Mercadopago = require("mercadopago");
const { users, products, category, marca, payHistory } = require("../../db");
require("dotenv").config();
const {
  ventaRealizada,
  confirmacionPago,
  variosProductos,
  ventasRealizadas,
} = require("../email/emailConfig");

Mercadopago.configurations.setAccessToken(process.env.MPTOKEN);

const paymentID = async (req, res) => {
  try {
    const data1 = JSON.parse(req.body.description);
    const response = await Mercadopago.payment.save(req.body);
    const userResult = await users.findOne({ where: { id: data1.userID } });
    if (typeof data1.productID === "string") {
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
      if (status == "approved") {
        await payHistory.create({
          payID: id,
          importe: productResult.price,
          estado: "pendiente",
          payState: status,
          userId: userResult.id,
        });

        const datosCorreo = {
          product: productResult,
          user: userResult,
          payer: req.body.payer,
          entrega: data1,
        };
        ventaRealizada(datosCorreo);
        confirmacionPago(datosCorreo);
      }
      res.status(response.status).json({ status, status_detail, id });
    } else {
      let productosList = [];
      let total = 0;

      data1.productID.map(async (id) => {
        const producto = await products.findOne({
          where: { id: id },
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
        let obj = {
          id: producto.id,
          name: producto.name,
          marca: producto.marca.dataValues.name,
          precio: producto.price,
        };
        productosList = [...productosList, obj];
        if (productosList.length === data1.productID.length) {
          const { status, status_detail, id } = response.body;
          await payHistory.create({
            payID: id,
            importe: total, // falta calcular
            estado: "pendiente",
            payState: status,
            userId: userResult.id,
          });
          const datosCorreo = {
            productos: productosList,
            user: userResult,
            payer: req.body.payer,
            entrega: data1,
          };
          ventasRealizadas(datosCorreo);
          variosProductos(datosCorreo);
          res.status(response.status).json({ status, status_detail, id });
        }
      });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ Error: error.message });
  }
};

module.exports = { paymentID };
