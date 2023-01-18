const { users, products, category, marca } = require("../../db");

const getProducts = async (req, res) => {
  try {
    const productos = await products.findAll({
      include: [
        {
          model: category,
          attributes: ["name"],
        },
        { model: marca, attributes: ["name"] },
      ],
      attributes: {
        exclude: ["marcaId", "category", "updatedAt"],
      },
    });
    res.json(productos);
  } catch (error) {
    res.status(400).json({ Error: error.message });
  }
};

const getProductDetail = async (req, res) => {
  try {
    const result = await products.findOne({
      where: { id: req.params.id },
      include: [
        {
          model: category,
          attributes: ["name"],
        },
        { model: marca, attributes: ["name"] },
      ],
      attributes: {
        exclude: ["marcaId", "category", "updatedAt"],
      },
    });
    res.json(result);
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ Error: error.message });
  }
};

const postProduct = async (req, res) => {
  try {
    const userData = req.user;
    const user = await users.findOne({ where: { email: userData.email } });
    if (user.rolId !== 3) throw Error("Rol no suficiente");
    console.log(req.body);
    const product = await products.create(req.body);
    await product.addCategory(req.body.category);
    res.json(product);
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ Error: error.message });
  }
};

const updateProducts = async (req, res) => {
  try {
    const userData = req.user;
    const user = await users.findOne({ where: { email: userData.email } });
    if (user.rolId < 2) throw Error("Rol no suficiente");
    const productUpdate = await products.update(req.body, {
      where: { id: req.body.id },
    });
    res.json(productUpdate);
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ Error: error.message });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const userData = req.user;
    const user = await users.findOne({ where: { email: userData.email } });
    if (user.rolId !== 3) throw Error("Rol no suficiente");
    const result = await products.destroy({ where: { id } });
    res.json(result);
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ Error: error.message });
  }
};

module.exports = {
  getProducts,
  getProductDetail,
  postProduct,
  updateProducts,
  deleteProduct,
};
