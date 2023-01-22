const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_KEY,
  },
});

const sendEmailVerifyAcount = async (data) => {
  const { name, lastName, email } = data;
  const tokenUserVerify = jwt.sign({ email: email }, process.env.SECRET_KEY, {
    expiresIn: "1h",
  });
  await transporter.sendMail({
    from: '"Salon Genesis Online" <salongenesis.online@gmail.com>',
    to: email,
    subject: "Verifica tu Cuenta",
    text: "Verificar tu cuenta",
    html: `<div style="border: 1px solid #454444; border-radius: 8px; padding: 20px 30px">
    <h1>Hola ${name + " " + lastName}</h1>
    <p>Para verificar su cuenta de click en el boton de abajo</p>
    <p>El link caducara en 3h, si tiene algun problema consulte en la seccion de "Soporte" en la tienda</p>
    <button
      style="
        padding: 10px 20px;
        background-color: #3d3dbd;
        border: 0;
        border-radius: 15px;
      "
    >
      <a
        style="text-decoration: none; color: #fff; margin: 10px 0px 20px 0px"
        href="http://localhost:5173/myAcoutn/Verify/${tokenUserVerify}/${email}/ok"
        >Click para verificar la cuenta</a
      >
    </button>
    <br />
    <div style="margin: 20px">
      <a href="http://localhost:5173" style="color: #a5a5a5; width: 300px"
        >@SalonGenesis</a
      >
    </div>
  </div>`,
  });
};

const ventaRealizada = async (info) => {
  const { result, data1, payer } = info;
  await transporter.sendMail({
    from: '"Salon Genesis Online" <salongenesis.online@gmail.com>',
    to: "toledof764@gmail.com",
    // to: process.env.EMAILADMIN,
    subject: "Producto Vendido",
    text: "Producto Vendido",
    html: `
  <div
    style="
      margin: 0;
      background-color: #e8e8e8;
      width: 100%;
      height: max-content;
      min-height: 400px;
      display: flex;
      padding: 40px 0px;
    "
  >
    <div
      style="
        background-color: #fff;
        width: max-content;
        min-width: 400px;
        height: max-content;
        min-height: 200px;
        margin-top: 10px;
        padding: 10px 20px;
        margin: auto;
      "
    >
      <div style="text-align: center; padding: 30px 0px 0px">
        <img
          src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fimages.vexels.com%2Fmedia%2Fusers%2F3%2F157890%2Fisolated%2Fpreview%2F4f2c005416b7f48b3d6d09c5c6763d87-check-mark-circle-icon-by-vexels.png&f=1&nofb=1&ipt=fc82e7ac08bfe018b8c9b2cd1e2ad4fb9c473ecacb8ef17ef663f73bb49e0929&ipo=images"
          style="width: 50px; height: 50px"
          alt="CheckPayment"
        />
      </div>
      <h1 style="text-align: center">Confirmacion de pago</h1>
      <div style="border-top: 1px dashed #000; border-bottom: 1px dashed #000">
        <h2>Datos del Usuario:</h2>
        <p>ID: ${result.id}</p>
        <p>Nombre: ${result.first_name}</p>
        <p>Apellido: ${result.last_name}</p>
        <p>Email: ${result.email}</p>
        <p>${payer.identification.type}: ${payer.identification.number}</p>
      </div>
      <div style="border-bottom: 1px dashed #000">
        <h2>Detalle de la compra</h2>
        <p>Id de la compra: ${data1.idProduct}</p>
        <p>Producto: ${data1.name}</p>
        <p>Marca: ${data1.marca}</p>
        <p>Total: $${data1.total}</p>
      </div>
      <div>
        <p style="text-align: center; display: flex; flex-direction: column">
          <a
            href="http://localhost:4000"
            style="color: #000000be; text-decoration: none"
            >@salonGenesis</a
          >
          <label style="color: #000000d4; font-size: 13px; margin-top: 3px"
            >Para consultas visite la seccion "Soporte"</label
          >
        </p>
      </div>
    </div>
  </div>`,
  });
};

module.exports = { sendEmailVerifyAcount, ventaRealizada };
