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
}