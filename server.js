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
            updateEmployeeRole();
        }
    })
}

// Function to show all departments
function displayDepartments () {
    console.log('Here are all the departments:\n')
    const mysqlDepartment = `SELECT department.id AS ID, 
                            department.name AS Department 
                            FROM department;`;

    db.query(mysqlDepartment, (err, data) => {
        if (err) throw err;
        console.table(data);
        promptUserChoices();
    });
    
};

// Function to show all roles
function displayRoles () {
    console.log('Here are all the roles:\n')
    const mysqlRoles = `SELECT title AS Title, 
                        role.id AS Role_ID, 
                        department.name AS Department, 
                        salary AS Salary 
                        FROM role 
                        JOIN department 
                        ON role.department_id = department.id;`

    db.query(mysqlRoles, (err, data) => {
        if (err) throw err;
        console.table(data);
        promptUserChoices();
    });
    
};

// Function to show all employees
function displayEmployees () {
    console.log('Here are all the employees:\n')
    const mysqlEmployees = `SELECT employee.id AS EmployeeID, 
                            employee.first_name AS FirstName, 
                            employee.last_name AS LastName, 
                            role.title AS Title, 
                            department.name AS Department, 
                            role.salary AS Salary, 
                            CONCAT(manager.first_name, ' ', manager.last_name) AS Manager 
                            FROM employee 
                            LEFT JOIN role ON employee.role_id = role.id
                            LEFT JOIN department ON role.department_id = department.id
                            LEFT JOIN employee manager ON employee.manager_id = manager.id;`

    db.query(mysqlEmployees, (err, data) => {
        if(err) throw err;
        console.table(data);
        promptUserChoices();
    })
};

// Function to add a department
function addDepartment () {
    inquirer.prompt([
        {
            type: 'input',
            name: 'department',
            message: 'What is the new department name?'
        }
    ])
    .then((response) => {
        db.query(`INSERT INTO department (name) VALUES (?);`, response.department, (err, data) => {
            if (err) throw err;
            console.log(`${response.department} Department is successfully added!`)
            displayDepartments();
        })
    })
};

// Function to add a role
function addRole () {
    inquirer.prompt ([
        {
            type: 'input',
            name: 'addRole',
            message: "What is the new role you would like to add?"
        },
        {
            type: 'input',
            name: 'addSalary',
            message: 'What is the salary for this role?'
        }

    ])
    .then((res) => {
        const newRole = [res.addRole, res.addSalary];

        db.query(`SELECT name, id FROM department`, (err, data) => {
            if (err) throw err;   
            
            let departments = data.map(({ name, id }) => ({ name: name, value: id }))
            inquirer.prompt ([
                {
                    type: 'list',
                    name: 'pickDept',
                    message: 'What department is this role apart of?',
                    choices: departments
                }
            ])
            .then((res) => {
                const pickedDepartment = res.pickDept;
                newRole.push(pickedDepartment);
                db.query(`INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?);`, newRole, (err, data) => {
                    if (err) throw err;

                    console.log('New role has been successfully added!')
                    displayRoles();
                })
            })
        })
        
    })
}

// Function to add an employee
function addEmployee () {
    inquirer.prompt([
        {
            type: 'input',
            name: 'firstName',
            message: "What is the employee's first name?"
        },
        {
            type: 'input',
            name: 'lastName',
            message: "What is the employee's last name?"
        }
    ])
    .then ((res) => {
        const newEmployee =[res.firstName, res.lastName];
        
        let roleChoices1;
        db.query('SELECT * FROM role;', function (err, roles) {
            if (err) throw err;
            roleChoices1 = roles.map(({ id, title }) => ({ name: title, value: id }));

            inquirer.prompt([
                {
                    type: 'list',
                    name: 'role',
                    message: "What is the employee's role?",
                    choices: roleChoices1
                },
            ])
            .then ((res) => {
                const role = res.role;
                newEmployee.push(role);

                let managerChoices1;
                db.query('SELECT * FROM employee', (err, managers) => {
                    if (err) throw err;
                    managerChoices1 = managers.map(({ id, first_name, last_name }) => ({ name: first_name + " "+ last_name, value: id }));

                    inquirer.prompt([
                        {
                            type: 'list',
                            name: 'manager',
                            message: "Who is the manager for this employee?",
                            choices: managerChoices1
                         }
                    ])
                    .then((res) => {
                        const manager = res.manager;
                        newEmployee.push(manager);

                        const sqlNewEmployee = `INSERT INTO employee (first_name, last_name, role_id, manager_id)
                                                VALUES (?, ?, ?, ?);`
                        db.query(sqlNewEmployee, newEmployee, (err, data) => {
                            if (err) throw err;
                            console.log('New employee has been successfully added!')

                            displayEmployees();
                        })
                    })
                })
            })
        }) 
        })
    
};

// Function to update an employee
function updateEmployeeRole () {
    const sqlEmployee = `SELECT * FROM employee`;

    db.query(sqlEmployee, (err, data) => {
        if (err) throw err;

        const employeeList = data.map(({ id, first_name, last_name }) => ({ name: first_name + " "+ last_name, value: id }));

        inquirer.prompt([
            {
                type: 'list',
                name: 'name',
                message: 'Which employee would you like to update?',
                choices: employeeList
            }
        ])
        .then((res) => {
            const update = [res.name]
            
            db.query('SELECT * FROM role;', function (err, roles) {
                if (err) throw err;

                const roleChoices = roles.map(({ id, title }) => ({ name: title, value: id }));
                inquirer.prompt([
                    {
                        type: 'list',
                        name: 'roleUpdate',
                        message: "What's the employee's new role?",
                        choices: roleChoices
                    }
                ])
                .then((res) => {
                    const newRole = res.roleUpdate;
                    update.push(newRole);
    
                    let updatedEmployee = update[0];
                    update[0] = newRole;
                    update[1] = updatedEmployee;
    
                    const sqlUpdateRole = `UPDATE employee SET role_id = ? WHERE id = ?;`

                    db.query(sqlUpdateRole, update, (err, data) => {
                        if (err) throw err;

                        console.log("Employee's role has been updated!")

                        displayEmployees();
                    })
                })
            })
            
        })

    })
}

