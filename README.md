# Employee-Tracker

## About the Project
This project entails builing a command-line application to keep track of employees in a given company. This app uses Node.js, Inquirer, Console.table, MySQL2, and MySQL.

## The Build Requirements
### User Story
````
AS A business owner
I WANT to be able to view and manage the departments, roles, and employees in my company
SO THAT I can organize and plan my business
````
### Acceptance Criteria
````
GIVEN a command-line application that accepts user input
WHEN I start the application
THEN I am presented with the following options: view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role
WHEN I choose to view all departments
THEN I am presented with a formatted table showing department names and department ids
WHEN I choose to view all roles
THEN I am presented with the job title, role id, the department that role belongs to, and the salary for that role
WHEN I choose to view all employees
THEN I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to
WHEN I choose to add a department
THEN I am prompted to enter the name of the department and that department is added to the database
WHEN I choose to add a role
THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database
WHEN I choose to add an employee
THEN I am prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database
WHEN I choose to update an employee role
THEN I am prompted to select an employee to update and their new role and this information is updated in the database
````
## Applied Skills
- Continued practice with using Node.js and Inquirer

- Introduction to using Console.table and MySQL2

- Introduction to using MySQL database and how to communicate to the database using MySQL2 in Node.js

- Using .map to place continually updated lists of roles, departments, and managers into choices option in inquirer prompt

- Creating a schema.sql to DROP and CREATE databases as well as creating tables

- Using seeds.sql to populate the tables created in the schema.sql

- Establishing a successful connection to MySQL database in a JS file using MySQL2

## Walkthrough Video
https://drive.google.com/file/d/16gyeFigxg4WSwttGIS06Ny8TuTik6mAI/view
