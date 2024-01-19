DROP DATABASE IF EXISTS employeetracker_db;

CREATE DATABASE employeetracker_db;

USE employeetracker_db;

-- department

--     id: INT PRIMARY KEY

--     name: VARCHAR(30) to hold department name

CREATE TABLE department (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, department_name VARCHAR(30) -- to hold department name
);
-- role

--     id: INT PRIMARY KEY

--     title: VARCHAR(30) to hold role title

--     salary: DECIMAL to hold role salary

--     department_id: INT to hold reference to department role belongs to

CREATE TABLE roles (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, title VARCHAR(30), -- to hold role title
    salary DECIMAL, -- to hold role salary
    department_id INT, -- to hold reference to department role belongs to
    FOREIGN KEY (department_id) REFERENCES department (id) --values in the department_id column of the "roles" table should match the values in the id column of the "department" table
);
-- employee

--     id: INT PRIMARY KEY

--     first_name: VARCHAR(30) to hold employee first name

--     last_name: VARCHAR(30) to hold employee last name

--     role_id: INT to hold reference to employee role
CREATE TABLE employees (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, first_name VARCHAR(30), -- to hold employee first name
    last_name VARCHAR(30), -- to hold employee last name
    role_id INT, -- to hold reference to employee role
    FOREIGN KEY (role_id) REFERENCES roles (id) -- the values in the role_id column of the "employees" table should match the values in the id column of the "roles" table
    manager_id INT -- to hold reference to another employee that is manager of the current employee -- may be null if the employee has no manager
);