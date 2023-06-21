const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Employee extends Model {}

Employee.init(
  {
    first_name: DataTypes.STRING(30),
    last_name: DataTypes.STRING(30),
    role_id: DataTypes.INTEGER,
    manager_id: DataTypes.INTEGER,
  },
  {
    sequelize,
    timestamps: false,
    underscored: true,
    modelName: "employee",
  }
);
module.exports = Employee;
