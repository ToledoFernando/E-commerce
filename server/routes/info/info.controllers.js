const { marca, category } = require("../../db");

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

module.exports = { getMarcas, getCategories };
