require("dotenv").config();
const { Sequelize } = require("sequelize");
const user = require("./models/Users");
const product = require("./models/Products");
const marcas = require("./models/Marcas");
const Rol = require("./models/Rol");
const categorys = require("./models/Category");
const history = require("./models/Histori");

const { HOST_DB, NAME_DB, USER_DB, PASS_DB, PORT_DB } = process.env;

const database = new Sequelize({
  host: HOST_DB,
  username: USER_DB,
  database: NAME_DB,
  port: PORT_DB,
  password: PASS_DB,
  dialect: "postgres",
  dialectOptions: {
    // ssl: {
    //   require: true,
    //   rejectUnauthorized: false,
    // },
  },
  logging: false,
});

user(database);
product(database);
marcas(database);
categorys(database);
Rol(database);
history(database);

const { users, products, marca, category, rol, payHistory } = database.models;

rol.hasMany(users);
users.belongsTo(rol);

marca.hasMany(products);
products.belongsTo(marca);

users.hasMany(payHistory);
payHistory.belongsTo(users);

products.belongsToMany(category, { through: "rel" });
category.belongsToMany(products, { through: "rel" });

module.exports = { ...database.models, database };
