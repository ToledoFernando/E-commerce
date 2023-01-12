const { marca, category, users } = require("../../db");

const getMarcas = async (req, res) => {
  try {
    const result = await marca.findAll({
      attributes: {
        exclude: ["updatedAt", "createdAt"],
      },
    });
    res.json(result);
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ Error: error.message });
  }
};

const postMarca = async (req, res) => {
  try {
    const usuario = await users.findOne({ where: { email: req.user.email } });
    if (usuario.rolId < 3) throw Error("Rol no suficiente");
    const existe = await marca.findOne({ where: req.body });
    if (existe) throw Error("Ya existe la marca");
    const newMarca = await marca.create(req.body);
    res.json(newMarca);
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ Error: error.message });
  }
};

const deleteMarca = async (req, res) => {
  try {
    const usuario = await users.findOne({ where: { email: req.user.email } });
    if (usuario.rolId < 3) throw Error("Rol no suficiente");
    const result = await marca.destroy({ where: req.params });
    res.json(result);
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ Error: error.message });
  }
};

//===========================================

const getCategories = async (req, res) => {
  try {
    const result = await category.findAll({
      attributes: {
        exclude: ["updatedAt", "createdAt"],
      },
    });
    res.json(result);
  } catch (error) {
    res.status(400).json({ Error: error.message });
  }
};

const postCategory = async (req, res) => {
  try {
    const usuario = await users.findOne({ where: { email: req.user.email } });
    if (usuario.rolId < 3) throw Error("Rol no suficiente");
    const existe = await category.findOne({ where: req.body });
    if (existe) throw Error("Ya existe la categoria");
    const result = await category.create(req.body);
    res.json(result);
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ Error: error.message });
  }
};

const deleteCategory = async (req, res) => {
  try {
    const usuario = await users.findOne({ where: { email: req.user.email } });
    if (usuario.rolId < 3) throw Error("Rol no suficiente");
    const result = await category.destroy({ where: req.params });
    res.json(result);
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ Error: error.message });
  }
};

module.exports = {
  getMarcas,
  getCategories,
  postMarca,
  deleteMarca,
  postCategory,
  deleteCategory,
};
