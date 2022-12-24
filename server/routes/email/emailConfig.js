const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');

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
  const tokenUserVerify = jwt.sign({ email: email }, process.env.SECRET_KEY, { expiresIn: '1h' })
  await transporter.sendMail({
    from: '"Verificar Cuenta" <salongenesis.online@gmail.com>',
    to: email,
    subject: "Salon Genesis",
    text: "Verificar tu cuenta",
    html: `<div style="border: 1px solid #454444; border-radius: 8px; padding: 20px 30px">
    <h1>Hola ${name + ' ' + lastName}</h1>
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
        href="http://localhost:5173/myAcoutn/Verify/${tokenUserVerify}/algo"
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
}

module.exports = sendEmailVerifyAcount;