INSERT INTO
    departments (department_name)
VALUES ('Sales'),
    ('Engineering'),
    ('Finance'),
    ('Legal');

INSERT INTO
    roles (title, salary, department_id)
VALUES ('Sales Manager', 120000, 1),
    ('Salesperson', 100000, 1),
    ('Lead Engineer', 150000, 2),
    (
        'Software Engineer', 120000, 2
    ),
    ('Account Manager', 150000, 3),
    ('Accountant', 120000, 3),
    (
        'Legal Department Manager', 300000, 4
    ),
    ('Lawyer', 250000, 4);

INSERT INTO
    employees (
        first_name, last_name, role_id, manager_id
    )
VALUES ('Tristan', 'Schmidt', 1, NULL),
    ('Colin', 'Schmidt', 2, 1),
    ('Karina', 'Schmidt', 3, NULL),
    ('Jessica', 'Schmidt', 4, 3),
    ('Lea', 'Villaverde', 5, NULL),
    ('Mary', 'Jibben', 6, 5),
    ('Marie', 'Green', 7, NULL),
    ('Alexa', 'Bellamy', 8, 7);