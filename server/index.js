const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
require("dotenv").config();
const {
  database,
  users,
  rol,
  marca,
  category,
  products,
  address,
} = require("./db");
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
      verify: true,
      rolId: 1,
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

  usuario.map(async (u) => {
    await users.create(u);
  });

  const productos = [
    {
      name: "Ejemplo",
      description: "no se que son pero se vende xd",
      price: "3000",
      category: ["4"],
      oferta: "0",
      marcaId: "11",
      productIMG:
        "https://firebasestorage.googleapis.com/v0/b/my-first-project-a3ad3.appspot.com/o/932a4031-5af9-4eee-b310-8ac5a9b67f51?alt=media&token=5700d22a-d7da-4656-ad31-53e688a2cd96",
      imgid: "932a4031-5af9-4eee-b310-8ac5a9b67f51",
    },
    {
      name: "Otro Ejemplo",
      description: "no se pero tambien se vende xd",
      price: "2500",
      category: ["2"],
      oferta: "2000",
      marcaId: "4",
      productIMG:
        "https://firebasestorage.googleapis.com/v0/b/my-first-project-a3ad3.appspot.com/o/9357ee63-5c29-4f70-850f-7254aad7f3ce?alt=media&token=c7f19c99-96b0-46e3-89e5-e5439e52b1aa",
      imgid: "9357ee63-5c29-4f70-850f-7254aad7f3ce",
    },
    {
      name: "Mas Ejemplo xd",
      description: "una descripcion random",
      price: "2000",
      category: ["2", "1"],
      oferta: "30",
      marcaId: "4",
      productIMG:
        "https://firebasestorage.googleapis.com/v0/b/my-first-project-a3ad3.appspot.com/o/d4d425f4-4882-41e8-86cc-309933541416?alt=media&token=74ccdd56-357d-4193-8311-5d31bd5e2931",
      imgid: "d4d425f4-4882-41e8-86cc-309933541416",
    },
    {
      name: "Ejemplo",
      description: "awoidawoid aoiwdoawjdoiaw doiawdoiawoid",
      price: "300",
      category: ["10"],
      oferta: "0",
      marcaId: "15",
      productIMG:
        "https://firebasestorage.googleapis.com/v0/b/my-first-project-a3ad3.appspot.com/o/eed906e6-a97f-4508-a13c-355d3d259c63?alt=media&token=88bb59f7-ae2d-4442-902a-72fd8249af19",
      imgid: "eed906e6-a97f-4508-a13c-355d3d259c63",
    },
    {
      name: "Top Coat",
      description:
        "waodmaowd awodkapwoda wdkapwodpaw dapwokdawd\nawodapwpodnapw doawmdpoaw",
      price: "5000",
      category: ["1"],
      oferta: "0",
      marcaId: "5",
      productIMG:
        "https://firebasestorage.googleapis.com/v0/b/my-first-project-a3ad3.appspot.com/o/c4cfd63e-5f08-4b8d-8cc9-905240b79bc4?alt=media&token=c9942dd0-761d-49cc-8a1b-0399533a85b4",
      imgid: "c4cfd63e-5f08-4b8d-8cc9-905240b79bc4",
    },
    {
      name: "Top Matte",
      description: "apwodapowd awpdapowd\nawdaw\ndaw\ndawd\naw\nawdawd",
      price: "700",
      category: ["4"],
      oferta: "0",
      marcaId: "10",
      productIMG:
        "https://firebasestorage.googleapis.com/v0/b/my-first-project-a3ad3.appspot.com/o/526f80d5-5670-4412-9a60-826289cb244f?alt=media&token=28909175-894a-4fdb-a078-bba31e51c1e2",
      imgid: "526f80d5-5670-4412-9a60-826289cb244f",
    },
    {
      name: "No se xd",
      description: "wdawdawd\naw\nda\nwd\na\nwd\naw\nd\nawd",
      price: "800",
      category: ["3"],
      oferta: "0",
      marcaId: "4",
      productIMG:
        "https://firebasestorage.googleapis.com/v0/b/my-first-project-a3ad3.appspot.com/o/b7856e77-84cb-45d7-b5b8-02621477adcc?alt=media&token=938728f0-3f8c-4d91-926c-cbf35b5022dd",
      imgid: "b7856e77-84cb-45d7-b5b8-02621477adcc",
    },
    {
      name: "Lima",
      description: "aowidaoiwndoaw daowidnawd\nwada\nw\ndawd\nawd",
      price: "300",
      category: ["6"],
      oferta: "0",
      marcaId: "7",
      productIMG:
        "https://firebasestorage.googleapis.com/v0/b/my-first-project-a3ad3.appspot.com/o/93db13e8-39e5-4c18-a585-1c1587c41e61?alt=media&token=9bf34f10-e212-4e6b-b29a-5efd4f2d0aac",
      imgid: "93db13e8-39e5-4c18-a585-1c1587c41e61",
    },
    {
      name: "aaaaaaa",
      description:
        "awdawd\nawdawd awda wdaw \ndaw dkawñ daw dkawd\naw d\nawdkaw\ndawd",
      price: "499",
      category: ["11"],
      oferta: "0",
      marcaId: "1",
      productIMG:
        "https://firebasestorage.googleapis.com/v0/b/my-first-project-a3ad3.appspot.com/o/ded90fe0-a633-438e-b177-4014e18db862?alt=media&token=6e1a1635-d02b-4cc0-8d9a-a517b7eb871e",
      imgid: "ded90fe0-a633-438e-b177-4014e18db862",
    },
    {
      name: "Base Coat",
      description: "awdiawodnap\nw daw d\nawd awd\na wd a w\ndawd awd\na\nawd",
      price: "800",
      category: ["4"],
      oferta: "0",
      marcaId: "5",
      productIMG:
        "https://firebasestorage.googleapis.com/v0/b/my-first-project-a3ad3.appspot.com/o/369f2a57-225b-42a1-814a-d4d195d28c77?alt=media&token=e84a82db-8db5-4063-92e1-7514ff4405a0",
      imgid: "369f2a57-225b-42a1-814a-d4d195d28c77",
    },
    {
      name: "Ejemplo",
      description: "awodnaiwda\nwdawdawd\nawdawd\nwdaw\nzzzz",
      price: "900",
      category: ["5"],
      oferta: "0",
      marcaId: "11",
      productIMG:
        "https://firebasestorage.googleapis.com/v0/b/my-first-project-a3ad3.appspot.com/o/fa07a082-da04-4e2f-ab5c-43a093519d39?alt=media&token=f0fab75a-ab0b-4f72-88b1-1544af433b21",
      imgid: "fa07a082-da04-4e2f-ab5c-43a093519d39",
    },
    {
      name: "Base Coat",
      description: "awidnaowndoainwoidaw\ndawd awd\naw daw d\naw daw\nawd",
      price: "450",
      category: ["4"],
      oferta: "300",
      marcaId: "5",
      productIMG:
        "https://firebasestorage.googleapis.com/v0/b/my-first-project-a3ad3.appspot.com/o/cdcaa798-9cbd-4864-81ea-b6ae5ba09b9f?alt=media&token=525259bf-19b8-4001-bf00-fe59bc39ea81",
      imgid: "cdcaa798-9cbd-4864-81ea-b6ae5ba09b9f",
    },
    {
      name: "Ejemplo",
      description:
        "iwaondoiawd\nawdawd\nawd\nawd awdnw\na daw\nnd aw\nkmdañ\nwmd\nawd\nawd",
      price: "900",
      category: ["5"],
      oferta: "500",
      marcaId: "7",
      productIMG:
        "https://firebasestorage.googleapis.com/v0/b/my-first-project-a3ad3.appspot.com/o/beccd3c0-ba4f-4003-85e9-f56571321546?alt=media&token=81e1cab7-ccc4-4bf8-9735-25bd804631c3",
      imgid: "beccd3c0-ba4f-4003-85e9-f56571321546",
    },

    {
      name: "Ejemplo",
      description: "no se que son pero se vende xd",
      price: "3000",
      category: ["3"],
      oferta: "0",
      marcaId: "11",
      productIMG:
        "https://firebasestorage.googleapis.com/v0/b/my-first-project-a3ad3.appspot.com/o/932a4031-5af9-4eee-b310-8ac5a9b67f51?alt=media&token=5700d22a-d7da-4656-ad31-53e688a2cd96",
      imgid: "932a4031-5af9-4eee-b310-8ac5a9b67f51",
    },
    {
      name: "Otro Ejemplo",
      description: "no se pero tambien se vende xd",
      price: "2500",
      category: ["6"],
      oferta: "2000",
      marcaId: "4",
      productIMG:
        "https://firebasestorage.googleapis.com/v0/b/my-first-project-a3ad3.appspot.com/o/9357ee63-5c29-4f70-850f-7254aad7f3ce?alt=media&token=c7f19c99-96b0-46e3-89e5-e5439e52b1aa",
      imgid: "9357ee63-5c29-4f70-850f-7254aad7f3ce",
    },
    {
      name: "Mas Ejemplo xd",
      description: "una descripcion random",
      price: "2000",
      category: ["4", "3"],
      oferta: "30",
      marcaId: "4",
      productIMG:
        "https://firebasestorage.googleapis.com/v0/b/my-first-project-a3ad3.appspot.com/o/d4d425f4-4882-41e8-86cc-309933541416?alt=media&token=74ccdd56-357d-4193-8311-5d31bd5e2931",
      imgid: "d4d425f4-4882-41e8-86cc-309933541416",
    },
    {
      name: "Ejemplo",
      description: "awoidawoid aoiwdoawjdoiaw doiawdoiawoid",
      price: "300",
      category: ["9"],
      oferta: "0",
      marcaId: "15",
      productIMG:
        "https://firebasestorage.googleapis.com/v0/b/my-first-project-a3ad3.appspot.com/o/eed906e6-a97f-4508-a13c-355d3d259c63?alt=media&token=88bb59f7-ae2d-4442-902a-72fd8249af19",
      imgid: "eed906e6-a97f-4508-a13c-355d3d259c63",
    },
    {
      name: "Top Coat",
      description:
        "waodmaowd awodkapwoda wdkapwodpaw dapwokdawd\nawodapwpodnapw doawmdpoaw",
      price: "5000",
      category: ["4"],
      oferta: "0",
      marcaId: "5",
      productIMG:
        "https://firebasestorage.googleapis.com/v0/b/my-first-project-a3ad3.appspot.com/o/c4cfd63e-5f08-4b8d-8cc9-905240b79bc4?alt=media&token=c9942dd0-761d-49cc-8a1b-0399533a85b4",
      imgid: "c4cfd63e-5f08-4b8d-8cc9-905240b79bc4",
    },
    {
      name: "Top Matte",
      description: "apwodapowd awpdapowd\nawdaw\ndaw\ndawd\naw\nawdawd",
      price: "700",
      category: ["2"],
      oferta: "0",
      marcaId: "10",
      productIMG:
        "https://firebasestorage.googleapis.com/v0/b/my-first-project-a3ad3.appspot.com/o/526f80d5-5670-4412-9a60-826289cb244f?alt=media&token=28909175-894a-4fdb-a078-bba31e51c1e2",
      imgid: "526f80d5-5670-4412-9a60-826289cb244f",
    },
    {
      name: "No se xd",
      description: "wdawdawd\naw\nda\nwd\na\nwd\naw\nd\nawd",
      price: "800",
      category: ["5"],
      oferta: "0",
      marcaId: "4",
      productIMG:
        "https://firebasestorage.googleapis.com/v0/b/my-first-project-a3ad3.appspot.com/o/b7856e77-84cb-45d7-b5b8-02621477adcc?alt=media&token=938728f0-3f8c-4d91-926c-cbf35b5022dd",
      imgid: "b7856e77-84cb-45d7-b5b8-02621477adcc",
    },
    {
      name: "Lima",
      description: "aowidaoiwndoaw daowidnawd\nwada\nw\ndawd\nawd",
      price: "300",
      category: ["8"],
      oferta: "0",
      marcaId: "7",
      productIMG:
        "https://firebasestorage.googleapis.com/v0/b/my-first-project-a3ad3.appspot.com/o/93db13e8-39e5-4c18-a585-1c1587c41e61?alt=media&token=9bf34f10-e212-4e6b-b29a-5efd4f2d0aac",
      imgid: "93db13e8-39e5-4c18-a585-1c1587c41e61",
    },
    {
      name: "aaaaaaa",
      description:
        "awdawd\nawdawd awda wdaw \ndaw dkawñ daw dkawd\naw d\nawdkaw\ndawd",
      price: "499",
      category: ["1"],
      oferta: "0",
      marcaId: "1",
      productIMG:
        "https://firebasestorage.googleapis.com/v0/b/my-first-project-a3ad3.appspot.com/o/ded90fe0-a633-438e-b177-4014e18db862?alt=media&token=6e1a1635-d02b-4cc0-8d9a-a517b7eb871e",
      imgid: "ded90fe0-a633-438e-b177-4014e18db862",
    },
    {
      name: "Base Coat",
      description: "awdiawodnap\nw daw d\nawd awd\na wd a w\ndawd awd\na\nawd",
      price: "800",
      category: ["3"],
      oferta: "0",
      marcaId: "5",
      productIMG:
        "https://firebasestorage.googleapis.com/v0/b/my-first-project-a3ad3.appspot.com/o/369f2a57-225b-42a1-814a-d4d195d28c77?alt=media&token=e84a82db-8db5-4063-92e1-7514ff4405a0",
      imgid: "369f2a57-225b-42a1-814a-d4d195d28c77",
    },
    {
      name: "Ejemplo",
      description: "awodnaiwda\nwdawdawd\nawdawd\nwdaw\nzzzz",
      price: "900",
      category: ["7"],
      oferta: "0",
      marcaId: "11",
      productIMG:
        "https://firebasestorage.googleapis.com/v0/b/my-first-project-a3ad3.appspot.com/o/fa07a082-da04-4e2f-ab5c-43a093519d39?alt=media&token=f0fab75a-ab0b-4f72-88b1-1544af433b21",
      imgid: "fa07a082-da04-4e2f-ab5c-43a093519d39",
    },
    {
      name: "Base Coat",
      description: "awidnaowndoainwoidaw\ndawd awd\naw daw d\naw daw\nawd",
      price: "450",
      category: ["1"],
      oferta: "300",
      marcaId: "5",
      productIMG:
        "https://firebasestorage.googleapis.com/v0/b/my-first-project-a3ad3.appspot.com/o/cdcaa798-9cbd-4864-81ea-b6ae5ba09b9f?alt=media&token=525259bf-19b8-4001-bf00-fe59bc39ea81",
      imgid: "cdcaa798-9cbd-4864-81ea-b6ae5ba09b9f",
    },
    {
      name: "Ejemplo",
      description:
        "iwaondoiawd\nawdawd\nawd\nawd awdnw\na daw\nnd aw\nkmdañ\nwmd\nawd\nawd",
      price: "900",
      category: ["3"],
      oferta: "500",
      marcaId: "7",
      productIMG:
        "https://firebasestorage.googleapis.com/v0/b/my-first-project-a3ad3.appspot.com/o/beccd3c0-ba4f-4003-85e9-f56571321546?alt=media&token=81e1cab7-ccc4-4bf8-9735-25bd804631c3",
      imgid: "beccd3c0-ba4f-4003-85e9-f56571321546",
    },
    {
      name: "Ejemplo",
      description: "no se que son pero se vende xd",
      price: "3000",
      category: ["4"],
      oferta: "0",
      marcaId: "11",
      productIMG:
        "https://firebasestorage.googleapis.com/v0/b/my-first-project-a3ad3.appspot.com/o/932a4031-5af9-4eee-b310-8ac5a9b67f51?alt=media&token=5700d22a-d7da-4656-ad31-53e688a2cd96",
      imgid: "932a4031-5af9-4eee-b310-8ac5a9b67f51",
    },
    {
      name: "Otro Ejemplo",
      description: "no se pero tambien se vende xd",
      price: "2500",
      category: ["2"],
      oferta: "2000",
      marcaId: "4",
      productIMG:
        "https://firebasestorage.googleapis.com/v0/b/my-first-project-a3ad3.appspot.com/o/9357ee63-5c29-4f70-850f-7254aad7f3ce?alt=media&token=c7f19c99-96b0-46e3-89e5-e5439e52b1aa",
      imgid: "9357ee63-5c29-4f70-850f-7254aad7f3ce",
    },
    {
      name: "Mas Ejemplo xd",
      description: "una descripcion random",
      price: "2000",
      category: ["2", "1"],
      oferta: "30",
      marcaId: "4",
      productIMG:
        "https://firebasestorage.googleapis.com/v0/b/my-first-project-a3ad3.appspot.com/o/d4d425f4-4882-41e8-86cc-309933541416?alt=media&token=74ccdd56-357d-4193-8311-5d31bd5e2931",
      imgid: "d4d425f4-4882-41e8-86cc-309933541416",
    },
    {
      name: "Ejemplo",
      description: "awoidawoid aoiwdoawjdoiaw doiawdoiawoid",
      price: "300",
      category: ["10"],
      oferta: "0",
      marcaId: "15",
      productIMG:
        "https://firebasestorage.googleapis.com/v0/b/my-first-project-a3ad3.appspot.com/o/eed906e6-a97f-4508-a13c-355d3d259c63?alt=media&token=88bb59f7-ae2d-4442-902a-72fd8249af19",
      imgid: "eed906e6-a97f-4508-a13c-355d3d259c63",
    },
    {
      name: "Top Coat",
      description:
        "waodmaowd awodkapwoda wdkapwodpaw dapwokdawd\nawodapwpodnapw doawmdpoaw",
      price: "5000",
      category: ["1"],
      oferta: "0",
      marcaId: "5",
      productIMG:
        "https://firebasestorage.googleapis.com/v0/b/my-first-project-a3ad3.appspot.com/o/c4cfd63e-5f08-4b8d-8cc9-905240b79bc4?alt=media&token=c9942dd0-761d-49cc-8a1b-0399533a85b4",
      imgid: "c4cfd63e-5f08-4b8d-8cc9-905240b79bc4",
    },
    {
      name: "Top Matte",
      description: "apwodapowd awpdapowd\nawdaw\ndaw\ndawd\naw\nawdawd",
      price: "700",
      category: ["4"],
      oferta: "0",
      marcaId: "10",
      productIMG:
        "https://firebasestorage.googleapis.com/v0/b/my-first-project-a3ad3.appspot.com/o/526f80d5-5670-4412-9a60-826289cb244f?alt=media&token=28909175-894a-4fdb-a078-bba31e51c1e2",
      imgid: "526f80d5-5670-4412-9a60-826289cb244f",
    },
    {
      name: "No se xd",
      description: "wdawdawd\naw\nda\nwd\na\nwd\naw\nd\nawd",
      price: "800",
      category: ["3"],
      oferta: "0",
      marcaId: "4",
      productIMG:
        "https://firebasestorage.googleapis.com/v0/b/my-first-project-a3ad3.appspot.com/o/b7856e77-84cb-45d7-b5b8-02621477adcc?alt=media&token=938728f0-3f8c-4d91-926c-cbf35b5022dd",
      imgid: "b7856e77-84cb-45d7-b5b8-02621477adcc",
    },
    {
      name: "Lima",
      description: "aowidaoiwndoaw daowidnawd\nwada\nw\ndawd\nawd",
      price: "300",
      category: ["6"],
      oferta: "0",
      marcaId: "7",
      productIMG:
        "https://firebasestorage.googleapis.com/v0/b/my-first-project-a3ad3.appspot.com/o/93db13e8-39e5-4c18-a585-1c1587c41e61?alt=media&token=9bf34f10-e212-4e6b-b29a-5efd4f2d0aac",
      imgid: "93db13e8-39e5-4c18-a585-1c1587c41e61",
    },
    {
      name: "aaaaaaa",
      description:
        "awdawd\nawdawd awda wdaw \ndaw dkawñ daw dkawd\naw d\nawdkaw\ndawd",
      price: "499",
      category: ["11"],
      oferta: "0",
      marcaId: "1",
      productIMG:
        "https://firebasestorage.googleapis.com/v0/b/my-first-project-a3ad3.appspot.com/o/ded90fe0-a633-438e-b177-4014e18db862?alt=media&token=6e1a1635-d02b-4cc0-8d9a-a517b7eb871e",
      imgid: "ded90fe0-a633-438e-b177-4014e18db862",
    },
    {
      name: "Base Coat",
      description: "awdiawodnap\nw daw d\nawd awd\na wd a w\ndawd awd\na\nawd",
      price: "800",
      category: ["4"],
      oferta: "0",
      marcaId: "5",
      productIMG:
        "https://firebasestorage.googleapis.com/v0/b/my-first-project-a3ad3.appspot.com/o/369f2a57-225b-42a1-814a-d4d195d28c77?alt=media&token=e84a82db-8db5-4063-92e1-7514ff4405a0",
      imgid: "369f2a57-225b-42a1-814a-d4d195d28c77",
    },
    {
      name: "Ejemplo",
      description: "awodnaiwda\nwdawdawd\nawdawd\nwdaw\nzzzz",
      price: "900",
      category: ["5"],
      oferta: "0",
      marcaId: "11",
      productIMG:
        "https://firebasestorage.googleapis.com/v0/b/my-first-project-a3ad3.appspot.com/o/fa07a082-da04-4e2f-ab5c-43a093519d39?alt=media&token=f0fab75a-ab0b-4f72-88b1-1544af433b21",
      imgid: "fa07a082-da04-4e2f-ab5c-43a093519d39",
    },
    {
      name: "Base Coat",
      description: "awidnaowndoainwoidaw\ndawd awd\naw daw d\naw daw\nawd",
      price: "450",
      category: ["4"],
      oferta: "300",
      marcaId: "5",
      productIMG:
        "https://firebasestorage.googleapis.com/v0/b/my-first-project-a3ad3.appspot.com/o/cdcaa798-9cbd-4864-81ea-b6ae5ba09b9f?alt=media&token=525259bf-19b8-4001-bf00-fe59bc39ea81",
      imgid: "cdcaa798-9cbd-4864-81ea-b6ae5ba09b9f",
    },
    {
      name: "Ejemplo",
      description:
        "iwaondoiawd\nawdawd\nawd\nawd awdnw\na daw\nnd aw\nkmdañ\nwmd\nawd\nawd",
      price: "900",
      category: ["5"],
      oferta: "500",
      marcaId: "7",
      productIMG:
        "https://firebasestorage.googleapis.com/v0/b/my-first-project-a3ad3.appspot.com/o/beccd3c0-ba4f-4003-85e9-f56571321546?alt=media&token=81e1cab7-ccc4-4bf8-9735-25bd804631c3",
      imgid: "beccd3c0-ba4f-4003-85e9-f56571321546",
    },

    {
      name: "Ejemplo",
      description: "no se que son pero se vende xd",
      price: "3000",
      category: ["3"],
      oferta: "0",
      marcaId: "11",
      productIMG:
        "https://firebasestorage.googleapis.com/v0/b/my-first-project-a3ad3.appspot.com/o/932a4031-5af9-4eee-b310-8ac5a9b67f51?alt=media&token=5700d22a-d7da-4656-ad31-53e688a2cd96",
      imgid: "932a4031-5af9-4eee-b310-8ac5a9b67f51",
    },
    {
      name: "Otro Ejemplo",
      description: "no se pero tambien se vende xd",
      price: "2500",
      category: ["6"],
      oferta: "2000",
      marcaId: "4",
      productIMG:
        "https://firebasestorage.googleapis.com/v0/b/my-first-project-a3ad3.appspot.com/o/9357ee63-5c29-4f70-850f-7254aad7f3ce?alt=media&token=c7f19c99-96b0-46e3-89e5-e5439e52b1aa",
      imgid: "9357ee63-5c29-4f70-850f-7254aad7f3ce",
    },
    {
      name: "Mas Ejemplo xd",
      description: "una descripcion random",
      price: "2000",
      category: ["4", "3"],
      oferta: "30",
      marcaId: "4",
      productIMG:
        "https://firebasestorage.googleapis.com/v0/b/my-first-project-a3ad3.appspot.com/o/d4d425f4-4882-41e8-86cc-309933541416?alt=media&token=74ccdd56-357d-4193-8311-5d31bd5e2931",
      imgid: "d4d425f4-4882-41e8-86cc-309933541416",
    },
    {
      name: "Ejemplo",
      description: "awoidawoid aoiwdoawjdoiaw doiawdoiawoid",
      price: "300",
      category: ["9"],
      oferta: "0",
      marcaId: "15",
      productIMG:
        "https://firebasestorage.googleapis.com/v0/b/my-first-project-a3ad3.appspot.com/o/eed906e6-a97f-4508-a13c-355d3d259c63?alt=media&token=88bb59f7-ae2d-4442-902a-72fd8249af19",
      imgid: "eed906e6-a97f-4508-a13c-355d3d259c63",
    },
    {
      name: "Top Coat",
      description:
        "waodmaowd awodkapwoda wdkapwodpaw dapwokdawd\nawodapwpodnapw doawmdpoaw",
      price: "5000",
      category: ["4"],
      oferta: "0",
      marcaId: "5",
      productIMG:
        "https://firebasestorage.googleapis.com/v0/b/my-first-project-a3ad3.appspot.com/o/c4cfd63e-5f08-4b8d-8cc9-905240b79bc4?alt=media&token=c9942dd0-761d-49cc-8a1b-0399533a85b4",
      imgid: "c4cfd63e-5f08-4b8d-8cc9-905240b79bc4",
    },
    {
      name: "Top Matte",
      description: "apwodapowd awpdapowd\nawdaw\ndaw\ndawd\naw\nawdawd",
      price: "700",
      category: ["2"],
      oferta: "0",
      marcaId: "10",
      productIMG:
        "https://firebasestorage.googleapis.com/v0/b/my-first-project-a3ad3.appspot.com/o/526f80d5-5670-4412-9a60-826289cb244f?alt=media&token=28909175-894a-4fdb-a078-bba31e51c1e2",
      imgid: "526f80d5-5670-4412-9a60-826289cb244f",
    },
    {
      name: "No se xd",
      description: "wdawdawd\naw\nda\nwd\na\nwd\naw\nd\nawd",
      price: "800",
      category: ["5"],
      oferta: "0",
      marcaId: "4",
      productIMG:
        "https://firebasestorage.googleapis.com/v0/b/my-first-project-a3ad3.appspot.com/o/b7856e77-84cb-45d7-b5b8-02621477adcc?alt=media&token=938728f0-3f8c-4d91-926c-cbf35b5022dd",
      imgid: "b7856e77-84cb-45d7-b5b8-02621477adcc",
    },
    {
      name: "Lima",
      description: "aowidaoiwndoaw daowidnawd\nwada\nw\ndawd\nawd",
      price: "300",
      category: ["8"],
      oferta: "0",
      marcaId: "7",
      productIMG:
        "https://firebasestorage.googleapis.com/v0/b/my-first-project-a3ad3.appspot.com/o/93db13e8-39e5-4c18-a585-1c1587c41e61?alt=media&token=9bf34f10-e212-4e6b-b29a-5efd4f2d0aac",
      imgid: "93db13e8-39e5-4c18-a585-1c1587c41e61",
    },
    {
      name: "aaaaaaa",
      description:
        "awdawd\nawdawd awda wdaw \ndaw dkawñ daw dkawd\naw d\nawdkaw\ndawd",
      price: "499",
      category: ["1"],
      oferta: "0",
      marcaId: "1",
      productIMG:
        "https://firebasestorage.googleapis.com/v0/b/my-first-project-a3ad3.appspot.com/o/ded90fe0-a633-438e-b177-4014e18db862?alt=media&token=6e1a1635-d02b-4cc0-8d9a-a517b7eb871e",
      imgid: "ded90fe0-a633-438e-b177-4014e18db862",
    },
    {
      name: "Base Coat",
      description: "awdiawodnap\nw daw d\nawd awd\na wd a w\ndawd awd\na\nawd",
      price: "800",
      category: ["3"],
      oferta: "0",
      marcaId: "5",
      productIMG:
        "https://firebasestorage.googleapis.com/v0/b/my-first-project-a3ad3.appspot.com/o/369f2a57-225b-42a1-814a-d4d195d28c77?alt=media&token=e84a82db-8db5-4063-92e1-7514ff4405a0",
      imgid: "369f2a57-225b-42a1-814a-d4d195d28c77",
    },
    {
      name: "Ejemplo",
      description: "awodnaiwda\nwdawdawd\nawdawd\nwdaw\nzzzz",
      price: "900",
      category: ["7"],
      oferta: "0",
      marcaId: "11",
      productIMG:
        "https://firebasestorage.googleapis.com/v0/b/my-first-project-a3ad3.appspot.com/o/fa07a082-da04-4e2f-ab5c-43a093519d39?alt=media&token=f0fab75a-ab0b-4f72-88b1-1544af433b21",
      imgid: "fa07a082-da04-4e2f-ab5c-43a093519d39",
    },
    {
      name: "Base Coat",
      description: "awidnaowndoainwoidaw\ndawd awd\naw daw d\naw daw\nawd",
      price: "450",
      category: ["1"],
      oferta: "300",
      marcaId: "5",
      productIMG:
        "https://firebasestorage.googleapis.com/v0/b/my-first-project-a3ad3.appspot.com/o/cdcaa798-9cbd-4864-81ea-b6ae5ba09b9f?alt=media&token=525259bf-19b8-4001-bf00-fe59bc39ea81",
      imgid: "cdcaa798-9cbd-4864-81ea-b6ae5ba09b9f",
    },
    {
      name: "Ejemplo",
      description:
        "iwaondoiawd\nawdawd\nawd\nawd awdnw\na daw\nnd aw\nkmdañ\nwmd\nawd\nawd",
      price: "900",
      category: ["3"],
      oferta: "500",
      marcaId: "7",
      productIMG:
        "https://firebasestorage.googleapis.com/v0/b/my-first-project-a3ad3.appspot.com/o/beccd3c0-ba4f-4003-85e9-f56571321546?alt=media&token=81e1cab7-ccc4-4bf8-9735-25bd804631c3",
      imgid: "beccd3c0-ba4f-4003-85e9-f56571321546",
    },
    {
      name: "Ejemplo",
      description: "no se que son pero se vende xd",
      price: "3000",
      category: ["4"],
      oferta: "0",
      marcaId: "11",
      productIMG:
        "https://firebasestorage.googleapis.com/v0/b/my-first-project-a3ad3.appspot.com/o/932a4031-5af9-4eee-b310-8ac5a9b67f51?alt=media&token=5700d22a-d7da-4656-ad31-53e688a2cd96",
      imgid: "932a4031-5af9-4eee-b310-8ac5a9b67f51",
    },
    {
      name: "Otro Ejemplo",
      description: "no se pero tambien se vende xd",
      price: "2500",
      category: ["2"],
      oferta: "2000",
      marcaId: "4",
      productIMG:
        "https://firebasestorage.googleapis.com/v0/b/my-first-project-a3ad3.appspot.com/o/9357ee63-5c29-4f70-850f-7254aad7f3ce?alt=media&token=c7f19c99-96b0-46e3-89e5-e5439e52b1aa",
      imgid: "9357ee63-5c29-4f70-850f-7254aad7f3ce",
    },
    {
      name: "Mas Ejemplo xd",
      description: "una descripcion random",
      price: "2000",
      category: ["2", "1"],
      oferta: "30",
      marcaId: "4",
      productIMG:
        "https://firebasestorage.googleapis.com/v0/b/my-first-project-a3ad3.appspot.com/o/d4d425f4-4882-41e8-86cc-309933541416?alt=media&token=74ccdd56-357d-4193-8311-5d31bd5e2931",
      imgid: "d4d425f4-4882-41e8-86cc-309933541416",
    },
    {
      name: "Ejemplo",
      description: "awoidawoid aoiwdoawjdoiaw doiawdoiawoid",
      price: "300",
      category: ["10"],
      oferta: "0",
      marcaId: "15",
      productIMG:
        "https://firebasestorage.googleapis.com/v0/b/my-first-project-a3ad3.appspot.com/o/eed906e6-a97f-4508-a13c-355d3d259c63?alt=media&token=88bb59f7-ae2d-4442-902a-72fd8249af19",
      imgid: "eed906e6-a97f-4508-a13c-355d3d259c63",
    },
    {
      name: "Top Coat",
      description:
        "waodmaowd awodkapwoda wdkapwodpaw dapwokdawd\nawodapwpodnapw doawmdpoaw",
      price: "5000",
      category: ["1"],
      oferta: "0",
      marcaId: "5",
      productIMG:
        "https://firebasestorage.googleapis.com/v0/b/my-first-project-a3ad3.appspot.com/o/c4cfd63e-5f08-4b8d-8cc9-905240b79bc4?alt=media&token=c9942dd0-761d-49cc-8a1b-0399533a85b4",
      imgid: "c4cfd63e-5f08-4b8d-8cc9-905240b79bc4",
    },
    {
      name: "Top Matte",
      description: "apwodapowd awpdapowd\nawdaw\ndaw\ndawd\naw\nawdawd",
      price: "700",
      category: ["4"],
      oferta: "0",
      marcaId: "10",
      productIMG:
        "https://firebasestorage.googleapis.com/v0/b/my-first-project-a3ad3.appspot.com/o/526f80d5-5670-4412-9a60-826289cb244f?alt=media&token=28909175-894a-4fdb-a078-bba31e51c1e2",
      imgid: "526f80d5-5670-4412-9a60-826289cb244f",
    },
    {
      name: "No se xd",
      description: "wdawdawd\naw\nda\nwd\na\nwd\naw\nd\nawd",
      price: "800",
      category: ["3"],
      oferta: "0",
      marcaId: "4",
      productIMG:
        "https://firebasestorage.googleapis.com/v0/b/my-first-project-a3ad3.appspot.com/o/b7856e77-84cb-45d7-b5b8-02621477adcc?alt=media&token=938728f0-3f8c-4d91-926c-cbf35b5022dd",
      imgid: "b7856e77-84cb-45d7-b5b8-02621477adcc",
    },
    {
      name: "Lima",
      description: "aowidaoiwndoaw daowidnawd\nwada\nw\ndawd\nawd",
      price: "300",
      category: ["6"],
      oferta: "0",
      marcaId: "7",
      productIMG:
        "https://firebasestorage.googleapis.com/v0/b/my-first-project-a3ad3.appspot.com/o/93db13e8-39e5-4c18-a585-1c1587c41e61?alt=media&token=9bf34f10-e212-4e6b-b29a-5efd4f2d0aac",
      imgid: "93db13e8-39e5-4c18-a585-1c1587c41e61",
    },
    {
      name: "aaaaaaa",
      description:
        "awdawd\nawdawd awda wdaw \ndaw dkawñ daw dkawd\naw d\nawdkaw\ndawd",
      price: "499",
      category: ["11"],
      oferta: "0",
      marcaId: "1",
      productIMG:
        "https://firebasestorage.googleapis.com/v0/b/my-first-project-a3ad3.appspot.com/o/ded90fe0-a633-438e-b177-4014e18db862?alt=media&token=6e1a1635-d02b-4cc0-8d9a-a517b7eb871e",
      imgid: "ded90fe0-a633-438e-b177-4014e18db862",
    },
    {
      name: "Base Coat",
      description: "awdiawodnap\nw daw d\nawd awd\na wd a w\ndawd awd\na\nawd",
      price: "800",
      category: ["4"],
      oferta: "0",
      marcaId: "5",
      productIMG:
        "https://firebasestorage.googleapis.com/v0/b/my-first-project-a3ad3.appspot.com/o/369f2a57-225b-42a1-814a-d4d195d28c77?alt=media&token=e84a82db-8db5-4063-92e1-7514ff4405a0",
      imgid: "369f2a57-225b-42a1-814a-d4d195d28c77",
    },
    {
      name: "Ejemplo",
      description: "awodnaiwda\nwdawdawd\nawdawd\nwdaw\nzzzz",
      price: "900",
      category: ["5"],
      oferta: "0",
      marcaId: "11",
      productIMG:
        "https://firebasestorage.googleapis.com/v0/b/my-first-project-a3ad3.appspot.com/o/fa07a082-da04-4e2f-ab5c-43a093519d39?alt=media&token=f0fab75a-ab0b-4f72-88b1-1544af433b21",
      imgid: "fa07a082-da04-4e2f-ab5c-43a093519d39",
    },
    {
      name: "Base Coat",
      description: "awidnaowndoainwoidaw\ndawd awd\naw daw d\naw daw\nawd",
      price: "450",
      category: ["4"],
      oferta: "300",
      marcaId: "5",
      productIMG:
        "https://firebasestorage.googleapis.com/v0/b/my-first-project-a3ad3.appspot.com/o/cdcaa798-9cbd-4864-81ea-b6ae5ba09b9f?alt=media&token=525259bf-19b8-4001-bf00-fe59bc39ea81",
      imgid: "cdcaa798-9cbd-4864-81ea-b6ae5ba09b9f",
    },
    {
      name: "Ejemplo",
      description:
        "iwaondoiawd\nawdawd\nawd\nawd awdnw\na daw\nnd aw\nkmdañ\nwmd\nawd\nawd",
      price: "900",
      category: ["5"],
      oferta: "500",
      marcaId: "7",
      productIMG:
        "https://firebasestorage.googleapis.com/v0/b/my-first-project-a3ad3.appspot.com/o/beccd3c0-ba4f-4003-85e9-f56571321546?alt=media&token=81e1cab7-ccc4-4bf8-9735-25bd804631c3",
      imgid: "beccd3c0-ba4f-4003-85e9-f56571321546",
    },

    {
      name: "Ejemplo",
      description: "no se que son pero se vende xd",
      price: "3000",
      category: ["3"],
      oferta: "0",
      marcaId: "11",
      productIMG:
        "https://firebasestorage.googleapis.com/v0/b/my-first-project-a3ad3.appspot.com/o/932a4031-5af9-4eee-b310-8ac5a9b67f51?alt=media&token=5700d22a-d7da-4656-ad31-53e688a2cd96",
      imgid: "932a4031-5af9-4eee-b310-8ac5a9b67f51",
    },
    {
      name: "Otro Ejemplo",
      description: "no se pero tambien se vende xd",
      price: "2500",
      category: ["6"],
      oferta: "2000",
      marcaId: "4",
      productIMG:
        "https://firebasestorage.googleapis.com/v0/b/my-first-project-a3ad3.appspot.com/o/9357ee63-5c29-4f70-850f-7254aad7f3ce?alt=media&token=c7f19c99-96b0-46e3-89e5-e5439e52b1aa",
      imgid: "9357ee63-5c29-4f70-850f-7254aad7f3ce",
    },
    {
      name: "Mas Ejemplo xd",
      description: "una descripcion random",
      price: "2000",
      category: ["4", "3"],
      oferta: "30",
      marcaId: "4",
      productIMG:
        "https://firebasestorage.googleapis.com/v0/b/my-first-project-a3ad3.appspot.com/o/d4d425f4-4882-41e8-86cc-309933541416?alt=media&token=74ccdd56-357d-4193-8311-5d31bd5e2931",
      imgid: "d4d425f4-4882-41e8-86cc-309933541416",
    },
    {
      name: "Ejemplo",
      description: "awoidawoid aoiwdoawjdoiaw doiawdoiawoid",
      price: "300",
      category: ["9"],
      oferta: "0",
      marcaId: "15",
      productIMG:
        "https://firebasestorage.googleapis.com/v0/b/my-first-project-a3ad3.appspot.com/o/eed906e6-a97f-4508-a13c-355d3d259c63?alt=media&token=88bb59f7-ae2d-4442-902a-72fd8249af19",
      imgid: "eed906e6-a97f-4508-a13c-355d3d259c63",
    },
    {
      name: "Top Coat",
      description:
        "waodmaowd awodkapwoda wdkapwodpaw dapwokdawd\nawodapwpodnapw doawmdpoaw",
      price: "5000",
      category: ["4"],
      oferta: "0",
      marcaId: "5",
      productIMG:
        "https://firebasestorage.googleapis.com/v0/b/my-first-project-a3ad3.appspot.com/o/c4cfd63e-5f08-4b8d-8cc9-905240b79bc4?alt=media&token=c9942dd0-761d-49cc-8a1b-0399533a85b4",
      imgid: "c4cfd63e-5f08-4b8d-8cc9-905240b79bc4",
    },
    {
      name: "Top Matte",
      description: "apwodapowd awpdapowd\nawdaw\ndaw\ndawd\naw\nawdawd",
      price: "700",
      category: ["2"],
      oferta: "0",
      marcaId: "10",
      productIMG:
        "https://firebasestorage.googleapis.com/v0/b/my-first-project-a3ad3.appspot.com/o/526f80d5-5670-4412-9a60-826289cb244f?alt=media&token=28909175-894a-4fdb-a078-bba31e51c1e2",
      imgid: "526f80d5-5670-4412-9a60-826289cb244f",
    },
    {
      name: "No se xd",
      description: "wdawdawd\naw\nda\nwd\na\nwd\naw\nd\nawd",
      price: "800",
      category: ["5"],
      oferta: "0",
      marcaId: "4",
      productIMG:
        "https://firebasestorage.googleapis.com/v0/b/my-first-project-a3ad3.appspot.com/o/b7856e77-84cb-45d7-b5b8-02621477adcc?alt=media&token=938728f0-3f8c-4d91-926c-cbf35b5022dd",
      imgid: "b7856e77-84cb-45d7-b5b8-02621477adcc",
    },
    {
      name: "Lima",
      description: "aowidaoiwndoaw daowidnawd\nwada\nw\ndawd\nawd",
      price: "300",
      category: ["8"],
      oferta: "0",
      marcaId: "7",
      productIMG:
        "https://firebasestorage.googleapis.com/v0/b/my-first-project-a3ad3.appspot.com/o/93db13e8-39e5-4c18-a585-1c1587c41e61?alt=media&token=9bf34f10-e212-4e6b-b29a-5efd4f2d0aac",
      imgid: "93db13e8-39e5-4c18-a585-1c1587c41e61",
    },
    {
      name: "aaaaaaa",
      description:
        "awdawd\nawdawd awda wdaw \ndaw dkawñ daw dkawd\naw d\nawdkaw\ndawd",
      price: "499",
      category: ["1"],
      oferta: "0",
      marcaId: "1",
      productIMG:
        "https://firebasestorage.googleapis.com/v0/b/my-first-project-a3ad3.appspot.com/o/ded90fe0-a633-438e-b177-4014e18db862?alt=media&token=6e1a1635-d02b-4cc0-8d9a-a517b7eb871e",
      imgid: "ded90fe0-a633-438e-b177-4014e18db862",
    },
    {
      name: "Base Coat",
      description: "awdiawodnap\nw daw d\nawd awd\na wd a w\ndawd awd\na\nawd",
      price: "800",
      category: ["3"],
      oferta: "0",
      marcaId: "5",
      productIMG:
        "https://firebasestorage.googleapis.com/v0/b/my-first-project-a3ad3.appspot.com/o/369f2a57-225b-42a1-814a-d4d195d28c77?alt=media&token=e84a82db-8db5-4063-92e1-7514ff4405a0",
      imgid: "369f2a57-225b-42a1-814a-d4d195d28c77",
    },
    {
      name: "Ejemplo",
      description: "awodnaiwda\nwdawdawd\nawdawd\nwdaw\nzzzz",
      price: "900",
      category: ["7"],
      oferta: "0",
      marcaId: "11",
      productIMG:
        "https://firebasestorage.googleapis.com/v0/b/my-first-project-a3ad3.appspot.com/o/fa07a082-da04-4e2f-ab5c-43a093519d39?alt=media&token=f0fab75a-ab0b-4f72-88b1-1544af433b21",
      imgid: "fa07a082-da04-4e2f-ab5c-43a093519d39",
    },
    {
      name: "Base Coat",
      description: "awidnaowndoainwoidaw\ndawd awd\naw daw d\naw daw\nawd",
      price: "450",
      category: ["1"],
      oferta: "300",
      marcaId: "5",
      productIMG:
        "https://firebasestorage.googleapis.com/v0/b/my-first-project-a3ad3.appspot.com/o/cdcaa798-9cbd-4864-81ea-b6ae5ba09b9f?alt=media&token=525259bf-19b8-4001-bf00-fe59bc39ea81",
      imgid: "cdcaa798-9cbd-4864-81ea-b6ae5ba09b9f",
    },
    {
      name: "Ejemplo",
      description:
        "iwaondoiawd\nawdawd\nawd\nawd awdnw\na daw\nnd aw\nkmdañ\nwmd\nawd\nawd",
      price: "900",
      category: ["3"],
      oferta: "500",
      marcaId: "7",
      productIMG:
        "https://firebasestorage.googleapis.com/v0/b/my-first-project-a3ad3.appspot.com/o/beccd3c0-ba4f-4003-85e9-f56571321546?alt=media&token=81e1cab7-ccc4-4bf8-9735-25bd804631c3",
      imgid: "beccd3c0-ba4f-4003-85e9-f56571321546",
    },
    {
      name: "Ejemplo",
      description: "no se que son pero se vende xd",
      price: "3000",
      category: ["4"],
      oferta: "0",
      marcaId: "11",
      productIMG:
        "https://firebasestorage.googleapis.com/v0/b/my-first-project-a3ad3.appspot.com/o/932a4031-5af9-4eee-b310-8ac5a9b67f51?alt=media&token=5700d22a-d7da-4656-ad31-53e688a2cd96",
      imgid: "932a4031-5af9-4eee-b310-8ac5a9b67f51",
    },
    {
      name: "Otro Ejemplo",
      description: "no se pero tambien se vende xd",
      price: "2500",
      category: ["2"],
      oferta: "2000",
      marcaId: "4",
      productIMG:
        "https://firebasestorage.googleapis.com/v0/b/my-first-project-a3ad3.appspot.com/o/9357ee63-5c29-4f70-850f-7254aad7f3ce?alt=media&token=c7f19c99-96b0-46e3-89e5-e5439e52b1aa",
      imgid: "9357ee63-5c29-4f70-850f-7254aad7f3ce",
    },
    {
      name: "Mas Ejemplo xd",
      description: "una descripcion random",
      price: "2000",
      category: ["2", "1"],
      oferta: "30",
      marcaId: "4",
      productIMG:
        "https://firebasestorage.googleapis.com/v0/b/my-first-project-a3ad3.appspot.com/o/d4d425f4-4882-41e8-86cc-309933541416?alt=media&token=74ccdd56-357d-4193-8311-5d31bd5e2931",
      imgid: "d4d425f4-4882-41e8-86cc-309933541416",
    },
    {
      name: "Ejemplo",
      description: "awoidawoid aoiwdoawjdoiaw doiawdoiawoid",
      price: "300",
      category: ["10"],
      oferta: "0",
      marcaId: "15",
      productIMG:
        "https://firebasestorage.googleapis.com/v0/b/my-first-project-a3ad3.appspot.com/o/eed906e6-a97f-4508-a13c-355d3d259c63?alt=media&token=88bb59f7-ae2d-4442-902a-72fd8249af19",
      imgid: "eed906e6-a97f-4508-a13c-355d3d259c63",
    },
    {
      name: "Top Coat",
      description:
        "waodmaowd awodkapwoda wdkapwodpaw dapwokdawd\nawodapwpodnapw doawmdpoaw",
      price: "5000",
      category: ["1"],
      oferta: "0",
      marcaId: "5",
      productIMG:
        "https://firebasestorage.googleapis.com/v0/b/my-first-project-a3ad3.appspot.com/o/c4cfd63e-5f08-4b8d-8cc9-905240b79bc4?alt=media&token=c9942dd0-761d-49cc-8a1b-0399533a85b4",
      imgid: "c4cfd63e-5f08-4b8d-8cc9-905240b79bc4",
    },
    {
      name: "Top Matte",
      description: "apwodapowd awpdapowd\nawdaw\ndaw\ndawd\naw\nawdawd",
      price: "700",
      category: ["4"],
      oferta: "0",
      marcaId: "10",
      productIMG:
        "https://firebasestorage.googleapis.com/v0/b/my-first-project-a3ad3.appspot.com/o/526f80d5-5670-4412-9a60-826289cb244f?alt=media&token=28909175-894a-4fdb-a078-bba31e51c1e2",
      imgid: "526f80d5-5670-4412-9a60-826289cb244f",
    },
    {
      name: "No se xd",
      description: "wdawdawd\naw\nda\nwd\na\nwd\naw\nd\nawd",
      price: "800",
      category: ["3"],
      oferta: "0",
      marcaId: "4",
      productIMG:
        "https://firebasestorage.googleapis.com/v0/b/my-first-project-a3ad3.appspot.com/o/b7856e77-84cb-45d7-b5b8-02621477adcc?alt=media&token=938728f0-3f8c-4d91-926c-cbf35b5022dd",
      imgid: "b7856e77-84cb-45d7-b5b8-02621477adcc",
    },
    {
      name: "Lima",
      description: "aowidaoiwndoaw daowidnawd\nwada\nw\ndawd\nawd",
      price: "300",
      category: ["6"],
      oferta: "0",
      marcaId: "7",
      productIMG:
        "https://firebasestorage.googleapis.com/v0/b/my-first-project-a3ad3.appspot.com/o/93db13e8-39e5-4c18-a585-1c1587c41e61?alt=media&token=9bf34f10-e212-4e6b-b29a-5efd4f2d0aac",
      imgid: "93db13e8-39e5-4c18-a585-1c1587c41e61",
    },
    {
      name: "aaaaaaa",
      description:
        "awdawd\nawdawd awda wdaw \ndaw dkawñ daw dkawd\naw d\nawdkaw\ndawd",
      price: "499",
      category: ["11"],
      oferta: "0",
      marcaId: "1",
      productIMG:
        "https://firebasestorage.googleapis.com/v0/b/my-first-project-a3ad3.appspot.com/o/ded90fe0-a633-438e-b177-4014e18db862?alt=media&token=6e1a1635-d02b-4cc0-8d9a-a517b7eb871e",
      imgid: "ded90fe0-a633-438e-b177-4014e18db862",
    },
    {
      name: "Base Coat",
      description: "awdiawodnap\nw daw d\nawd awd\na wd a w\ndawd awd\na\nawd",
      price: "800",
      category: ["4"],
      oferta: "0",
      marcaId: "5",
      productIMG:
        "https://firebasestorage.googleapis.com/v0/b/my-first-project-a3ad3.appspot.com/o/369f2a57-225b-42a1-814a-d4d195d28c77?alt=media&token=e84a82db-8db5-4063-92e1-7514ff4405a0",
      imgid: "369f2a57-225b-42a1-814a-d4d195d28c77",
    },
    {
      name: "Ejemplo",
      description: "awodnaiwda\nwdawdawd\nawdawd\nwdaw\nzzzz",
      price: "900",
      category: ["5"],
      oferta: "0",
      marcaId: "11",
      productIMG:
        "https://firebasestorage.googleapis.com/v0/b/my-first-project-a3ad3.appspot.com/o/fa07a082-da04-4e2f-ab5c-43a093519d39?alt=media&token=f0fab75a-ab0b-4f72-88b1-1544af433b21",
      imgid: "fa07a082-da04-4e2f-ab5c-43a093519d39",
    },
    {
      name: "Base Coat",
      description: "awidnaowndoainwoidaw\ndawd awd\naw daw d\naw daw\nawd",
      price: "450",
      category: ["4"],
      oferta: "300",
      marcaId: "5",
      productIMG:
        "https://firebasestorage.googleapis.com/v0/b/my-first-project-a3ad3.appspot.com/o/cdcaa798-9cbd-4864-81ea-b6ae5ba09b9f?alt=media&token=525259bf-19b8-4001-bf00-fe59bc39ea81",
      imgid: "cdcaa798-9cbd-4864-81ea-b6ae5ba09b9f",
    },
    {
      name: "Ejemplo",
      description:
        "iwaondoiawd\nawdawd\nawd\nawd awdnw\na daw\nnd aw\nkmdañ\nwmd\nawd\nawd",
      price: "900",
      category: ["5"],
      oferta: "500",
      marcaId: "7",
      productIMG:
        "https://firebasestorage.googleapis.com/v0/b/my-first-project-a3ad3.appspot.com/o/beccd3c0-ba4f-4003-85e9-f56571321546?alt=media&token=81e1cab7-ccc4-4bf8-9735-25bd804631c3",
      imgid: "beccd3c0-ba4f-4003-85e9-f56571321546",
    },

    {
      name: "Ejemplo",
      description: "no se que son pero se vende xd",
      price: "3000",
      category: ["3"],
      oferta: "0",
      marcaId: "11",
      productIMG:
        "https://firebasestorage.googleapis.com/v0/b/my-first-project-a3ad3.appspot.com/o/932a4031-5af9-4eee-b310-8ac5a9b67f51?alt=media&token=5700d22a-d7da-4656-ad31-53e688a2cd96",
      imgid: "932a4031-5af9-4eee-b310-8ac5a9b67f51",
    },
    {
      name: "Otro Ejemplo",
      description: "no se pero tambien se vende xd",
      price: "2500",
      category: ["6"],
      oferta: "2000",
      marcaId: "4",
      productIMG:
        "https://firebasestorage.googleapis.com/v0/b/my-first-project-a3ad3.appspot.com/o/9357ee63-5c29-4f70-850f-7254aad7f3ce?alt=media&token=c7f19c99-96b0-46e3-89e5-e5439e52b1aa",
      imgid: "9357ee63-5c29-4f70-850f-7254aad7f3ce",
    },
    {
      name: "Mas Ejemplo xd",
      description: "una descripcion random",
      price: "2000",
      category: ["4", "3"],
      oferta: "30",
      marcaId: "4",
      productIMG:
        "https://firebasestorage.googleapis.com/v0/b/my-first-project-a3ad3.appspot.com/o/d4d425f4-4882-41e8-86cc-309933541416?alt=media&token=74ccdd56-357d-4193-8311-5d31bd5e2931",
      imgid: "d4d425f4-4882-41e8-86cc-309933541416",
    },
    {
      name: "Ejemplo",
      description: "awoidawoid aoiwdoawjdoiaw doiawdoiawoid",
      price: "300",
      category: ["9"],
      oferta: "0",
      marcaId: "15",
      productIMG:
        "https://firebasestorage.googleapis.com/v0/b/my-first-project-a3ad3.appspot.com/o/eed906e6-a97f-4508-a13c-355d3d259c63?alt=media&token=88bb59f7-ae2d-4442-902a-72fd8249af19",
      imgid: "eed906e6-a97f-4508-a13c-355d3d259c63",
    },
    {
      name: "Top Coat",
      description:
        "waodmaowd awodkapwoda wdkapwodpaw dapwokdawd\nawodapwpodnapw doawmdpoaw",
      price: "5000",
      category: ["4"],
      oferta: "0",
      marcaId: "5",
      productIMG:
        "https://firebasestorage.googleapis.com/v0/b/my-first-project-a3ad3.appspot.com/o/c4cfd63e-5f08-4b8d-8cc9-905240b79bc4?alt=media&token=c9942dd0-761d-49cc-8a1b-0399533a85b4",
      imgid: "c4cfd63e-5f08-4b8d-8cc9-905240b79bc4",
    },
    {
      name: "Top Matte",
      description: "apwodapowd awpdapowd\nawdaw\ndaw\ndawd\naw\nawdawd",
      price: "700",
      category: ["2"],
      oferta: "0",
      marcaId: "10",
      productIMG:
        "https://firebasestorage.googleapis.com/v0/b/my-first-project-a3ad3.appspot.com/o/526f80d5-5670-4412-9a60-826289cb244f?alt=media&token=28909175-894a-4fdb-a078-bba31e51c1e2",
      imgid: "526f80d5-5670-4412-9a60-826289cb244f",
    },
    {
      name: "No se xd",
      description: "wdawdawd\naw\nda\nwd\na\nwd\naw\nd\nawd",
      price: "800",
      category: ["5"],
      oferta: "0",
      marcaId: "4",
      productIMG:
        "https://firebasestorage.googleapis.com/v0/b/my-first-project-a3ad3.appspot.com/o/b7856e77-84cb-45d7-b5b8-02621477adcc?alt=media&token=938728f0-3f8c-4d91-926c-cbf35b5022dd",
      imgid: "b7856e77-84cb-45d7-b5b8-02621477adcc",
    },
    {
      name: "Lima",
      description: "aowidaoiwndoaw daowidnawd\nwada\nw\ndawd\nawd",
      price: "300",
      category: ["8"],
      oferta: "0",
      marcaId: "7",
      productIMG:
        "https://firebasestorage.googleapis.com/v0/b/my-first-project-a3ad3.appspot.com/o/93db13e8-39e5-4c18-a585-1c1587c41e61?alt=media&token=9bf34f10-e212-4e6b-b29a-5efd4f2d0aac",
      imgid: "93db13e8-39e5-4c18-a585-1c1587c41e61",
    },
    {
      name: "aaaaaaa",
      description:
        "awdawd\nawdawd awda wdaw \ndaw dkawñ daw dkawd\naw d\nawdkaw\ndawd",
      price: "499",
      category: ["1"],
      oferta: "0",
      marcaId: "1",
      productIMG:
        "https://firebasestorage.googleapis.com/v0/b/my-first-project-a3ad3.appspot.com/o/ded90fe0-a633-438e-b177-4014e18db862?alt=media&token=6e1a1635-d02b-4cc0-8d9a-a517b7eb871e",
      imgid: "ded90fe0-a633-438e-b177-4014e18db862",
    },
    {
      name: "Base Coat",
      description: "awdiawodnap\nw daw d\nawd awd\na wd a w\ndawd awd\na\nawd",
      price: "800",
      category: ["3"],
      oferta: "0",
      marcaId: "5",
      productIMG:
        "https://firebasestorage.googleapis.com/v0/b/my-first-project-a3ad3.appspot.com/o/369f2a57-225b-42a1-814a-d4d195d28c77?alt=media&token=e84a82db-8db5-4063-92e1-7514ff4405a0",
      imgid: "369f2a57-225b-42a1-814a-d4d195d28c77",
    },
    {
      name: "Ejemplo",
      description: "awodnaiwda\nwdawdawd\nawdawd\nwdaw\nzzzz",
      price: "900",
      category: ["7"],
      oferta: "0",
      marcaId: "11",
      productIMG:
        "https://firebasestorage.googleapis.com/v0/b/my-first-project-a3ad3.appspot.com/o/fa07a082-da04-4e2f-ab5c-43a093519d39?alt=media&token=f0fab75a-ab0b-4f72-88b1-1544af433b21",
      imgid: "fa07a082-da04-4e2f-ab5c-43a093519d39",
    },
    {
      name: "Base Coat",
      description: "awidnaowndoainwoidaw\ndawd awd\naw daw d\naw daw\nawd",
      price: "450",
      category: ["1"],
      oferta: "300",
      marcaId: "5",
      productIMG:
        "https://firebasestorage.googleapis.com/v0/b/my-first-project-a3ad3.appspot.com/o/cdcaa798-9cbd-4864-81ea-b6ae5ba09b9f?alt=media&token=525259bf-19b8-4001-bf00-fe59bc39ea81",
      imgid: "cdcaa798-9cbd-4864-81ea-b6ae5ba09b9f",
    },
    {
      name: "Ejemplo",
      description:
        "iwaondoiawd\nawdawd\nawd\nawd awdnw\na daw\nnd aw\nkmdañ\nwmd\nawd\nawd",
      price: "900",
      category: ["3"],
      oferta: "500",
      marcaId: "7",
      productIMG:
        "https://firebasestorage.googleapis.com/v0/b/my-first-project-a3ad3.appspot.com/o/beccd3c0-ba4f-4003-85e9-f56571321546?alt=media&token=81e1cab7-ccc4-4bf8-9735-25bd804631c3",
      imgid: "beccd3c0-ba4f-4003-85e9-f56571321546",
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
