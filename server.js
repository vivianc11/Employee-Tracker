// Importing
const cTable = require('console.table');
const mysql = require('mysql2');
const inquirer = require('inquirer');

const db = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '',
    database: 'employee_db'
});

db.connect((err) => {
    if (err) {
        throw err;
    } else {
        successConnect();
        promptUserChoices();
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



const promptUserChoices = () => {
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
        if (answer.userChoices === 'View all departments') {
            displayDepartments();
        
        } else if (answer.userChoices === "View all roles") {
            displayRoles();

        } else if (answer.userChoices === "View all employees") {
            displayEmployees();

        } else if (answer.userChoices === 'Add a department') {
            addDepartment();

        } else if (answer.userChoices === 'Add a role') {
            addRole();

        } else if (answer.userChoices === "Add an employee") {
            addEmployee();

        } else if (answer.userChoices === "Update an employee role") {
            updateEmployee();
        }
    })
}

// Function to show all departments
function displayDepartments () {
    console.log('Here are all the departments:\n')
    const mysqlDepartment = `SELECT department.id AS ID, department.name AS Department FROM department;`;

    db.query(mysqlDepartment, (err, data) => {
        if (err) throw err;
        console.table(data);
    });
    promptUserChoices();
};

// Function to show all roles
function displayRoles () {
    console.log('Here are all the roles:\n')
    const mysqlRoles = `SELECT id AS Role_ID, title AS Title, salary AS Salary FROM role;`

    db.query(mysqlRoles, (err, data) => {
        if (err) throw err;
        console.table(data);
    });
    promptUserChoices();
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

