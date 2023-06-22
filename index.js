// TODO: Include packages needed for this application
const inquirer = require("inquirer");
const mysql = require("mysql2");
const sequelize = require("./config/connection");

// Import model to sync table with database

const options = [
  {
    name: "action",
    type: "list",
    message: "What would you like to do?",
    choices: [
      "View All Departments",
      "View All Roles",
      "View All Employees",
      "Add A Department",
      "Add A Role",
      "Add An Employee",
      "Update An Employee Role",
    ],
  },
];

// TODO: Create a function to write README file
/*function writeToFile(fileName, data) {
  fs.writeFile(fileName, data, (err) => {
    if (err) throw err;
    console.log("The file has been saved!");
  });
}

const handleAnswers = (answers) => {
  console.log(answers);
  writeToFile("README.md", generateMarkdown(answers));
};*/

// TODO: Create a function to initialize app
function init() {
  inquirer.prompt(options).then((answer) => {
    switch (answer.action) {
      case "View all departments":
        console.log("viewing all departments");
        break;
      case "View all roles":
        console.log("viewing all roles");
        break;
      case "View all employees":
        console.log("viewing all employees");
        break;
      case "Add a department":
        console.log("viewing a department");
        break;
      case "Add a role":
        console.log("viewing a role");
        break;
      case "Add an employee":
        console.log("viewing an employee");
        break;
      case "Update an employee role":
        console.log("viewing an employee role");
        break;
      case "Exit":
        console.log("Exiting the application.");
        connection.end();
        break;
      default:
        console.log("Invalid choice. Please try again.");
        init();
        break;
    }
  });
}

// Function call to initialize app
init();
