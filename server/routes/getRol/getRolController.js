const User = require('../../models/Users');

const getRol = async (req, res) => {
  const { id } = req.params;
  const rol = await User.findOne({ "_id": id })

  res.json(rol.rol)
}


module.exports = getRol;