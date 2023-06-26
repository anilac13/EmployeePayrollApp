let empPayrollList;

window.addEventListener('DOMContentLoaded', (event) => {
    empPayrollList = getEmpDataFromLocalStorage();
    document.querySelector(".emp-count").textContent = empPayrollList.length;
    createInnerHtml();
    localStorage.removeItem('editEmp');
});

const createInnerHtml = () => {
    const headerHtml = "<th>Profile pic</th><th>Name</th><th>Gender</th><th>Department</th><th>Salary</th><th>Start Date</th><th>NOTES</th><th>Actions</th>";
    let innerHtml = `${headerHtml}`;
    //let empPayrollList = createEmployeePayrollJson();
    for (const empPayrollData of empPayrollList) {
        innerHtml = `${innerHtml}   
        <tr>
            <td><img class="profile" alt="" img src="${empPayrollData._profilePic}"> </td>
            <td>${empPayrollData._name}</td>
            <td>${empPayrollData._gender}</td>
            <td>${getDeptHtml(empPayrollData._department)}</td>
            <td>${empPayrollData._salary}</td>
            <td>${empPayrollData._startDate}</td>
            <td>${empPayrollData._notes}</td>
            <td>
            <img id="${empPayrollData._id}" onclick="remove(this)" alt="delete" src="../assets/delete.png" alt="" 
                    style="height: 20px; width: 20px;">
            <img id="${empPayrollData._id}" onclick="update(this)" alt="edit" src="../assets/edit.png" alt=""
                    style="height: 20px; width: 20px;">
            </td>
        </tr>`;
    }
    document.querySelector('#display').innerHTML = innerHtml;
}

// const createEmployeePayrollJson = () => {
//     let empPayrollListLocal = [
//         {
//             _name: "Anil Kumar",
//             _gender: "Male",
//             _department: [
//                 'Engineer', 'HR'
//             ],
//             _salary: 40000,
//             _startDate: '1 Feb 2020',
//             _notes: 'Inspect',
//             _id: new Date().getTime(),
//             _profilePic: '../assets/one.jpg'
//         },
//         {
//             _name: "Soma Shekar",
//             _gender: "Male",
//             _department: [
//                 'Engineer', 'Finance'
//             ],
//             _salary: 30000,
//             _startDate: '5 Apr 2022',
//             _notes: 'Data',
//             _id: new Date().getTime(),
//             _profilePic: '../assets/one.jpg'
//         },
//         {
//             _name: "Ankitha",
//             _gender: "Female",
//             _department: [
//                 'others'
//             ],
//             _salary: 20000,
//             _startDate: '5 Aug 2021',
//             _notes: 'abc',
//             _id: new Date().getTime(),
//             _profilePic: '../assets/person.jpg'
//         },
//         {
//             _name: "Ramya",
//             _gender: "Female",
//             _department: [
//                 'Finanace', 'HR'
//             ],
//             _salary: 23000,
//             _startDate: '10 Jun 2019',
//             _notes: 'Human resource',
//             _id: new Date().getTime(),
//             _profilePic: '../assets/person.jpg'
//         }
//     ];
//     return empPayrollListLocal;
// }

const getDeptHtml = (deptList) => {
    let deptHtml = '';
    for (const dept of deptList) {
        deptHtml = `${deptHtml}<div class="dept-label">${dept}</div>`
    }
    return deptHtml;
}

const getEmpDataFromLocalStorage = () => {
    return localStorage.getItem('EmployeePayrollList') ? JSON.parse(localStorage.getItem('EmployeePayrollList')) : [];
}