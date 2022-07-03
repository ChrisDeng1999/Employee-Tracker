-- for view employee function
SELECT e.id, e.first_name, e.last_name, role.title, department.name AS department, role.salary, CONCAT(m.first_name, ' ' ,m.last_name) AS Manager
FROM employee e 
LEFT JOIN employee m 
ON e.manager_id = m.id
JOIN role
ON e.role_id = role.id
JOIN department
ON role.department_id = department.id;

SELECT employee.id, first_name, last_name, title, role.id FROM employee
JOIN role ON employee.role_id = role.id;

SELECT role.id, role.title, department.name AS department, role.salary 
          FROM role
          JOIN department 
          ON role.department_id = department.id;

SELECT id, name FROM department
SELECT * FROM department

