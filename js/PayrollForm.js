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
        createAndUpdateStorage(employeePayrollData);
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
//old method
const getInputElementValue = (id) => {
    let value = document.getElementById(id).value;
    return value;
}

function createAndUpdateStorage(employeePayrollData) {
    let employeePayrollList = JSON.parse(localStorage.getItem("EmployeePayrollList"));
    if (employeePayrollList != undefined) {
        employeePayrollList.push(employeePayrollData);
    }
    else {
        employeePayrollList = [employeePayrollData];
    }
    alert(employeePayrollList.toString());
    localStorage.setItem("EmployeePayrollList", JSON.stringify(employeePayrollList));
}

const resetform = () => {
    setValue('#name', '');
    unsetSelectedValues('[name=profile]');
    unsetSelectedValues('[name=gender]');
    unsetSelectedValues('[name=department]');
    setValue('#salary', '');
    setValue('#notes', '');
    setValue('#day', 1);
    setValue('#month', 'Jan');
    setValue('#year', 2015);
}

const unsetSelectedValues = (propertyValue) => {
    let allItems = document.querySelector(propertyValue);
    allItems.forEach(item => {
        item.checked = false;
    });
}
const setTextValue = (id, value) => {
    const element = document.querySelector(id);
    element.value = value;
}
const setValue = (id, value) => {
    const element = document.querySelector(id);
    element.value = value;
}