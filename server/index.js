const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
require("dotenv").config();
const { database, users, rol, marca, category } = require("./db");
const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan("dev"));
app.use(require("./routes/routes"));

app.listen(process.env.PORT || 4000, async () => {
  await database.sync({ force: true });

  //======================================//
  const rols = ["user", "Admin", "SuperAdmin"];
  const marcas = [
    "marca1",
    "marca2",
    "marca3",
    "marca4",
    "marca5",
    "marca6",
    "marca7",
  ];
  const caterogys = ["tinturas", "colores", "gel", "herramientas"];

  rols.map(async (r) => {
    await rol.create({ name: r });
  });

  marcas.map(async (r) => {
    await marca.create({ name: r });
  });

  caterogys.map(async (r) => {
    await category.create({ name: r });
  });

  //======================================//

  //======================================//

  await users.create({
    first_name: "Fernando",
    last_name: "Toledo",
    username: "ferchu",
    email: "toledof764@gmail.com",
    password: "e10adc3949ba59abbe56e057f20f883e",
    rolId: 3,
  });

  await users.create({
    first_name: "algo",
    last_name: "prueba",
    username: "ferchu2",
    email: "toledoferchu3@gmail.com",
    password: "e10adc3949ba59abbe56e057f20f883e",
    rolId: 2,
  });
  await users.create({
    first_name: "Fernando",
    last_name: "Toledo",
    username: "ferchu3",
    email: "toledof@gmail.com",
    password: "e10adc3949ba59abbe56e057f20f883e",
    rolId: 1,
  });
  await users.create({
    first_name: "Fernando",
    last_name: "Toledo",
    username: "ferchu4",
    email: "aowudubaowbid@gmail.com",
    password: "e10adc3949ba59abbe56e057f20f883e",
    rolId: 1,
  });

  //======================================//

  console.log(`-----------------------------------
Server on Port ${process.env.PORT || 4000}
DB is connected :D
-----------------------------------
`);
});
