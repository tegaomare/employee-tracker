// TODO: Include packages needed for this application
const inquirer = require("inquirer");
//const fs = require("fs");
//const generateMarkdown = require("./utils/generateMarkdown.js");

// TODO: Create an array of questions for user input
// Description, Table of Contents, Installation, Usage, License, Contributing, Tests, and Questions
const options = [
  {
    name: "option",
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
  inquirer.prompt(options).then(console.log(options));
}

// Function call to initialize app
init();
