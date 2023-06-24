const inquirer = require("inquirer");
const mysql = require("mysql2");
const cTable = require("console.table");

// Connecting to the database
const db = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "your password",
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
  db.query("SELECT * FROM department", function (err, results) {
    if (err) {
      console.error("Error retrieving departments: " + err);
      return;
    }
    // Display the departments
    console.log("All Departments:");
    console.table(results);
    // Return to the main menu
    init();
  });
}

function viewAllRoles() {
  db.query("SELECT * FROM role", function (err, results) {
    if (err) {
      console.error("Error retrieving roles: " + err);
      return;
    }
    // Display the roles
    console.log("All Roles:");
    console.table(results);
    // Return to the main menu
    init();
  });
}

function viewAllEmployees() {
  db.query("SELECT * FROM employee", function (err, results) {
    if (err) {
      console.error("Error retrieving employees: " + err);
      return;
    }
    // Display the employees
    console.log("All Employees:");
    console.table(results);
    // Return to the main menu
    init();
  });
}

function addDepartment() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "name",
        message: "Enter the department name:",
      },
    ])
    .then(function (answer) {
      // Insert the new department into the database
      db.query(
        "INSERT INTO department SET ?",
        { name: answer.name },
        function (err, result) {
          if (err) {
            console.error("Error adding department: " + err);
            return;
          }
          console.log("Department added successfully!");
          // Return to the main menu
          init();
        }
      );
    });
}

function addRole() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "title",
        message: "Enter the role title:",
      },
      {
        type: "input",
        name: "salary",
        message: "Enter the role salary:",
      },
      {
        type: "input",
        name: "departmentId",
        message: "Enter the department ID for the role:",
      },
    ])
    .then(function (answers) {
      // Insert the new role into the database
      db.query(
        "INSERT INTO role SET ?",
        {
          title: answers.title,
          salary: answers.salary,
          department_id: answers.departmentId,
        },
        function (err, result) {
          if (err) {
            console.error("Error adding role: " + err);
            return;
          }
          console.log("Role added successfully!");
          // Return to the main menu
          init();
        }
      );
    });
}

function addEmployee() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "firstName",
        message: "Enter the employee's first name:",
      },
      {
        type: "input",
        name: "lastName",
        message: "Enter the employee's last name:",
      },
      {
        type: "input",
        name: "roleId",
        message: "Enter the role ID for the employee:",
      },
      {
        type: "input",
        name: "managerId",
        message: "Enter the manager ID for the employee (optional):",
      },
    ])
    .then(function (answers) {
      // Insert the new employee into the database
      db.query(
        "INSERT INTO employee SET ?",
        {
          first_name: answers.firstName,
          last_name: answers.lastName,
          role_id: answers.roleId,
          manager_id: answers.managerId || null,
        },
        function (err, result) {
          if (err) {
            console.error("Error adding employee: " + err);
            return;
          }
          console.log("Employee added successfully!");
          // Return to the main menu
          init();
        }
      );
    });
}

function updateEmployeeRole() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "employeeId",
        message: "Enter the ID of the employee to update:",
      },
      {
        type: "input",
        name: "roleId",
        message: "Enter the new role ID for the employee:",
      },
    ])
    .then(function (answers) {
      // Update the employee's role in the database
      db.query(
        "UPDATE employee SET role_id = ? WHERE id = ?",
        [answers.roleId, answers.employeeId],
        function (err, result) {
          if (err) {
            console.error("Error updating employee role: " + err);
            return;
          }
          if (result.affectedRows === 0) {
            console.log("Employee not found.");
          } else {
            console.log("Employee role updated successfully!");
          }
          // Return to the main menu
          init();
        }
      );
    });
}
