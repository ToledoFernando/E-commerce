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

  const rols = ["user", "Admin", "SuperAdmin"];

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
    {
      first_name: "akscñlamñw",
      last_name: "awodiawd",
      username: "ferchu6",
      email: "toledof764anwoiasdd@gmail.com",
      password: "e10adc3949ba59abbe56e057f20f883e",
      password2: "123456",
      rolId: 1,
    },
    {
      first_name: "Fernaszxcando",
      last_name: "Toled zxc o",
      username: "ferchu7",
      email: "toledof761234anwoid@gmail.com",
      password: "e10adc3949ba59abbe56e057f20f883e",
      password2: "123456",
      rolId: 1,
    },
    {
      first_name: "Fernando",
      last_name: "Toledo",
      username: "ferchu8",
      email: "toled192j39j123of764anwoid@gmail.com",
      password: "e10adc3949ba59abbe56e057f20f883e",
      password2: "123456",
      rolId: 1,
    },
    {
      first_name: "Fernando",
      last_name: "Toledo",
      username: "ferchu9",
      email: "toledof764a123o1o2n3nwoid@gmail.com",
      password: "e10adc3949ba59abbe56e057f20f883e",
      password2: "123456",
      rolId: 1,
    },
    {
      first_name: "Fernando",
      last_name: "Toledo",
      username: "ferchu10",
      email: "toledof764aooj299dnwoid@gmail.com",
      password: "e10adc3949ba59abbe56e057f20f883e",
      password2: "123456",
      rolId: 1,
    },
    {
      first_name: "Fernando",
      last_name: "Toledo",
      username: "ferchu11",
      email: "toledof764anpawpokwoid@gmail.com",
      password: "e10adc3949ba59abbe56e057f20f883e",
      password2: "123456",
      rolId: 1,
    },
    {
      first_name: "Fernando",
      last_name: "Toledo",
      username: "ferchu12",
      email: "toledof764anwoidzxczxc@gmail.com",
      password: "e10adc3949ba59abbe56e057f20f883e",
      password2: "123456",
      rolId: 1,
    },
  ];

  usuario.map(async (u) => await users.create(u));

  const productos = [
    {
      name: "producto 1",
      description: "una descripcion muy xd",
      price: "3000",
      category: ["2"],
      oferta: "0",
      marcaId: "13",
      productIMG:
        "https://firebasestorage.googleapis.com/v0/b/my-first-project-a3ad3.appspot.com/o/508e9971-a6a4-47d2-b3fc-e0314f92422e?alt=media&token=ff557991-25f0-427d-aa58-7a5e7e226148",
      imgid: "508e9971-a6a4-47d2-b3fc-e0314f92422e",
    },
    {
      name: "aiw daiwd",
      description: "aiwdoai wdia wodi awoid aiw doia wid ",
      price: "30000",
      category: ["3", "4", "5"],
      oferta: "0",
      marcaId: "3",
      productIMG:
        "https://firebasestorage.googleapis.com/v0/b/my-first-project-a3ad3.appspot.com/o/7b7e76f3-2390-45d1-a3e2-1f937b9d807d?alt=media&token=8bcdca06-6b9b-477a-9bba-c244acc2fea1",
      imgid: "7b7e76f3-2390-45d1-a3e2-1f937b9d807d",
    },
    {
      name: "otro producto",
      description: "una deaoi wdoia wodi awoid oaiw doi",
      price: "5000",
      category: ["2"],
      oferta: "3000",
      marcaId: "2",
      productIMG:
        "https://firebasestorage.googleapis.com/v0/b/my-first-project-a3ad3.appspot.com/o/f5b9da95-76cd-43b1-bdb1-728886e94331?alt=media&token=a0ed7289-b12a-4889-81e9-2c76f7e32f2d",
      imgid: "f5b9da95-76cd-43b1-bdb1-728886e94331",
    },
    {
      name: "producto 3",
      description: "oaiw doiaw doia wdi aowid oaiw d",
      price: "30000",
      category: ["2", "3", "4", "5", "6"],
      oferta: "0",
      marcaId: "3",
      productIMG:
        "https://firebasestorage.googleapis.com/v0/b/my-first-project-a3ad3.appspot.com/o/3de9d294-569c-402a-9f14-fb1638ef2cd4?alt=media&token=95b87f81-5a6a-4517-9142-33b0fdc0f35d",
      imgid: "3de9d294-569c-402a-9f14-fb1638ef2cd4",
    },
    {
      name: "awodi aowid",
      description: "odinawoida owid aiw doia wodi awodi ",
      price: "4000",
      category: ["7", "8"],
      oferta: "2000",
      marcaId: "3",
      productIMG:
        "https://firebasestorage.googleapis.com/v0/b/my-first-project-a3ad3.appspot.com/o/933e0dd6-7737-44aa-9343-972d828b6bee?alt=media&token=db977ea8-0f4f-4201-b0c9-4c87c4e75be9",
      imgid: "933e0dd6-7737-44aa-9343-972d828b6bee",
    },
    {
      name: "aiwndoaiwnod ",
      description: "oidawodnaowndoaiwndoanwd",
      price: "30000",
      category: ["2", "3", "4", "5", "6"],
      oferta: "0",
      marcaId: "2",
      productIMG:
        "https://firebasestorage.googleapis.com/v0/b/my-first-project-a3ad3.appspot.com/o/41677bb5-1312-426c-9515-8eddb255f4a2?alt=media&token=5c3cb1c6-6d9f-403a-b408-d50efcf90169",
      imgid: "41677bb5-1312-426c-9515-8eddb255f4a2",
    },
  ];

  productos.map(async (p) => {
    const productoadd = await products.create(p);
    await productoadd.addCategory(p.category);
  });

  //==================================================================//
  console.log(`-----------------------------------
Server on Port ${process.env.PORT || 4000}
DB is connected :D
----------------------------------- 
`);
});
