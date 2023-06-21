const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

// Create a new Sequelize model for department
class Department extends Model {}

Department.init(
  {
    department_name: DataTypes.STRING(30),
  },
  {
    sequelize,
    timestamps: false,
    underscored: true,
    modelName: "Department",
  }
);

module.exports = Department;
