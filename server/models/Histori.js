const { DataTypes } = require("sequelize");

module.exports = (database) => {
  database.define("payHistory", {
    id: {
      type: DataTypes.STRING,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    payID: {
      type: DataTypes.STRING,
    },
    importe: {
      type: DataTypes.INTEGER,
    },
    estado: {
      type: DataTypes.STRING,
    },
    payState: {
      type: DataTypes.STRING,
    },
  });
};
