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

  const productos = [
    {
      name: "prueba 1",
      description: "descripcion muy xdxdxdddd",
      price: "3000",
      category: ["2"],
      oferta: 0,
      marcaId: "3",
      productIMG:
        "https://firebasestorage.googleapis.com/v0/b/my-first-project-a3ad3.appspot.com/o/22cc4387-1823-49f2-a582-fbb171aa722e?alt=media&token=80ba4c1e-ba6c-41a5-aeaa-262f1adcc782",
      imgid: "22cc4387-1823-49f2-a582-fbb171aa722e",
    },
    {
      name: "lolololol",
      description: "iau widua wiud aihw diae ifh aei d",
      price: "9000",
      category: ["2"],
      oferta: "1500",
      marcaId: "6",
      productIMG:
        "https://firebasestorage.googleapis.com/v0/b/my-first-project-a3ad3.appspot.com/o/81f2428b-32ac-4c34-8c03-0cc6f2517f19?alt=media&token=129dd8da-bb54-4343-be51-6bfbc44652c4",
      imgid: "81f2428b-32ac-4c34-8c03-0cc6f2517f19",
    },
    {
      name: "awdiau wdia wdi",
      description: "iua iwud aiuw dau wid efh aiwj diha ediha widj",
      price: "4000",
      category: ["2", "4"],
      oferta: "500",
      marcaId: "4",
      productIMG:
        "https://firebasestorage.googleapis.com/v0/b/my-first-project-a3ad3.appspot.com/o/93f47606-9471-4662-a834-347bfcce1925?alt=media&token=82561c48-617f-4147-bce9-292b476599ae",
      imgid: "93f47606-9471-4662-a834-347bfcce1925",
    },
    {
      name: "awhd aiw diajw diajw d",
      description: "diajw dia wid awid aeijf aihw diawh dih ",
      price: "3000",
      category: ["2"],
      oferta: "100",
      marcaId: "2",
      productIMG:
        "https://firebasestorage.googleapis.com/v0/b/my-first-project-a3ad3.appspot.com/o/0720a400-8fcb-4fcb-a5c2-a81dbcc202ed?alt=media&token=c57dfb62-103d-4bdf-887b-a894b188c80d",
      imgid: "0720a400-8fcb-4fcb-a5c2-a81dbcc202ed",
    },
    {
      name: "uiw daiuw djawdka w",
      description: "kjdaw kdaj eyf aiu iauendaoiw ndoawd",
      price: "50000",
      category: ["2", "3", "4"],
      oferta: 0,
      marcaId: "2",
      productIMG:
        "https://firebasestorage.googleapis.com/v0/b/my-first-project-a3ad3.appspot.com/o/9038eb79-6289-4080-8cf1-7db65c12ad00?alt=media&token=200997ab-2605-42fc-b835-0a4779d3105e",
      imgid: "9038eb79-6289-4080-8cf1-7db65c12ad00",
    },
    {
      name: "KKKKKKK",
      description: "ij ai diajw udawhd au wdia iw",
      price: "15000",
      category: ["2", "3"],
      oferta: "1000",
      marcaId: "2",
      productIMG:
        "https://firebasestorage.googleapis.com/v0/b/my-first-project-a3ad3.appspot.com/o/9e4b7b4e-1f06-41bc-bfe2-aac6af187528?alt=media&token=0ed2e4b5-01a4-4a13-935a-0f804f62fa9c",
      imgid: "9e4b7b4e-1f06-41bc-bfe2-aac6af187528",
    },
  ];

  productos.map(async (producto) => {
    const result = await products.create(producto);
    await result.addCategory(producto.category);
  });

  //======================================//

  console.log(`-----------------------------------
Server on Port ${process.env.PORT || 4000}
DB is connected :D
-----------------------------------
`);
});
