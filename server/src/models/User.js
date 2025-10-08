const { DataTypes } = require("sequelize");
const sequelize = require("../db/sequelize");

const User = sequelize.define("User", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  name: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false, unique: true },
  passwordHash: { type: DataTypes.STRING, allowNull: false },
  role: { type: DataTypes.ENUM("patient","doctor","admin"), allowNull: false, defaultValue: "patient" }
}, {
  tableName: "Users",
  timestamps: true
});

module.exports = User;
