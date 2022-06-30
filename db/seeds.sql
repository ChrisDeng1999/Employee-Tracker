INSERT INTO department (id, name)
VALUES (1, "Marketing"),
       (2, "Finance"),
       (3, "Human Resources");

INSERT INTO role (id, title, salary, department_id)
VALUES (1, "Manager", 100000, 1),
       (2, "Engineer", 70000, 2),
       (3, "Intern", 30000, 3);


INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (1, "John", "Jerry", 1, 1),
       (2, "Adam", "Adeer", 2, 2),
       (3, "Steve", "Stephenson", 3, 3);
