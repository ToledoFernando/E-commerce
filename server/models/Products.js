const { DataTypes } = require("sequelize");

module.exports = (database) => {
  database.define("products", {
    name: {
      type: DataTypes.STRING,
      required: true,
    },
    description: {
      type: DataTypes.STRING,
      required: true,
    },
    price: {
      type: DataTypes.INTEGER,
      required: true,
    },
    productIMG: {
      type: DataTypes.STRING,
      required: true,
    },
    imgid: {
      type: DataTypes.STRING,
    },
    category: {
      type: DataTypes.ARRAY(DataTypes.STRING),
    },
    oferta: {
      type: DataTypes.INTEGER,
      default: 0,
    },
    status: {
      type: DataTypes.BOOLEAN,
      default: true,
    },
  });
};
