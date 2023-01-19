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
  // await rol.create(process.env.ROL1);
  // await rol.create(process.env.ROL2);
  // await rol.create(process.env.ROL3);

  usuario.map(async (u) => await users.create(u));
  console.log(`-----------------------------------
Server on Port ${process.env.PORT || 4000}
DB is connected :D
----------------------------------- 
`);
});
