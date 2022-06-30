//Import and require mysql2
const mysql = require('mysql2')
//Import and require inquirer
const inquirer = require("inquirer")
//Import and require file system
const fs = require('fs');
const { inherits } = require('util');



// Connect to database
const db = mysql.createConnection(
  {
    host: 'localhost',
    user: 'root',
    password: 'password123',
    database: 'workers_db'
  },
  console.log(`Connected to the workers_db database.`)
  );
  
  //calling first function to run when typing node index.js
  const init = () => {
    //initial question that allows users to see the functionallity of the app
    const startingQuestion = () => {
      inquirer
      .prompt([  
        {
          type: 'list',
          name: 'choice',
          message: 'What would you like to do?',
          choices: ["View All Employees", "Add Employees", "Update Employee Role", "View All Roles", "Add Role", "View All Departments", "Add Department", "Quit"]
        },
      ])
      //allows the user to select from an array of choices and have each choice run a function
      .then(answer => {
        switch (answer.choice) {
          case "View All Employees":
          viewEmployee ()
          break;
          
          case "Add Employees":
          addEmployee ()
          break;
          
          case "Update Employee Role":
          updateEmployee ()
          break;
          
          case "View All Roles":
          viewRoles ()
          break;
          
          case "Add Role":
          addRoles ()
          break;
          
          case "View All Departments":
          viewDepartments ()
          break;
          
          case "Add Department":
          addDepartments ()
          break;
          
          case "Quit":
          finishPrompt ()
          break;
        }
      });
      //function to view all employees
      function viewEmployee () {
        
        const sql = `SELECT id, first_name, last_name FROM employee`;
        
        db.query(sql, (err, rows) => {
          if (err) {
            console.log(err);
          } else {
            console.log("\n")
            console.table(rows)
          }
          console.log("\n")
          startingQuestion ();
        });
      }
      
      //function to add an employees
      function addEmployee () {
        
        
        
        console.log("\n")
        startingQuestion ();
      }
      
      //function to update an employees
      function updateEmployee () {
        
        
        
        console.log("\n")
        startingQuestion ();
      }
      
      //function to view all roles
      function viewRoles () {
        
        const sql = 
        `SELECT role.id, role.title, department.name AS department, role.salary 
        FROM role
        JOIN department 
        ON role.department_id = department.id;
        `
        ;
        
        db.query(sql, (err, rows) => {
          if (err) {
            console.log(err);
          } else {
            console.log("\n")
            console.table(rows)
          }
          console.log("\n")
          startingQuestion ();
        });
        
      }
      
      //function to view add a role
      function addRoles () {
        
        
        
        console.log("\n")
        startingQuestion ();
      }
      
      //function to view all departments
      function viewDepartments() {
        
        const sql = `SELECT * FROM department`;
        
        db.query(sql, (err, rows) => {
          if (err) {
            console.log(err);
          } else {
            console.log("\n")
            console.table(rows)
          }
          console.log("\n")
          startingQuestion ();
        });
      }
      
      //function to view add a department
      function addDepartments () {
        
        
        
        console.log("\n")
        startingQuestion ();
      }
    }
    
    //function for when you select quit
    function finishPrompt () {
      console.log ("You have successfully used this application! I hope you found everything you were looking for!");
      process.exit();
      
    }
    
   
    startingQuestion ();
  }
  
  init()