// // inquirer for user prompts
const inquirer = require("inquirer");
const mysql = require("mysql2");
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
//function to initiate questions and call the associated functions
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
  connection.query(
    "SELECT roles.title, roles.id, departments.department_name, roles.salary FROM roles JOIN departments on roles.department_id = departments.id",
    (err, res) => {
      if (err) throw err;
      console.table(res);
      start();
    }
  );
}
//function to view all employees
function viewEmployees() {
  connection.query(
    "SELECT employees.id, employees.first_name, employees.last_name, roles.title,departments.department_name, roles.salary " +
      "FROM employees " +
      "LEFT JOIN roles ON employees.role_id = roles.id " +
      "LEFT JOIN departments ON roles.department_id = departments.id",
    (err, res) => {
      if (err) throw err;
      console.table(res);
      start();
    }
  );
}

// function to add a department
function addDepartment() {
  inquirer
    .prompt({
      type: "input",
      name: "department",
      message: "What is the name of the department?",
    })
    .then((answer) => {
      connection.query(
        "INSERT INTO departments SET ?",
        {
          department_name: answer.department,
        },
        (err) => {
          if (err) throw err;
          console.log("Department added successfully");
          start();
        }
      );
    });
}
// function to add a role
function addRole() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "role",
        message: "What is the name of the role?",
      },
      {
        type: "input",
        name: "salary",
        message: "What is the salary of the role?",
      },
      {
        type: "list",
        name: "department",
        message: "Which department does the role belong to?",
        choices: ["Sales", "Engineering", "Finance", "Legal"],
      },
    ])
    .then((answer) => {
      connection.query(
        "INSERT INTO roles SET ?",
        {
          title: answer.role,
          salary: answer.salary,
          department_id: answer.departments,
        },
        (err) => {
          if (err) throw err;
          console.log("Role added successfully");
          start();
        }
      );
    });
}
// function to add an employee
function addEmployee() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "firstname",
        message: "What is the employees first name?",
      },
      {
        type: "input",
        name: "lastname",
        message: "What is the employees last name?",
      },
      {
        type: "list",
        name: "role",
        message: "What is the role of the employee?",
        choices: [
          "Sales Manager",
          "Salesperson",
          "Lead Engineer",
          "Software Engineer",
          "Account Manager",
          "Accountant",
          "Legal Department Manager",
          "Lawyer",
        ],
      },
      {
        type: "list",
        name: "manager",
        message: "Who is the manager of the employee?",
        choices: [
          "Tristan Schmidt",
          "Karina Schmidt",
          "Lea Villaverde",
          "Marie Green",
        ],
      },
    ])
    .then((answer) => {
      connection.query(
        "INSERT INTO employees SET ?",
        {
          first_name: answer.firstname,
          last_name: answer.lastname,
          roles: answer.roles,
          manager_id: answer.manager,
        },
        (err) => {
          if (err) throw err;
          console.log("Employee added successfully");
          start();
        }
      );
    });
}
const roleMapping = {
  "Sales Manager": 1,
  Salesperson: 2,
  "Lead Engineer": 3,
  "Software Engineer": 4,
  "Account Manager": 5,
  Accountant: 6,
  "Legal Department Manager": 7,
  Lawyer: 8,
};

//  function to update an employee role

function updateEmployeeRole() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "employee",
        message: "Which employee would you like to update?",
        choices: [
          "Tristan Schmidt",
          "Colin Schmidt",
          "Karina Schmidt",
          "Jessica Schmidt",
          "Lea Villaverde",
          "Mary Jibben",
          "Marie Green",
          "Alexa Bellamy",
        ],
      },
      {
        type: "list",
        name: "role",
        message: "What is the employee's new role?",
        choices: [
          "Sales Manager",
          "Salesperson",
          "Lead Engineer",
          "Software Engineer",
          "Account Manager",
          "Accountant",
          "Legal Department Manager",
          "Lawyer",
        ],
      },
    ])
    .then((answer) => {
      const roleId = roleMapping[answer.role]; // 1get the role id from the roleMapping object
      if (roleId) {
        connection.query(
          "UPDATE employees SET role_id = ? WHERE first_name = ? AND last_name = ?",
          [
            roleId,
            answer.employee.split(" ")[0],
            answer.employee.split(" ")[1],
          ],
          (err) => {
            if (err) throw err;
            console.log("Employee updated successfully");
            start();
          }
        );
      } else {
        console.log("Invalid role");
        start();
      }
    });
}
