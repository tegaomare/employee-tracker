const sequelize = require("../config/connection");
const { Department, Employee, Role } = require("../models");

const readerSeedData = require("./readerSeedData.json");

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const departments = await Department.bulkCreate(readerSeedData, {
    individualHooks: true,
    returning: true,
  });

  const employees = await Employee.bulkCreate(readerSeedData, {
    individualHooks: true,
    returning: true,
  });

  const roles = await Role.bulkCreate(readerSeedData, {
    individualHooks: true,
    returning: true,
  });
  process.exit(0);
};

seedDatabase();
