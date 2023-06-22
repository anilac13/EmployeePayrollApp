window.addEventListener('DOMContentLoaded', (event) => {
    const name = document.querySelector('#name');
    const textError = document.querySelector('.text-error');
    name.addEventListener('input', function () {
        if (name.ariaValueMax.length == 0) {
            textError.textContent = '';
            return;
        }
        try {
            (new EmployeePayrollData()).name = name.value;;
            textError.textContent = '';
            return;
        }
        catch (e) {
            textError.textContent = e;
        }
    });

    const salary = document.querySelector('salary');
    const output = document.querySelector('.salary-output');
    output.textContent = salary.value;
    salary.addEventListener('input', function () {
        output.textContent = salary.value;
    });

    startDate.addEventListener('input', function () {
        try {
            (new EmployeePayrollData()).startDate = startDate.value;;
            textError.textContent = '';
        }
        catch (e) {
            textError.textContent = e;
        }
    })
});

const save = () => {
    try {
        let employeePayrollData = createEmployeeData();
    }
    catch (e) {
        return;
    }
}
const createEmployeeData = () => {
    let employeePayrollData = new EmployeePayrollData();
    try {
        employeePayrollData.name = getInputValueById('#name');
    }
    catch (e) {
        setTextValue('.text-error', e);
        throw e;
    }
    employeePayrollData.profilePic = getSelectedValues('[name=profile]').pop();
    employeePayrollData.gender = getSelectedValues('[name=gender]').pop();
    employeePayrollData.department = getSelectedValues('[name=department]');
    employeePayrollData.salary = getInputValueById('#salary');
    employeePayrollData.notes = getInputValueById('#notes');
    let date = getInputValueById('#day') + " " + getInputValueById('#month') + " " + getInputValueById('#year');
    employeePayrollData.startDate = date;
    alert("Employee payroll data is populated in object " + employeePayrollData.toString());
    return employeePayrollData;
}

const getSelectedValues = (propertyValue) => {
    let allItems = document.querySelectorAll(propertyValue);
    let setItems = [];
    allItems.forEach(item => {
        if (item.checked) setItems.push(item.value);
    });
    return setItems;
}
const getInputValueById = (id) => {
    let value = document.querySelector(id).value;
    return value;
}
// const getInputElementValue = (id) => {
//     let value = document.getElementById(id).value;
//     return value;
// }