//import gen html 

const genHTML = require('./lib/generateHTML');

//import profiles

const Manager = require('./lib/Manager');
const Engineer = require('./lib/Engineer');
const Intern = require('./lib/Intern');

// import modules 

const fs = require('fs');
const inquirer = require('inquirer');

// Array for team

const teamArray = [];

//inquirer prompts
//manager prompts

const addManager = () => {
    return inquirer.prompt ([
        {
            type: 'input',
            name: 'name',
            message: 'Please type Managers name',
            validate: nameInput => {
                if(nameInput) {
                    return true;
                } else {
                    console.log('Please enter a name to continue');
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'id',
            message: 'Please enter your Manager ID number',
            validate: nameInput => {
                if (isNaN(nameInput)) {
                    console.log('Please enter ID number')
                    return false;
                } else {
                    return true;
                }
            }
        },
        {
            type: 'input',
            name: 'email',
            message: "Please enter your work email address",
            validate: email => {
                valid = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)
                if (valid) {
                    return true;
                } else {
                    console.log ('Please enter an email address')
                    return false; 
                }
            }
        },
        {
            type: 'input',
            name: 'officeNumber',
            message: 'Enter your office number',
            validate: nameInput => {
                if (isNaN(nameInput)) {
                    console.log('Please enter your office number')
                    return false;
                } else {
                    return true;
                }
            }
        }
    ])
    .then(managerInput => {
        const {name, id, email, officeNumber} = managerInput;
        const manager = new Manager (name, id, email, officeNumber);

        teamArray.push(manager);
        console.log(manager);
    })
};

// prompt for adding employees

const addEmployee = () => {
    console.log(`
    Adding team members
    `);

    return inquirer.prompt ([
        {
            type: 'list',
            name: 'role',
            message: "Please select your role",
            choices: ['Engineer', 'Intern']
        },
        {
            type: 'input',
            name: 'name',
            message: "Enter your name",
            validate: nameInput => {
                if(nameInput) {
                    return true;
                } else {
                    console.log('Please enter your name');
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'id',
            message: "Please enter your employee ID number",
            validate: nameInput => {
                if (isNaN(nameInput)) {
                    console.log('Enter ID number')
                    return false;
                } else {
                    return true;
                }
            }
        },
        {
            type: 'input',
            name: 'email',
            message: "Please enter your work email",
            validate: email => {
                valid = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)
                if (valid) {
                    return true;
                } else {
                    console.log ('Please enter an email address')
                    return false; 
                }
            }
        },
        {
            type: 'input',
            name: 'github',
            message: "Enter your GitHub username",
            when: (input) => input.role === 'Engineer', 
            validate: nameInput => {
                if(nameInput) {
                    return true;
                } else {
                    console.log('Enter your name to continue');
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'school',
            message: "Enter the name of your school",
            when: (input) => input.role === 'Intern',
            validate: nameInput => {
                if(nameInput) {
                    return true;
                } else {
                    console.log('Enter your name to continue');
                    return false;
                }
            }
        },
        {
            type: 'confirm',
            name: 'confirmAddEmployee',
            message: 'Would you like to add another employee?',
            default: false
        }
    ])
    // adding employees to team array
    .then(employeeData => {
        let {name, id, email, role, github, school, confirmAddEmployee} = employeeData;
        let employee;

        if (role === 'Engineer') {
            employee = new Engineer (name, id, email, github);
            console.log(employee);
        } else if (role === 'Intern') {
            employee = new Intern (name, id, email, school);
            console.log(employee);
        }

        teamArray.push(employee);

        if (confirmAddEmployee) {
            return addEmployee(teamArray);
        } else {
            return teamArray;
        }
    })
};

// function to gen html file using file system
const writeFile = data => {
    fs.writeFile('./index.html', data, err => {
        if (err) {
            console.log(err);
            return;
        } else {
            console.log('Your team profile has been generated')
        }
    })
};

addManager()
    .then(addEmployee)  
    .then(teamArray => {
        return genHTML(teamArray);
    })
    .then(pageHTML => {
        return writeFile(pageHTML);
    })
    .catch(err => {
    console.log(err);
    });