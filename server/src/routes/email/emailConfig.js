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
    html: `<div>
      <h1>Hola ${name, lastName}</h1>
      <p>Para verificar su cuenta de click en el boton de abajo</p>
      <button><a href='http://localhost:5173/myAcoutn/Verify/${tokenUserVerify}/algo'>Click para verificar la cuenta</a></button>
    </div>`,
  });
}

module.exports = sendEmailVerifyAcount;