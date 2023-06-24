const inquirer = require("inquirer");
const mysql = require("mysql2");

// Connecting to the database
const db = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "Normanilove@22",
  database: "business_db",
});

db.connect((err) => {
  if (err) {
    console.error("Error connecting to the database: " + err.stack);
    return;
  }
  console.log("Connected to the business_db database.");
  init();
});

// Function to initialize the app
function init() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "choice",
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
    ])
    .then(function (answer) {
      switch (answer.choice) {
        case "View All Departments":
          viewAllDepartments();
          break;
        case "View All Roles":
          viewAllRoles();
          break;
        case "View All Employees":
          viewAllEmployees();
          break;
        case "Add A Department":
          addDepartment();
          break;
        case "Add A Role":
          addRole();
          break;
        case "Add An Employee":
          addEmployee();
          break;
        case "Update An Employee Role":
          updateEmployeeRole();
          break;
        case "Exit":
          console.log("Exiting the application.");
          db.end();
          break;
        default:
          console.log("Invalid choice. Please try again.");
          init();
          break;
      }
    });
}

function viewAllDepartments() {
  // Implement the logic to view all departments
}

function viewAllRoles() {
  // Implement the logic to view all roles
}

function viewAllEmployees() {
  // Implement the logic to view all employees
}

function addDepartment() {
  // Implement the logic to add a department
}

function addRole() {
  // Implement the logic to add a role
}

function addEmployee() {
  // Implement the logic to add an employee
}

function updateEmployeeRole() {
  // Implement the logic to update an employee's role
}
