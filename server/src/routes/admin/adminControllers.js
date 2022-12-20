const Users = require('../../models/Users');
const Products = require('../../models/Products');

const getAllUserClient = async (req, res) => {
  try {
    const userData = req.user;
    const user = await Users.findOne({ email: userData.email });
    if (!user.rol.includes('Admin') && !user.rol.includes('SuperAdmin')) throw Error('Rol no suficiente');
    const users = await Users.find({ rol: 'user' }, { password: 0 });
    res.json({ response: users })
  } catch (error) {
    res.status(400).json({ Error: error.message })
  }
}

const getAllAdmin = async (req, res) => {
  try {
    const userData = req.user;
    const user = await Users.findOne({ email: userData.email });
    if (!user.rol.includes('SuperAdmin')) throw Error('Rol no suficiente');
    const users = await Users.find({ rol: 'Admin' }, { password: 0 });
    res.json({ response: users })
  } catch (error) {
    res.status(400).json({ Error: error.message })
  }
}

const clientBanned = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const userData = req.user;
    const user = await Users.findOne({ email: userData.email });
    if (!user.rol.includes('Admin') && !user.rol.includes('SuperAdmin')) throw Error('Rol no suficiente');
    const result = await Users.updateOne({ "_id": id }, { status: status, connection: false });
    res.json(result)
  } catch (error) {
    res.status(400).json({ Error: error.message })
  }
}

const adminBanned = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const userData = req.user;
    const user = await Users.findOne({ email: userData.email });
    if (!user.rol.includes('SuperAdmin')) throw Error('Rol no suficiente');
    const result = await Users.updateOne({ "_id": id }, { status: status, connection: false });
    res.json(result)
  } catch (error) {
    res.json({ Error: error.message })
  }
}

const deleteAcoutn = async (req, res) => {
  try {
    const { id } = req.params;
    const userData = req.user;
    const user = await Users.findOne({ email: userData.email });
    if (!user.rol.includes('SuperAdmin')) throw Error('Rol no suficiente');
    const result = await Users.deleteOne({ '_id': id })
    res.json(result)
  } catch (error) {
    res.json({ Error: error.message })
  }
}

module.exports = { getAllUserClient, getAllAdmin, clientBanned, adminBanned, deleteAcoutn }