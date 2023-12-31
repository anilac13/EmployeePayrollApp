let isUpdate = false;
let employeePayrollObj = {};

window.addEventListener('DOMContentLoaded', (event) => {
    const name = document.querySelector('#name');
    const textError = document.querySelector('.text-error');
    name.addEventListener('input', function () {
        if (name.value.length == 0) {
            textError.textContent = '';
            return;
        }
        try {
            (new EmployeePayrollData()).name = name.value;;
            textError.textContent = '';
        }
        catch (e) {
            textError.textContent = e;
        }
    });

    const salary = document.querySelector('#salary');
    const output = document.querySelector('.salary-output-text');
    output.textContent = salary.value;
    salary.addEventListener('input', function () {
        output.textContent = salary.value;
    });
    checkForUpdate();
});

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

const resetform = () => {
    setValue('#name', '');
    unsetSelectedValues('[name=profile]');
    unsetSelectedValues('[name=gender]');
    unsetSelectedValues('[name = department]');
    setValue('#salary', '');
    setValue('#notes', '');
    //setValue('#day', 1);
    setSelectedIndex('#day', 0);
    //setValue('#month', 'Jan');
    setSelectedIndex('#month', 0);
    //setValue('#year', 2015);
    setSelectedIndex('#year', 0);
}

// const setSelectedIndex = (id, index) => {
//     const element = document.querySelector(id);
//     element.selectedIndex = index;
// }

const unsetSelectedValues = (propertyValue) => {
    let allItems = document.querySelector(propertyValue);
    allItems.forEach(item => {
        item.checked = false;
    });
}

const redirect = () => {
    window.location.href="../pages/home.html";
}

const setTextValue = (id, value) => {
    const element = document.querySelector(id);
    element.textContent = value;
}
const setValue = (id, value) => {
    const element = document.querySelector(id);
    element.value = value;
}

//check for update
const checkForUpdate = () => {
    const employeePayrollJson = localStorage.getItem('editEmp');
    isUpdate = employeePayrollJson ? true : false;
    if (!isUpdate) return;
    employeePayrollObj = JSON.parse(employeePayrollJson);
    setForm();
}

const setForm = () => {
    setValue('#name', employeePayrollObj._name);
    setSelectedValues('[name = profile]', employeePayrollObj._profilePic);
    setSelectedValues('[name = gender]',employeePayrollObj._gender);
    setSelectedValues('[name = department]', employeePayrollObj._department);
    setValue('#salary', employeePayrollObj._salary);
    setTextValue('.salary-output-text', employeePayrollObj._salary);
    setValue('#notes', employeePayrollObj._notes);
    let date = (employeePayrollObj.StartDate).split(" ");
    setValue('#date', date[0]);
    setValue('#month', date[1]);
    setValue('#year', date[2]);
}

const setSelectedValues = (propertyValue, value) => {
    let allItems = document.querySelectorAll(propertyValue);
    allItems.forEach(item => {
        if (Array.isArray(value)){
            if (value.includes(item.value)){
                item.checked = true;
            }
        }
        else if (item.value == value){
            item.checked = true;
        }
    });
}

const save = (event) => {
    event.preventDefault();
    event.stopPropagation();
    try {
        setEmpPayrollObj();
        //let employeePayrollData = createEmployeeData();
        createAndUpdateStorage();
        resetform();
    }
    catch (e) {
        return;
    }
}

const setEmpPayrollObj = () => {
    employeePayrollObj._name = getInputValueById('#name');
    employeePayrollObj._profilePic = getSelectedValues('[name=profile]').pop();
    employeePayrollObj._gender = getSelectedValues('[name=gender]').pop();
    employeePayrollObj._department = getSelectedValues('[name = department]');
    employeePayrollObj._salary = getInputValueById('#salary');
    employeePayrollObj._notes = getInputValueById('#notes');
    let date = getInputValueById('#day') +" "+ getInputValueById('#month') + " "+getInputValueById('#year');
    employeePayrollObj.StartDate = date;
}

function createAndUpdateStorage() {
    let employeePayrollList = JSON.parse(localStorage.getItem("EmployeePayrollList"));

    if (employeePayrollList){
        let empPayrollData = employeePayrollList.find(empData => empData._id == employeePayrollObj._id);
        if (!empPayrollData){
            employeePayrollList.push(createEmpPayrollData());
        }
        else {
            const index = employeePayrollList.map(empData => empData._id).indexOf(empPayrollData._id);
            employeePayrollList.splice(index, 1, createEmpPayrollData(empPayrollData._id));
        }
    }
    else {
        employeePayrollList = [createEmpPayrollData()];
    }
    alert(employeePayrollList.toString());
    localStorage.setItem("EmployeePayrollList", JSON.stringify(employeePayrollList));
}


const createEmpPayrollData = (id) => {
    let employeePayrollData = new EmployeePayrollData();
    if (!id) employeePayrollData.id = createNewEmployeeId();
    else employeePayrollData.id = id;
    setEmpPayrollData(employeePayrollData);
    return employeePayrollData;
}

const createNewEmployeeId = () => {
    let empId = localStorage.getItem("EmployeeId");
    empId = !empId ? 1 :  (parseInt(empId)+1).toString();
    localStorage.setItem("EmployeeId", empId);
    return empId;
}

const setEmpPayrollData = (employeePayrollData) => {
    try {
        employeePayrollData.name = employeePayrollObj._name;
    }
    catch (e) {
        setTextValue('.text-error', e);
        throw e;
    }
    employeePayrollData.profilePic = employeePayrollObj._profilePic;
    employeePayrollData.gender = employeePayrollObj._gender;
    employeePayrollData.department = employeePayrollObj._department;
    employeePayrollData.salary = employeePayrollObj._salary;
    employeePayrollData.notes = employeePayrollObj._notes;
    employeePayrollData.StartDate = employeePayrollObj.StartDate;
    alert(employeePayrollData.toString());
}