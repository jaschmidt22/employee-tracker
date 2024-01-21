// // inquirer for user prompts
const inquirer = require("inquirer");
const mysql = require("mysql2");
// name the Server ?
// connect to mysql2

const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "rootroot",
  database: "employeetracker_db",
});

connection.connect((err) => {
  if (err) throw err;
  console.log("Connected to the database");
  start();
});

function start() {
  inquirer
    .prompt({
      type: "list",
      name: "start",
      message: "What would you like to do?",
      choices: [
        "View all departments",
        "View all roles",
        "View all employees",
        "Add an department",
        "Add a role",
        "Add an employee",
        "Update an employee role",
        "Exit",
      ],
    })
    .then((answer) => {
      switch (answer.start) {
        case "View all departments":
          viewDepartments();
          break;
        case "View all roles":
          viewRoles();
          break;
        case "View all employees":
          viewEmployees();
          break;
        case "Add an department":
          addDepartment();
          break;
        case "Add a role":
          addRole();
          break;
        case "Add an employee":
          addEmployee();
          break;
        case "Update an employee role":
          updateEmployeeRole();
          break;
        case "Exit":
          connection.end();
          break;
      }
    });
}
//function to view all departments
function viewDepartments() {
  connection.query("SELECT * FROM departments", (err, res) => {
    if (err) throw err;
    console.table(res);
    start();
  });
}
//function to view all roles
function viewRoles() {
  connection.query("SELECT * FROM roles", (err, res) => {
    if (err) throw err;
    console.table(res);
    start();
  });
}
//function to view all employees
function viewEmployees() {
  connection.query("SELECT * FROM employees", (err, res) => {
    if (err) throw err;
    console.table(res);
    start();
  });
}
// initial choices:
// view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role

// view all roles:
// THEN I am presented with the job title, role id, the department that role belongs to, and the salary for that role

// view all employees:
// THEN I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to

// add a department:
// THEN I am prompted to enter the name of the department and that department is added to the database

// add a role:
// THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database

// add an employee:
// THEN I am prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database

// update an employee role:
// THEN I am prompted to select an employee to update and their new role and this information is updated in the database

// inquirer to prompt initial questions...

// answers--invoke function that correlates...
