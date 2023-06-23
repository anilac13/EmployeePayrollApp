window.addEventListener('DOMContentLoaded', (event) => {
    createInnerHtml();
});

const createInnerHtml = () => {
    const headerHtml = "<th>Profile pic</th><th>Name</th><th>Gender</th><th>Department</th><th>Salary</th><th>Start Date</th><th>Actions</th>";
    let innerHtml = `${headerHtml}
    
    <tr>
        <td><img class="profile" alt="" img src="../assets/one.jpg"> </td>
        <td>Anil Kumar</td>
        <td>Male</td>
        <td>
        <div class="dept-label">HR</div>
        <div class="dept-label">Engineer</div>
        </td>
        <td>30000</td>
        <td>12 Apr 2020</td>
        <td>
        <img id="1" onclick="remove(this)" alt="delete" src="../assets/delete.png" alt="" 
                style="height: 20px; width: 20px;">
        <img id="1" onclick="update(this)" alt="edit" src="../assets/edit.png" alt=""
                style="height: 20px; width: 20px;">
        </td>
    </tr>`;
    document.querySelector('#display').innerHTML = innerHtml;
}