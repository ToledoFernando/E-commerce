const { DataTypes } = require("sequelize");

module.exports = (database) => {
  database.define("category", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      unique: true,
    },
  });
};
