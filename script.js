var selectedRow = null;
var Datas = [];

function onFormSubmit() {
    if (selectedRow == null) {
        var formData = addNewRecord();
        insertNewRecord(formData);
    } else {
        updateRecord();
        resetForm();
    }
}

function addNewRecord() {
    var data = {};
    var tid = Math.max.apply(Math, Datas.map(data => data.index));
    data.myCheck = false;
    data.index = tid == -Infinity || 0 ? 1 : tid + 1;
    data.name = document.getElementById("name").value;
    data.email = document.getElementById("email").value;
    data.dob = document.getElementById("dob").value;
    data.city = document.getElementById("city").value;
    Datas.push(data);
    return data;
}

function insertNewRecord() {
    var table = document.getElementById("employeeList").getElementsByTagName('tbody')[0];
    table.innerHTML = "";
    Datas.forEach((data, i) => {
        var newRow = table.insertRow();
        newRow.innerHTML = `
            <td><input type="checkbox" name="select"></td>
            <td>${data.index}</td>
            <td>${data.name}</td>
            <td>${data.email}</td>
            <td>${data.dob}</td>
            <td>${data.city}</td>
            <td>
                <a onclick="onEdit(${i}, this)">Edit</a>
                <a onclick="onDelete(${i})">Delete</a>
            </td>
        `;
    });
    resetForm();
}

function check() {
    var checkboxes = document.getElementsByName("select");
    checkboxes.forEach(box => box.checked = true);
}

function checkDelete() {
    var checkboxes = document.getElementsByName("select");
    Datas = Datas.filter((_, i) => !checkboxes[i].checked);
    insertNewRecord();
}

function onDelete(i) {
    Datas.splice(i, 1);
    insertNewRecord();
}

function onEdit(i, td) {
    var data = Datas[i];
    selectedRow = td.parentElement.parentElement;
    document.getElementById("index").value = data.index;
    document.getElementById("name").value = data.name;
    document.getElementById("email").value = data.email;
    document.getElementById("dob").value = data.dob;
    document.getElementById("city").value = data.city;
}

function updateRecord() {
    var id = document.getElementById("index").value - 1;
    Datas[id].index = document.getElementById("index").value;
    Datas[id].name = document.getElementById("name").value;
    Datas[id].email = document.getElementById("email").value;
    Datas[id].dob = document.getElementById("dob").value;
    Datas[id].city = document.getElementById("city").value;

    selectedRow.cells[1].innerHTML = Datas[id].index;
    selectedRow.cells[2].innerHTML = Datas[id].name;
    selectedRow.cells[3].innerHTML = Datas[id].email;
    selectedRow.cells[4].innerHTML = Datas[id].dob;
    selectedRow.cells[5].innerHTML = Datas[id].city;
}

function resetForm() {
    document.getElementById("name").value = "";
    document.getElementById("email").value = "";
    document.getElementById("dob").value = "";
    document.getElementById("city").value = "";
    selectedRow = null;
}
