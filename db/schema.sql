DROP DATABASE IF EXISTS employeetracker_db;

CREATE DATABASE employeetracker_db;

USE employeetracker_db;

CREATE TABLE departments (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, department_name VARCHAR(30)
);

CREATE TABLE roles (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, title VARCHAR(30), salary DECIMAL(10, 2), department_id INT, FOREIGN KEY (department_id) REFERENCES departments (id) ON DELETE SET NULL
);

CREATE TABLE employees (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, first_name VARCHAR(30), last_name VARCHAR(30), role_id INT, manager_id INT
);