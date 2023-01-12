const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
require("dotenv").config();
const { database, users, rol, marca, category, products } = require("./db");
const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan("dev"));
app.use(require("./routes/routes"));

app.listen(process.env.PORT || 4000, async () => {
  await database.sync({ force: true });

  //==================================================================//

  const categorias = [
    "polimero",
    "gel",
    "monomero",
    "esmalte",
    "tips",
    "limas",
    "pincel",
    "herramientas",
    "poligel",
    "preparadores",
    "removedor",
  ];

  categorias.map(async (c) => await category.create({ name: c }));

  const marcas = [
    "cherimoya",
    "tina",
    "pink",
    "mia secret",
    "charm limit",
    "qbd",
    "navi",
    "acryfine",
    "tejar",
    "eloise",
    "meline",
    "melineXX",
    "city girl",
    "paris nigth",
    "opi",
    "leffeme",
  ];

  marcas.map(async (m) => await marca.create({ name: m }));

  const rols = ["user", "admin", "SuperAdmin"];

  rols.map(async (r) => await rol.create({ name: r }));

  const usuario = [
    {
      first_name: "Fernando",
      last_name: "Toledo",
      username: "ferchu",
      email: "toledof764@gmail.com",
      password: "e10adc3949ba59abbe56e057f20f883e",
      password2: "123456",
      rolId: 3,
    },
    {
      first_name: "Fernando",
      last_name: "Toledo",
      username: "ferchu2",
      email: "toledoferchu3@gmail.com",
      password: "e10adc3949ba59abbe56e057f20f883e",
      password2: "123456",
      rolId: 2,
    },
    {
      first_name: "Fernando",
      last_name: "Toledo",
      username: "ferchu3",
      email: "toledof@gmail.com",
      password: "e10adc3949ba59abbe56e057f20f883e",
      password2: "123456",
      rolId: 1,
    },
    {
      first_name: "Fernando",
      last_name: "Toledo",
      username: "ferchu4",
      email: "toledof7612@gmail.com",
      password: "e10adc3949ba59abbe56e057f20f883e",
      password2: "123456",
      rolId: 1,
    },
    {
      first_name: "Fernando",
      last_name: "Toledo",
      username: "ferchu5",
      email: "toledof764anwoid@gmail.com",
      password: "e10adc3949ba59abbe56e057f20f883e",
      password2: "123456",
      rolId: 1,
    },
  ];

  usuario.map(async (u) => await users.create(u));

  //==================================================================//

  console.log(`-----------------------------------
Server on Port ${process.env.PORT || 4000}
DB is connected :D
-----------------------------------
`);
});
