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
            <td class="profile" alt=""><img src="${empPayrollData._profilePic}"> </td>
            <td>${empPayrollData._name}</td>
            <td>${empPayrollData._gender}</td>
            <td>${getDeptHtml(empPayrollData._department)}</td>
            <td>${empPayrollData._salary}</td>
            <td>${empPayrollData.StartDate}</td>
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


const getDeptHtml = (deptList) => {
    let deptHtml = '';
    for (const dept of deptList) {
        deptHtml = `${deptHtml}<div class = "dept-label"><mark>${dept}</mark></div>`
    }
    return deptHtml;
}

const getEmpDataFromLocalStorage = () => {
    return localStorage.getItem('EmployeePayrollList') ? 
        JSON.parse(localStorage.getItem('EmployeePayrollList')) : [];
}

const remove = (node) => {
    let empPayrollData = empPayrollList.find(empData => empData._id == node.id);
    if (!empPayrollData) return;
    const index = empPayrollList.map(empData => empData._id).indexOf(empPayrollData._id);
    empPayrollList.splice(index, 1);
    localStorage.setItem("EmployeePayrollList", JSON.stringify(empPayrollList));
    document.querySelector(".emp-count").textContent = empPayrollList.length;
    createInnerHtml();
}