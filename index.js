// TODO: Include packages needed for this application
const inquirer = require("inquirer");
const mysql = require("mysql2");
const cTable = require("console.table");

//Connecting to database
const db = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "Normanilove@22",
  database: "business_db",
});

db.connect(function (err) {
  if (err) throw err;
  console.log("Connected to business_db");
  init();
});
// function to initialize app
function init() {
  inquirer
    .prompt([
      {
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
    ])
    .then(function (answer) {
      switch (answer.choices) {
        case "View all departments":
          viewAllDepartments();
          break;
        case "View all roles":
          viewAllRoles();

          break;
        case "View all employees":
          viewAllEmployees();
          break;
        case "Add a department":
          addDepartment();
          break;
        case "Add a role":
          addRole();
          break;
        case "Add an employee":
          addEmployee();
          break;
        case "Update an employee role":
          addRole();
          break;
        case "View Employees by Manager":
          viewEmployeesByManager();
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

//function to view all employees
function viewAllEmployees() {
  db.query(
    "SELECT employee.first_name, employee.last_name, role.title, role.salary, department.name, CONCAT(e.first_name, ' ' ,e.last_name) AS Manager FROM employee INNER JOIN role on role.id = employee.role_id INNER JOIN department on department.id = role.department_id LEFT JOIN employee e on employee.manager_id = e.id;",
    function (err, res) {
      if (err) throw err;
      console.table(res);
      init();
    }
  );
}

//function to view all emps by roles
function viewAllRoles() {
  db.query(
    "SELECT DISTINCT role.title AS Roles FROM employee JOIN role ON employee.role_id = role.id;",
    function (err, res) {
      if (err) throw err;
      console.table(res);
      init();
    }
  );
}

//function to view all departments
function viewAllDepartments() {
  db.query("SELECT name AS Departments FROM department;", function (err, res) {
    if (err) throw err;
    console.table(res);
    init();
  });
}

//function to put roles as option for the add employee prompt
var roleArr = [];
function selectRole() {
  db.query("SELECT * FROM role", function (err, res) {
    if (err) throw err;
    for (var i = 0; i < res.length; i++) {
      roleArr.push(res[i].title);
    }
  });
  return roleArr;
}

//function to list out possible managers for the add employee prompt
var managersArr = [];
function selectManager() {
  db.query(
    "SELECT first_name, last_name FROM employee WHERE manager_id IS NULL",
    function (err, res) {
      if (err) throw err;
      for (var i = 0; i < res.length; i++) {
        managersArr.push(res[i].first_name);
      }
    }
  );
  return managersArr;
}
//function to add an employee
function addEmployee() {
  inquirer
    .prompt([
      {
        name: "firstname",
        type: "input",
        message: "Enter first name: ",
      },
      {
        name: "lastname",
        type: "input",
        message: "Enter last name: ",
      },
      {
        name: "role",
        type: "list",
        message: "Enter role: ",
        choices: selectRole(),
      },
      {
        name: "choice",
        type: "rawlist",
        message: "Enter manager name:",
        choices: selectManager(),
      },
    ])
    .then(function (val) {
      var roleId = selectRole().indexOf(val.role) + 1;
      var managerId = selectManager().indexOf(val.choice) + 1;
      db.query(
        "INSERT INTO employee (first_name, last_name, manager_id, role_id) VALUES (?, ?, ?, ?)",
        [val.firstname, val.lastname, managerId, roleId],
        function (err) {
          if (err) throw err;
          console.table(val);
          init();
        }
      );
    });
}

//function to update emp record
function updateEmployee() {
  db.query("SELECT * FROM employee", (err, employees) => {
    if (err) console.log(err);
    employees = employees.map((employee) => {
      return {
        name: `${employee.first_name} ${employee.last_name}`,
        value: employee.id,
      };
    });
    db.query("SELECT * FROM role", (err, roles) => {
      if (err) console.log(err);
      roles = roles.map((role) => {
        return {
          name: role.title,
          value: role.id,
        };
      });
      inquirer
        .prompt([
          {
            type: "list",
            name: "selectEmployee",
            message: "Select employee to update...",
            choices: employees,
          },
          {
            type: "list",
            name: "selectNewRole",
            message: "Select new employee role...",
            choices: roles,
          },
        ])
        .then((data) => {
          db.query(
            "UPDATE employee SET ? WHERE ?",
            [
              {
                role_id: data.selectNewRole,
              },
              {
                id: data.selectEmployee,
              },
            ],
            function (err) {
              if (err) throw err;
            }
          );
          console.log("Employee role updated");
          startPrompts();
        });
    });
  });
}

// function to add role
function addRole() {
  db.query(
    "SELECT role.title AS Title, role.salary AS Salary FROM role",
    function (err, res) {
      inquirer
        .prompt([
          {
            name: "Title",
            type: "input",
            message: "Enter Role:",
          },
          {
            name: "Salary",
            type: "input",
            message: "Enter Salary:",
          },
        ])
        .then(function (res) {
          db.query(
            "INSERT INTO role SET ?",
            {
              title: res.Title,
              salary: res.Salary,
            },
            function (err) {
              if (err) throw err;
              console.table(res);
              startPrompts();
            }
          );
        });
    }
  );
}

//function to add department
function addDepartment() {
  inquirer
    .prompt([
      {
        name: "name",
        type: "input",
        message: "Enter dept to add:",
      },
    ])
    .then(function (res) {
      var query = db.query(
        "INSERT INTO department SET ? ",
        {
          name: res.name,
        },
        function (err) {
          if (err) throw err;
          console.table(res);
          startPrompts();
        }
      );
    });
}
