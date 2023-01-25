// Import employee constructor
const Employee = require('../lib/Employee');

// creating employee constructor with necessary properties
test('creates an employee object', () => {
    const employee = new Employee('John', 1, 'johnsmith@gmail.com');
    expect(employee.name).toEqual(expect.any(String));
    expect(employee.id).toEqual(expect.any(Number));
    expect(employee.email).toEqual(expect.any(String));
});

// testing methods
test('gets employee name', () => {
    const employee = new Employee('John', 1, 'johnsmith@gmail.com');
    expect(employee.getName()).toEqual(expect.any(String));   
});

test('gets employee id', () => {
    const employee = new Employee('John', 1, 'johnsmith@gmail.com');
    expect(employee.getId()).toEqual(expect.any(Number));
});

test('gets employee email', () => {
    const employee = new Employee('John', 1, 'johnsmith@gmail.com');
    expect(employee.getEmail()).toEqual(expect.any(String));
});

test('gets employee role', () => {
    const employee = new Employee('John', 1, 'johnsmith@gmail.com');
    expect(employee.getRole()).toEqual(expect.any(String));
});