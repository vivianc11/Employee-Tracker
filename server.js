// Importing
const cTable = require('console.table');
const mysql = require('mysql2');
const inquirer = require('inquirer');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'employee_db'
});

db.connect((err) => {
    if (err) {
        throw err;
    } else {
        successConnect();
    }
    
})

function successConnect () {
    console.log('-------------------------------')
    console.log('|                             |')
    console.log('|          WELCOME,           |')
    console.log('|      EMPLOYEE MANAGER!      |')
    console.log('|                             |')
    console.log('-------------------------------')
}

const userChoices = () => {
    inquirer.prompt ([
        {
            type: 'list',
            name: 'userChoices',
            message: 'Which of the following would you like to do?',
            choices: ['View all departments', 
            'View all roles', 
            'View all employees', 
            'Add a department', 
            'Add a role', 
            'Add an employee', 
            'Update an employee role']
        }
    ])
    .then ((answer) => {
        if (answer === 'View all departments') {
            displayDepartments();
        
        } else if (answer === "View all roles") {
            displayRoles();

        } else if (answer === "View all employees") {
            displayEmployees();

        } else if (answer === 'Add a department') {
            addDepartment();

        } else if (answer === 'Add a role') {
            addRole();

        } else if (answer === "Add an employee") {
            addEmployee();

        } else if (answer === "Update an employee role") {
            updateEmployee();
        }
    })
}

// Function to show all departments
function displayDepartments () {

};

// Function to show all roles
function displayRoles () {

};

// Function to show all employees
function displayEmployees () {

};

// Function to add a department
function addDepartment () {

};

// Function to add an employee
function addEmployee () {

};

// Function to update an employee
function updateEmployee () {

};