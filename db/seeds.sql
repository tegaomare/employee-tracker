-- DEPARTMENT SEEDS -----
INSERT INTO department (name)
VALUE ("Africa Command");
INSERT INTO department (name)
VALUE ("Agency for Global Media");
INSERT INTO department (name)
VALUE ("Air Force");
INSERT INTO department (name)
VALUE ("Bankruptcy Court");

-- EMPLOYEE ROLE SEEDS -------
INSERT INTO role (title, salary, department_id)
VALUE ("Agency for Global Media", 220000, 2);
INSERT INTO role (title, salary, department_id)
VALUE ("Bankruptcy Court", 230000, 4);
INSERT INTO role (title, salary, department_id)
VALUE ("Air Force", 130000, 3);
INSERT INTO role (title, salary, department_id)
VALUE ("Africa Command", 110000, 1);
INSERT INTO role (title, salary, department_id)
VALUE ("Africa Command", 70000, 1);
INSERT INTO role (title, salary, department_id)
VALUE ("Agency for Global Media", 230000, 2);
INSERT INTO role (title, salary, department_id)
VALUE ("Bankruptcy Court", 200000, 4);

-- EMPLOYEE SEEDS -------
INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUE ("Normani", "White", null, 1);
INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUE ("Maya", "Rose", null, 2);
INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUE ("Daniel", "Omare", null,3 );
INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUE ("Aziz", "Abdul", 1, 4);
INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUE ("Ben", "Snow", 4, 5);
INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUE ("Justin", "Bieber", 1, 6);
INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUE ("Lagertha", "Queen", 2, 7);