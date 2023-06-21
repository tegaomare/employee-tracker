const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

// Create a new Sequelize model for department
class department extends Model {}

department.init({
  department_name: DataTypes.STRING(30),
});
