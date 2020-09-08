const config = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(config.DB, config.USER, config.PASSWORD, {
  host: config.HOST,
  dialect: config.dialect,
  operatorsAliases: false,

  pool: {
    max: config.pool.max,
    min: config.pool.min,
    acquire: config.pool.acquire,
    idle: config.pool.idle,
  },
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

const userModel = require("../models/user.model");
db.user = userModel.User(sequelize, Sequelize);
db.employee = userModel.Employee(sequelize, Sequelize);
db.role = require("../models/role.model.js")(sequelize, Sequelize);
db.orders = require("../models/orders.model.js")(sequelize, Sequelize);
db.products = require("../models/products.model.js")(sequelize, Sequelize);

db.role.belongsToMany(db.user, {
  through: "user_roles",
  foreignKey: "roleId",
  otherKey: "userId",
});

db.user.belongsToMany(db.role, {
  through: "user_roles",
  foreignKey: "userId",
  otherKey: "roleId",
});

db.employee.belongsTo(db.user, { foreignKey: "userId" });

db.ROLES = ["user", "admin", "staff"];

module.exports = db;
