//Import and require mysql2
const mysql = require('mysql2')
//Import and require inquirer
const inquirer = require("inquirer")
//Import and require asciiart
const logo = require('asciiart-logo');





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
    //Initial text box that appears 
    console.log(
      logo({
          name: 'Employee Tracker',
          borderColor: 'grey',
          logoColor: 'bold-white',
      })
      .render()
  );

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
        
        const sql = `
        SELECT e.id, e.first_name, e.last_name, role.title, department.name AS department, role.salary, CONCAT(m.first_name, ' ' ,m.last_name) AS Manager
        FROM employee e 
        LEFT JOIN employee m 
        ON e.manager_id = m.id
        JOIN role
        ON e.role_id = role.id
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
      
      //function to add an employees
      function addEmployee () {
        const sql = `
        SELECT employee.id, first_name, last_name, title, role.id FROM employee
        JOIN role ON employee.role_id = role.id; `;
     
        let roleChoices = []
        let roleChoicesId = []
        
        let managerChoices = []
        let managerChoicesId = []
        
        db.query(sql, (err, rows) => {
          console.log(rows);

          if (err) {
            console.log(err);
            return;
          }
          roleChoices = rows
          roleChoicesId = roleChoices.map(element => {
            return {name: element.title,
              value: element.id}
            })
          managerChoices = rows
          managerChoicesId = managerChoices.map(element => {
            return {name: `${element.first_name} ${element.last_name}`,
              value: element.id}
            })
          managerChoicesId.unshift({name:"none", value:null});
            inquirer
            .prompt([
              {
                type: 'input',
                name: 'firstName',
                message: "What is the employee's first name?",
              },
              {
                type: 'input',
                name: 'lastName',
                message: "What is the employee's last name?",
              },          
              {
                type: 'list',
                name: 'roleChoice',
                message: "What is the employee's role?",
                choices: roleChoicesId
              },
              {
                type: 'list',
                name: 'managerChoice',
                message: "Who is the employee's manager?",
                choices: managerChoicesId
              },
            ])
            .then(answers => {
              const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id)
              VALUES (?, ?, ?, ?)`;
              console.log(answers);
              const params = [answers.firstName, answers.lastName, answers.roleChoice, answers.managerChoice];
              
              db.query(sql, params, (err, result) => {
                if (err) {
                  console.log(err);
                  return;
                }
                
                startingQuestion ()
              })
            });
          });
        }
        
        //function to update an employees
        function updateEmployee () {

          const sql = `
          SELECT employee.id, first_name, last_name, title, role.id 
          FROM employee
          JOIN role ON employee.role_id = role.id;`;
          let roleChoices = []
          let roleChoicesId = []

          let employeeChoices = []
          let employeeChoicesId = []
          
          db.query(sql, (err, rows) => {
            if (err) {
              console.log(err);
              return;
            }
            employeeChoices = rows
            employeeChoicesId = employeeChoices.map(element => {
                return {name: `${element.first_name} ${element.last_name}`,
                  value: element.id}
              })
            roleChoices = rows
            roleChoicesId = roleChoices.map(element => {
              return {name: element.title,
                value: element.id}
              })
              inquirer
              .prompt([
                {
                  type: 'list',
                  name: 'employeeName',
                  message: "Which employee's role do you want to update?",
                  choices: employeeChoicesId,
                },
                {
                  type: 'list',
                  name: 'roleChoice',
                  message: "Which role do you want to assign the selected employee?",
                  choices: roleChoicesId,
                },
              ])
              .then(answers => {
                const sql = `UPDATE employee SET role_id = ? WHERE id = ?`;
               
                const params = [answers.roleChoice, answers.employeeName];
              
                db.query(sql, params, (err, result) => {
                  if (err) {
                    console.log(err);
                    return;
                  }
                  
                  startingQuestion ()
                })
              });
            });
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
          const sql = `SELECT id, name FROM department `;
          let departmentChoices = []
          let departmentChoicesId = []
          
          db.query(sql, (err, rows) => {
            if (err) {
              console.log(err);
              return;
            }
            departmentChoices = rows
            console.log(rows);
            departmentChoicesId = departmentChoices.map(element => {
              return {name: element.name,
                value: element.id}
              })
              inquirer
              .prompt([
                {
                  type: 'input',
                  name: 'roleName',
                  message: 'What is the name of the role?',
                },
                {
                  type: 'input',
                  name: 'salary',
                  message: 'What is the salary of the role?',
                },          {
                  type: 'list',
                  name: 'departmentChoice',
                  message: 'Which department does the role belong to?',
                  choices: departmentChoicesId
                },
              ])
              .then(answers => {
                const sql = `INSERT INTO role (title, salary, department_id)
                VALUES (?, ?, ?)`;
                console.log(answers);
                const params = [answers.roleName, answers.salary, answers.departmentChoice];
                
                db.query(sql, params, (err, result) => {
                  if (err) {
                    console.log(err);
                    return;
                  }
                  
                  startingQuestion ()
                })
              });
            });
          };
          
          
          
          
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
            inquirer
            .prompt([
              {
                type: 'input',
                name: 'departmentName',
                message: 'What is the name of the department?',
              },
            ])
            .then(answers => {
              const sql = `INSERT INTO department (name)
              VALUES (?)`;
              const params = [answers.departmentName];
              
              
              db.query(sql, params, (err, result) => {
                if (err) {
                  console.log(err);
                  return;
                }
                
                startingQuestion ()
              })
            });
          };
          
        }
        
        
        //function for when you select quit
        function finishPrompt () {
          console.log ("You have successfully closed this application! I hope you have a great day!");
          process.exit();
          
        }
        
        
        startingQuestion ();
      }
      
      init()