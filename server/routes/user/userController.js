const jwt = require("jsonwebtoken");
const { users, rol } = require("../../db");
const sendEsendEmailVerifyAcountmail = require("../email/emailConfig");
require("dotenv").config();

const userLogin = async (req, res) => {
  try {
    const data = req.body;
    console.log(data);
    const result = await users.findOne({
      where: { email: data.Email, password: data.password },
      attributes: {
        exclude: ["password", "rolId", "updatedAt", "createdAt"],
      },
      include: [
        {
          model: rol,
          attributes: ["name"],
        },
      ],
    });
    if (!result) throw Error("Usuario no encontrado");
    const { first_name, last_name, email } = result;
    const userToken = jwt.sign(
      { name: first_name, lastName: last_name, email: email },
      process.env.SECRET_KEY,
      { expiresIn: "3h" }
    );
    res.json({ usuario: result, tokenUser: userToken });
  } catch (error) {
    res.status(400).json({ Error: error.message });
  }
};

const senEmailVerifyEmail = async (req, res) => {
  await sendEsendEmailVerifyAcountmail(req.user);
  res.json({ MSG: "Mensaje de prueba" });
};

const newUser = async (req, res) => {
  try {
    const data = req.body;
    const buscar = await users.findOne({ where: { email: data.email } });
    if (buscar) throw Error("Ya existe un usuario con ese email");
    data.rolId = 1; // asignarle rol user por defecto
    const result = await users.create(data);

    //Token
    const userToken = jwt.sign(
      {
        name: result.first_name,
        lastName: result.last_name,
        email: result.email,
      },
      process.env.SECRET_KEY,
      { expiresIn: "3h" }
    );

    //Busqueda sacando los datos no necesarios
    const userData = await users.findOne({
      where: { id: result.id },
      attributes: {
        exclude: ["password", "rolId", "updatedAt", "createdAt"],
      },
      include: [
        {
          model: rol,
          attributes: ["name"],
        },
      ],
    });

    //Datos para envio de correo
    const emailData = {
      name: userData.first_name,
      lastName: userData.last_name,
      email: userData.email,
    };
    sendEsendEmailVerifyAcountmail(emailData);
    res.json({ UsuarioCreado: { userData }, tokenUser: userToken });
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ Error: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    await users.destroy({ where: { id } });
    res.send("Usuario eliminado con exito");
  } catch (error) {
    res.json({ Error: error.message });
  }
};

const updateUser = async (req, res) => {
  try {
    const { id } = req.body;
    const result = await users.update(req.body, { where: { id } });
    res.json(result);
  } catch (error) {
    res.status(400).json({ Error: error.message });
  }
};

const validarTokenUser = async (req, res) => {
  try {
    if (!req.headers.authorization) throw Error("Token is required");
    const token = req.headers.authorization.split(" ")[1];
    const user = jwt.verify(token, process.env.SECRET_KEY);
    const buscar = await users.findOne({
      where: { email: user.email },
      attributes: {
        exclude: ["password", "rolId", "updatedAt", "createdAt"],
      },
      include: [
        {
          model: rol,
          attributes: ["name"],
        },
      ],
    });
    res.json(buscar);
  } catch (error) {
    res.status(400).json({ Error: error.message });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const result = await users.findOne({ where: { email: req.user.email } });
    if (result.rolId === 2) {
      const usuarios = await users.findAll({
        where: { rolId: 1 },
        include: [
          {
            model: rol,
            attributes: ["name"],
          },
        ],
      });
      res.json(usuarios);
    } else if (result.rolId === 3) {
      const usuarios = await users.findAll({
        where: { rolId: 1 },
        include: [
          {
            model: rol,
            attributes: ["name"],
          },
        ],
      });
      const admin = await users.findAll({
        where: { rolId: 2 },
        include: [
          {
            model: rol,
            attributes: ["name"],
          },
        ],
      });
      res.json([...usuarios, ...admin]);
    } else {
      res.status(400).json({ Error: "Problemas con el rol" });
    }
  } catch (error) {
    res.status(400).json({ Error: error.message });
  }
};

const verifiAcoutn = async (req, res) => {
  try {
    await users.update({ verify: true }, { where: { email: req.user.email } });
    const usuario = await users.findOne({ where: { email: req.user.email } });
    res.json(usuario);
  } catch (error) {
    res.status(400).json({ Error: error.message });
  }
};

module.exports = {
  userLogin,
  newUser,
  deleteUser,
  updateUser,
  validarTokenUser,
  getAllUsers,
  senEmailVerifyEmail,
  verifiAcoutn,
};
