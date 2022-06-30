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
  
  const init = () => {

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
      
      function viewEmployee () {

      }

      function addEmployee () {
        
      }

      function updateEmployee () {
        
      }

      function viewRoles () {
        
      }

      function addRoles () {
        
      }

      function viewDepartments() {
        
      }

      function addDepartments () {
        
      }
    }
    
    function finishPrompt () {
        
    }
    

    startingQuestion ();
  }
  
  init()