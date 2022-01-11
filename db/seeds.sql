INSERT INTO departments (department_name)
VALUES
('Managment'),
('Production'),
('Marketing'),
('Accounting');
INSERT INTO managers (complete_name)
VALUES
('Will Shatnor'),
('Tonya Harding'),
('Mellisa Mcdonald'),
('Tim Burton');
INSERT INTO roles (title, salary, department_id)
VALUES
('Manager', 300000, 1),
('Producer', 100000, 2),
('Marketer', 90000, 3),
('Accountant', 80000, 4);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES
('Will', 'Shatnor', 1, NULL),
('Tonya', 'Harding', 2, 1),
('Melissa', 'Mcdonald', 3, 2),
('Tim', 'Burton', 4, 1),
('Jason', 'Bourne', 4, 4);
