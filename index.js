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
        
        function generateEmployeeList (id, name) {
          this.id = id;
          this.name = name;
        }
        var employees = new generateEmployeeList (1, "Chris Deng")
        
        console.table([employees]);
        
        const array = [{myId: 42, name: 'John', color: 'red'}, {myId: 1337, name: 'Jane', color: 'blue'}]
        
        const transformed = array.reduce((acc, {myId, ...x}) => { acc[myId] = x; return acc}, {})
        
        console.table(transformed)
        
        const { Console } = require('console');
        const { Transform } = require('stream');
        
        function table(input) {
          // @see https://stackoverflow.com/a/67859384
          const ts = new Transform({ transform(chunk, enc, cb) { cb(null, chunk) } })
          const logger = new Console({ stdout: ts })
          logger.table(input)
          const table = (ts.read() || '').toString()
          let result = '';
          for (let row of table.split(/[\r\n]+/)) {
            let r = row.replace(/[^┬]*┬/, '┌');
            r = r.replace(/^├─*┼/, '├');
            r = r.replace(/│[^│]*/, '');
            r = r.replace(/^└─*┴/, '└');
            r = r.replace(/'/g, ' ');
            result += `${r}\n`;
          }
          console.log(result);
        }
        
        const test = [
          { id: '1', name: 'Chris Deng' },
          { id: '2', name: 'John Adams' },
          { id: '3', name: 'Michael Jordan' }
        ];
        
        table(test);
        
        startingQuestion ();
      }
      
      //function to add an employees
      function addEmployee () {
        
        
        
        
        startingQuestion ();
      }
      
      //function to update an employees
      function updateEmployee () {
        
        
        
        
        startingQuestion ();
      }
      
      //function to view all roles
      function viewRoles () {
        
        
        
        
        startingQuestion ();
      }
      
      //function to view add a role
      function addRoles () {
        
        
        
        
        startingQuestion ();
      }
      
      //function to view all departments
      function viewDepartments() {
        
        
        
        
        startingQuestion ();
      }
      
      //function to view add a department
      function addDepartments () {
        
        
        
        
        startingQuestion ();
      }
    }
    
    //function for when you select quit
    function finishPrompt () {
      console.log ("You have successfully used this application! I hope you found everything you were looking for!")
    }
    
    
    startingQuestion ();
  }
  
  init()