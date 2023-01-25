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
  const { product, user, payer, entrega } = info;
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
    flex-direction: column;
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
          src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.balneariomontemayor.com%2Fwp-content%2Fuploads%2F2020%2F03%2Ficono_compra.png&f=1&nofb=1&ipt=65a5a6a0939083f254b8aca8e26b528305628980829c7882a270e5d8746f5a73&ipo=images"
          style="width: 80px; height: 80px"
          alt="CheckPayment"
        />
      </div>
      <h1 style="text-align: center">Venta Realizada con exito</h1>
      <div style="border-top: 1px dashed #000; border-bottom: 1px dashed #000">
        <h2>Datos del Usuario:</h2>
        <p>ID: <b>${user.id}</b></p>
        <p>Nombre: ${user.first_name}</p>
        <p>Apellido: ${user.last_name}</p>
        <p>Email: ${user.email}</p>
        <p>${payer.identification.type}: ${payer.identification.number}</p>
      </div>
      <div style="border-bottom: 1px dashed #000; padding-bottom: 10px">
        <h2>Detalle de la compra</h2>
        <p>Id de la compra: <b>${product.id}</b></p>
        <p>Producto: ${product.name}</p>
        <p>Marca: ${product.marca.dataValues.name}</p>
        <p>Precio: $${product.price}</p>
        <img src=${
          product.productIMG
        } alt="producto" width="100%" height="350px" />
      </div>
      <div style="border-bottom: 1px dashed #000; padding-bottom: 10px">
        <h1>Datos de entrega</h1>
        <p>
          Tipo de Entrega:
          <b>${
            entrega.entrega.local ? "Retiro del Local" : "Entrega a Domicilio"
          }</b>
        </p>
        ${
          entrega.entrega.local
            ? `
            <div>
              <p>
                ${payer.identification.type}: ${payer.identification.number}
              </p>
            </div>`
            : `<div>
              <p>
                Calle: ${entrega.entrega.calle} ${entrega.entrega.numero}
              </p>
              <p>Localidad: ${entrega.entrega.localidad}</p>
              <p>Ciudad: ${entrega.entrega.ciudad}</p>
              <p>Envio por ${entrega.entrega.envio}</p>
              <p>Dato de contacto: ${entrega.entrega.phone}</p>
              ${
                entrega.entrega.descripcion.length
                  ? `<div>
                  <p>Descripcion:</p>
                  <p>${entrega.entrega.descripcion}</p>
                </div>`
                  : ""
              }
            </div>`
        }
      </div>
    </div>
  </div>
  `,
  });
};

const confirmacionPago = async (info) => {
  const { product, user, payer, entrega } = info;
  await transporter.sendMail({
    from: '"Salon Genesis Online" <salongenesis.online@gmail.com>',
    to: user.email,
    // to: process.env.EMAILADMIN,
    subject: "Producto Vendido",
    text: "Producto Vendido",
    html: `
    <div
  style="
  width: 100%;
  height: 600px;
  display: grid;
  place-content: center;
  padding: 100px 0px 30px;
  color: #000;
  overflow-y: auto;

  "
>
  <div style="text-align: center">
    <img
      src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn.icon-icons.com%2Ficons2%2F902%2FPNG%2F512%2Fshopping-bag_icon-icons.com_69305.png&f=1&nofb=1&ipt=2d9ea60b68bececbf400bb4c7f133bbf23f9466623d57a613b821edfe3687c61&ipo=images"
      alt="icono"
      width="80px"
    />
    <h1>Compra Realizada con exito</h1>
    <div
      style="
        background-color: #fff;
        width: 400px;
        margin: auto;
        text-align: left;
        padding: 15px 30px;
      "
    >
      <h2>Detalle de la compra</h2>
      <p>Producto: ${product.name}</p>
        <p>Marca: ${product.marca.dataValues.name}</p>
        <p>Precio: $${product.price}</p>
        <p>Tipo de entrega: <b>${
          entrega.entrega.local ? "Retiro del Local" : "Entrega a Domicilio"
        }</b></p>
        ${
          entrega.entrega.local
            ? `<div
          style="
            background-color: #c8c9c937;
            text-align: center;
            padding: 5px;
            margin: 10px 0px;
          "
        >
          <p>
            El producto se entregara solo al cliente con DNI
            ${payer.identification.number} en mano
          </p>
        </div>`
            : ""
        }
        
        <img src=${
          product.productIMG
        } alt="producto" width="100%" height="350px" />
    </div>
  </div>
</div>`,
  });
};

const variosProductos = async (info) => {
  const { productos, user, payer, entrega } = info;
  let total = 0;
  productos.map((p) => (total = total + p.precio));

  await transporter.sendMail({
    from: '"Salon Genesis Online" <salongenesis.online@gmail.com>',
    to: user.email,
    // to: process.env.EMAILADMIN,
    subject: "Producto Vendido",
    text: "Producto Vendido",
    html: `<div
  style="
    width: 100%;
    height: 600px;
    display: grid;
    place-content: center;
    padding: 100px 0px 30px;
    color: #000;
    overflow-y: auto;
  "
>
  <div style="text-align: center">
    <img
      src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn.icon-icons.com%2Ficons2%2F902%2FPNG%2F512%2Fshopping-bag_icon-icons.com_69305.png&f=1&nofb=1&ipt=2d9ea60b68bececbf400bb4c7f133bbf23f9466623d57a613b821edfe3687c61&ipo=images"
      alt="icono"
      width="80px"
    />
    <h1>Compra Realizada con exito</h1>
    <div
      style="
        background-color: #fff;
        width: 400px;
        margin: auto;
        text-align: left;
        padding: 15px 30px;
      "
    >
      <h2>Detalle de la compra</h2>

      <table style="width: 100%; text-align: left">
        <tr>
          <th>Producto</th>
          <th>Marca</th>
          <th>Precio</th>
        </tr>
        ${productos.map(
          (p) =>
            `<tr>
        <th>${p.name}</th>
        <th>${p.marca}</th>
        <th>$${p.precio}</th>
      </tr>`
        )}
    </table>
        
      <p style="
      text-align: right;
      border-top: 1px dashed #000;
      padding: 10px 50px;
    "><b>Total: $${total}</b></p>

      <p>
        Tipo de entrega:
        <b
          >${
            entrega.entrega.local ? "Retiro del Local" : "Entrega a Domicilio"
          }</b
        >
      </p>
      ${
        entrega.entrega.local
          ? `
      <div
        style="
          background-color: #c8c9c937;
          text-align: center;
          padding: 5px;
          margin: 10px 0px;
        "
      >
        <p>
          El producto se entregara solo al cliente con DNI
          ${payer.identification.number} en mano
        </p>
      </div>
      `
          : ""
      }
    </div>
  </div>
</div>
`,
  });
};

const ventasRealizadas = async (info) => {
  const { productos, user, payer, entrega } = info;
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
    flex-direction: column;
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
          src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.balneariomontemayor.com%2Fwp-content%2Fuploads%2F2020%2F03%2Ficono_compra.png&f=1&nofb=1&ipt=65a5a6a0939083f254b8aca8e26b528305628980829c7882a270e5d8746f5a73&ipo=images"
          style="width: 80px; height: 80px"
          alt="CheckPayment"
        />
      </div>
      <h1 style="text-align: center">Venta Realizada con exito</h1>
      <div style="border-top: 1px dashed #000; border-bottom: 1px dashed #000">
        <h2>Datos del Usuario:</h2>
        <p>ID: <b>${user.id}</b></p>
        <p>Nombre: ${user.first_name}</p>
        <p>Apellido: ${user.last_name}</p>
        <p>Email: ${user.email}</p>
        <p>${payer.identification.type}: ${payer.identification.number}</p>
      </div>
      <div style="border-bottom: 1px dashed #000; padding-bottom: 10px">
        <h2>Detalle de la compra</h2>

      <table style="width: 100%; text-align: left">
        <tr>
          <th>Producto</th>
          <th>Marca</th>
          <th>Precio</th>
        </tr>
        ${productos.map((p) => {
          return `<tr>
        <th>${p.name}</th>
        <th>${p.marca}</th>
        <th>$${p.precio}</th>
      </tr>`;
        })}
    </table>
      </div>
      <div style="border-bottom: 1px dashed #000; padding-bottom: 10px">
        <h1>Datos de entrega</h1>
        <p>
          Tipo de Entrega:
          <b>${
            entrega.entrega.local ? "Retiro del Local" : "Entrega a Domicilio"
          }</b>
        </p>
        ${
          entrega.entrega.local
            ? `
            <div>
              <p>
                ${payer.identification.type}: ${payer.identification.number}
              </p>
            </div>`
            : `<div>
              <p>
                Calle: ${entrega.entrega.calle} ${entrega.entrega.numero}
              </p>
              <p>Localidad: ${entrega.entrega.localidad}</p>
              <p>Ciudad: ${entrega.entrega.ciudad}</p>
              <p>Envio por ${entrega.entrega.envio}</p>
              <p>Dato de contacto: ${entrega.entrega.phone}</p>
              ${
                entrega.entrega.descripcion.length
                  ? `<div>
                  <p>Descripcion:</p>
                  <p>${entrega.entrega.descripcion}</p>
                </div>`
                  : ""
              }
            </div>`
        }
      </div>
    </div>
  </div>
  `,
  });
};

module.exports = {
  sendEmailVerifyAcount,
  ventaRealizada,
  confirmacionPago,
  variosProductos,
  ventasRealizadas,
};
