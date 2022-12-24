const jwt = require('jsonwebtoken');
const User = require('../../models/Users')
const sendEsendEmailVerifyAcountmail = require('../email/emailConfig')
require('dotenv').config();

const userLogin = async (req, res) => {
  try {
    const data = req.body;
    const result = await User.findOne({ "email": data.Email, 'password': data.password }, { password: 0, __v: 0 })
    if (!result) throw Error('Usuario no encontrado')
    const { first_name, last_name, email } = result;
    const userToken = jwt.sign({ name: first_name, lastName: last_name, email: email }, process.env.SECRET_KEY, { expiresIn: '3h' })
    res.json({ usuario: result, tokenUser: userToken })
  } catch (error) {
    res.status(400).json({ Error: error.message })
  }
}

const senEmailVerifyEmail = async (req, res) => {
  await sendEsendEmailVerifyAcountmail(req.user)
  res.json({ MSG: "Mensaje de prueba" })
}

const newUser = async (req, res) => {
  try {
    const data = req.body;
    const user = new User(data);
    const buscar = await User.findOne({ email: data.email })
    if (buscar) throw Error('Ya existe un usuario con ese email')
    const result = await user.save();
    const userToken = jwt.sign({ name: result.first_name, lastName: result.last_name, email: result.email }, process.env.SECRET_KEY, { expiresIn: '3h' })
    const userData = {
      email: result.email,
      first_name: result.first_name,
      last_name: result.last_name,
      profileIMG: result.profileIMG,
      rol: result.rol,
      username: result.username,
      _id: result._id,
      verify: result.verify,
    }
    const emailData = {
      name: userData.first_name,
      lastName: userData.last_name,
      email: userData.email
    }
    await sendEsendEmailVerifyAcountmail(emailData)
    res.json({ UsuarioCreado: { userData }, tokenUser: userToken })
  } catch (error) {
    res.status(400).json({ Error: error.message })
  }
}

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    await User.deleteOne({ "_id": id })
    res.send("Usuario eliminado con exito")
  } catch (error) {
    res.json({ Error: error.message })
  }
}

const updateUser = async (req, res) => {
  try {
    const { _id } = req.body;
    const result = await User.updateOne({ "_id": _id }, req.body)
    res.json(result)
  } catch (error) {
    res.status(400).json({ 'Error': error.message })
  }
}

const validarTokenUser = async (req, res) => {
  try {
    if (!req.headers.authorization) throw Error('Token is required')
    const token = req.headers.authorization.split(' ')[1]
    const user = jwt.verify(token, process.env.SECRET_KEY)
    const buscar = await User.findOne({ "email": user.email }, { password: 0, status: 0, connection: 0, __v: 0 })
    res.json(buscar);
  } catch (error) {
    res.status(400).json({ Error: error.message })
  }
}

const getAllUsers = async (req, res) => {
  try {
    const result = await User.findOne({ email: req.user.email })
    if (result.rol[0] == 'Admin') {
      const usuarios = await User.find({ rol: 'user' })
      res.json(usuarios)
    } else if (result.rol[0] == 'SuperAdmin') {
      const usuarios = await User.find({ rol: 'user' })
      const admin = await User.find({ rol: 'Admin' })
      res.json([...usuarios, ...admin])
    } else {
      res.status(400).json({ Error: "Problemas con el rol" })
    }
  } catch (error) {
    res.status(400).json({ Error: error.message })
  }
}

const verifiAcoutn = async (req, res) => {
  try {
    await User.updateOne({ email: req.user.email }, { verify: true });
    const usuario = await User.findOne({ email: req.user.email })
    res.json(usuario)
  } catch (error) {
    res.status(400).json({ Error: error.message })
  }
}

module.exports = { userLogin, newUser, deleteUser, updateUser, validarTokenUser, getAllUsers, senEmailVerifyEmail, verifiAcoutn }