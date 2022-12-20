const Products = require('../../models/Products');
const User = require('../../models/Users');

const getProducts = async (req, res) => {
  try {
    const productos = await Products.find();
    res.json(productos)
  } catch (error) {
    res.status(400).json({ Error: error.message });
  }
}

const postProduct = async (req, res) => {
  try {
    const userData = req.user;
    const user = await User.findOne({ email: userData.email })
    if (!user.rol.includes('SuperAdmin')) throw Error('Rol no suficiente')
    const product = new Products(req.body);
    const newProducts = await product.save();
    res.json(newProducts)
  } catch (error) {
    res.status(400).json({ Error: error.message });
  }
}

const updateProducts = async (req, res) => {
  try {
    const userData = req.user;
    const user = await User.findOne({ email: userData.email });
    if (!user.rol.includes('SuperAdmin')) throw Error('Rol no suficiente');
    const productUpdate = await Products.updateOne({ "_id": req.body.id }, req.body);
    res.send(productUpdate);
  } catch (error) {
    res.status(400).json({ Error: error.message });
  }
}

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const userData = req.user;
    const user = await User.findOne({ email: userData.email });
    if (!user.rol.includes('SuperAdmin')) throw Error('Rol no suficiente');

    const result = await Products.deleteOne({ '_id': id });
    res.json(result);
  } catch (error) {
    res.status(400).json({ Error: error.message });
  }
}

module.exports = { getProducts, postProduct, updateProducts, deleteProduct }