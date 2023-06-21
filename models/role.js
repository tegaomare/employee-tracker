const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Role extends Model {}

Role.init(
  {
    title: DataTypes.STRING(30),
    salary: DataTypes.DECIMAL,
    department_id: DataTypes.INTEGER,
  },
  {
    sequelize,
    timestamps: false,
    underscored: true,
    modelName: "role",
  }
);
module.exports = Role;
