const fs = require("fs");
const express = require("express");
const inquirer = require("inquirer");
const db = require("./db/connection");
const { table } = require("console");
const { allowedNodeEnvironmentFlags } = require("process");
const e = require("express");
const app = express();
//Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
//TODO: create an array of options for user input
//1. View all employees
//2. View all employees by Department
//3. View all employees by Manager
//4.  Add employee
//5.  Remove employee
//6.  Update employee role
//7.  Update employee manager
//8.  View all roles
//9.  Add role
//10. Delet role
const start_question = [
  {
    type: "list",
    message: "What would you like to do?",
    name: "firstQuestion",
    choices: [
      "View all departments",
      "View all roles",
      "View all employees",
      "Add a department",
      "Add a role",
      "Add an employee",
      "Update and employee role",
    ],
  },
];
//Create a function to initialize app
const init = () =>
  inquirer.prompt(start_question).then((response) => startQuery(response));
//Create a function to queary db
const startQuery = (response) => {
  if (response.firstQuestion === "View all departments") {
    allDepartments();
  } else if (response.firstQuestion === "View all roles") {
    allRoles();
  } else if (response.firstQuestion === "View all employees") {
    allEmployees();
  } else if (response.firstQuestion === "Add a department") {
    addDepartment();
  } else if (response.firstQuestion === "Add a role") {
    addRole();
  } else if (response.firstQuestion === "Add an employee") {
    addEmployee();
  } else {
    updateEmployee();
  }
};
//Show all departments
allDepartments = () => {
  const sql = `SELECT * FROM departments`;
  db.query(sql, (err, rows) => {
    if (err) throw err;
    console.table(rows);
    init();
  });
};
//Show all roles
allRoles = () => {
  const sql = `SELECT * FROM roles`;
  db.query(sql, (err, rows) => {
    if (err) throw err;
    console.table(rows);
    init();
  });
};
//Show all employees
allEmployees = () => {
  const sql = `SELECT first_name, last_name, title, salary FROM employees LEFT JOIN roles ON roles.id = employees.role_id`;
  db.query(sql, (err, rows) => {
    if (err) throw err;
    console.table(rows);
    init();
  });
};
//Add a department
addDepartment = () => {
  inquirer
    .prompt({
      type: "input",
      message: "What department do you want to add?",
      name: "newDepartment",
    })
    .then((res) => {
      db.query(
        `INSERT INTO departments SET ?`,
        {
          department_name: res.newDepartment,
        },
        (err) => {
          if (err) throw err;
          console.log("New department added successfully");
          init();
        }
      );
    });
};
//Add a role
addRole = () => {
  inquirer
    .prompt([
      {
        type: "input",
        message: "What is the new role?",
        name: "newRole",
      },
      {
        type: "input",
        message: "What is the salary for this role",
        name: "newSalary",
      },
      {
        type: "input",
        message: "What is the department id for this role?",
        name: "newDepartment",
      },
    ])
    .then((responded) => {
      db.query(
        `INSERT INTO roles SET ?`,
        {
          title: responded.newRole,
          salary: responded.newSalary,
          department_id: responded.newDepartment,
        },
        (err) => {
          if (err) throw err;
          console.log("New role added sucessuflly");
          init();
        }
      );
    });
};
addEmployee = () => {
  inquirer
    .prompt([
      {
        type: "input",
        message: "What is the new employee's first name?",
        name: "newFirst_name",
      },
      {
        type: "input",
        message: "What is the new employee's last name?",
        name: "newLast_name",
      },
      {
        type: "input",
        message: "What is the new employee's role?",
        name: "newRole",
      },
      {
        type: "input",
        message: "What is the new employee's manager?",
        name: "newManager",
      },
    ])
    .then((answer) => {
      db.query(
        `INSERT INTO employees SET ?`,
        {
          first_name: answer.newFirst_name,
          last_name: answer.newLast_name,
          role_id: answer.newRole,
          manager_id: answer.newManager,
        },
        (err) => {
          if (err) throw err;
          console.log("New employee added successfully");
          init();
        }
      );
    });
};
// Update employee -----still working on this
updateEmployee = () => {
  db.query(`SELECT first_name FROM employees`, (error, rows) => {
    if (error) throw error;
    const efnList = rows;
    db.query(`SELECT title FROM roles`, (error, rows) => {
      if (error) throw error;
      const roleList = rows;
      inquirer
        .prompt([
          {
            type: "list",
            message: "Which employee needs updated?",
            choices: efnList,
          },
          {
            type: "list",
            message: "What is the new role?",
            choices: roleList,
          },
        ])
        .then((answers) => {
          const params = [re.body.roles_id, req.params.id];
          db.query(`UPDATE employees SET role_id`, params, (err, result) => {
            if (err) {
              res.status(400).json({ error: err.message });
            } else if (!result.affectedRows) {
              res.json({
                message: "Role NOT found",
              });
            } else {
              res.json({
                message: "You nailed it",
                data: req.body,
                changes: result.affectedRows,
              });
            }
          });
        });
    });
  });
};
//Function call to initialize app
init();
