
var studentNameInput = document.getElementById("studentName");
var studentAgeInput = document.getElementById("studentAge");
var studentEmailInput = document.getElementById("studentEmail");
var studentPasswordInput = document.getElementById("studentPassword");
var studentPhotoInput = document.getElementById("studentPhoto");
var addBtn = document.getElementById("addBtn");
var btnAdd = document.getElementById("btnAdd");
var updateBtn = document.getElementById("updateBtn");
var Data = document.getElementById("Data");
var searchInput = document.getElementById("searchInput");
var Alert = document.getElementById("Alert")
var Alert2 = document.getElementById("Alert2");
var Alert3 = document.getElementById("Alert3");
var Alert4 = document.getElementById("Alert4");
var cureentIndex = 0;
var StudentList = [];
if (localStorage.getItem("studentsContainer") !== null) {
    StudentList = JSON.parse(localStorage.getItem("studentsContainer"));
    displayData();
}
function addStudent() {
    if (isNameValid() && isAgeValid() && isEmailValid() && isPasswordValid()) {
        Student = {
            name: studentNameInput.value,
            age: studentAgeInput.value,
            email: studentEmailInput.value,
            password: studentPasswordInput.value,
            image: studentPhotoInput.files[0] ? `images/${studentPhotoInput.files[0].name}` : 'images/Unknown_person.jpg',
        }
        StudentList.push(Student);
        localStorage.setItem("studentsContainer", JSON.stringify(StudentList))
        displayData();
        Clear();
        console.log(StudentList);
    }
}
function Clear() {
    studentNameInput.value = '';
    studentAgeInput.value = '';
    studentEmailInput.value = '';
    studentPasswordInput.value = '';
    studentPhotoInput.value = '';
    studentNameInput.classList.remove('is-valid');
    studentAgeInput.classList.remove('is-valid');
    studentEmailInput.classList.remove('is-valid');
    studentPasswordInput.classList.remove('is-valid')
}
function displayData() {
    var cartona = ''
    for (var i = 0; i < StudentList.length; i++) {
        cartona += `
            <tr>
                <th scope="row">${StudentList[i].name}</th>
                <td>${StudentList[i].age}</td>
                <td>${StudentList[i].email}</td>
                <td class="table-active">${StudentList[i].password}</td>
                <td><img src="${StudentList[i].image}" alt="Student Photo" width="80"></td>
                <td>
                    <div class="buttons d-flex gap-2">
                        <button onclick="deleteStudent(${i})" class="btn btn-danger"><i class="fa-solid fa-trash"></i></button>
                        <button onclick="editStudent(${i})" class="btn btn-warning"><i class="fa-solid fa-pen-to-square"></i></button>
                    </div>
                </td>
            </tr>
        `;
    }
    document.getElementById("Data").innerHTML = cartona;
}
function deleteStudent(index) {
    StudentList.splice(index, 1);
    localStorage.setItem("studentsContainer", JSON.stringify(StudentList))
    displayData();
}
function searchData() {
    var cartona = '';
    var term = searchInput.value;
    for (var i = 0; i < StudentList.length; i++) {
        if (StudentList[i].name.toLowerCase().includes(term.toLowerCase())) {
            cartona += `
            <tr>
                <th scope="row">${StudentList[i].name}</th>
                <td>${StudentList[i].age}</td>
                <td>${StudentList[i].email}</td>
                <td class="table-active">${StudentList[i].password}</td>
                <td><img src="${StudentList[i].image}" alt="Student Photo" width="80"></td>
                <td>
                    <div class="buttons d-flex gap-2">
                        <button onclick="deleteStudent(${i})" class="btn btn-danger"><i class="fa-solid fa-trash"></i></button>
                        <button onclick="editStudent(${i})" class="btn btn-warning"><i class="fa-solid fa-pen-to-square"></i></button>
                    </div>
                </td>
            </tr>
        `;
        }
    }
    document.getElementById("Data").innerHTML = cartona;
}
function editStudent(index) {
    cureentIndex = index;
    studentNameInput.value = StudentList[index].name;
    studentAgeInput.value = StudentList[index].age;
    studentEmailInput.value = StudentList[index].email;
    studentPasswordInput.value = StudentList[index].password;
    addBtn.classList.add('d-none');
    updateBtn.classList.remove('d-none')
    updateBtn.classList.add('d-block');
}
function updateStudent() {
    Student = {
        name: studentNameInput.value,
        age: studentAgeInput.value,
        email: studentEmailInput.value,
        password: studentPasswordInput.value,
        image: studentPhotoInput.files[0] ? `images/${studentPhotoInput.files[0].name}` : 'images/Unknown_person.jpg',
    }
    StudentList.splice(cureentIndex, 1, Student);
    localStorage.setItem("studentsContainer", JSON.stringify(StudentList))
    displayData();
    Clear();
    addBtn.classList.add('d-block');
    addBtn.classList.remove('d-none')
    updateBtn.classList.add('d-none');
    updateBtn.remove('d-block')
}
var regex = {
    StudentName: /^[A-Za-z ]{3,}$/,
    StudentAge: /^\d+$/,
    StudentEmail: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
    StudentPassword: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{5,}$/,
};

function isNameValid() {
    if (regex.StudentName.test(studentNameInput.value)) {
        return true
    } else {
        return false
    }
}
studentNameInput.addEventListener("keyup", function () {
    if (isNameValid()) {
        studentNameInput.classList.add('is-valid');
        studentNameInput.classList.remove('is-invalid');
        Alert.classList.add('d-none');
        Alert.classList.remove('d-block');
    } else {
        studentNameInput.classList.add('is-invalid');
        studentNameInput.classList.remove('is-valid');
        Alert.classList.remove('d-none');
        Alert.classList.add('d-block');
    }
});

function isAgeValid() {
    const ageValue = studentAgeInput.value.trim();
    const ageRegex = /^\d+$/;

    if (ageRegex.test(ageValue) && Number(ageValue) > 18) {
        return true;
    } else {
        return false;
    }
}

studentAgeInput.addEventListener("keyup", function () {
    if (isAgeValid()) {
        studentAgeInput.classList.add("is-valid");
        studentAgeInput.classList.remove("is-invalid");
        Alert2.classList.add('d-none');
        Alert2.classList.remove('d-block');
    } else {
        studentAgeInput.classList.add("is-invalid");
        studentAgeInput.classList.remove("is-valid");
        Alert2.classList.remove('d-none');
        Alert2.classList.add('d-block');
    }
});
function isEmailValid() {
    if (regex.StudentEmail.test(studentEmailInput.value)) {
        return true
    } else {
        return false
    }
}
studentEmailInput.addEventListener("keyup", function () {
    if (isEmailValid() == true) {
        studentEmailInput.classList.add('is-valid');
        studentEmailInput.classList.remove('is-invalid');
        Alert3.classList.add('d-none');
        Alert3.classList.remove('d-block');
    } else {
        studentEmailInput.classList.add('is-invalid');
        studentEmailInput.classList.remove('is-valid');
        Alert3.classList.remove('d-none');
        Alert3.classList.add('d-block');
    }
});
function isPasswordValid() {
    if (regex.StudentPassword.test(studentPasswordInput.value)) {
        return true
    } else {
        return false
    }
}
studentPasswordInput.addEventListener("keyup", function () {
    if (isPasswordValid() == true) {
        studentPasswordInput.classList.add('is-valid');
        studentPasswordInput.classList.remove('is-invalid');
        Alert4.classList.add('d-none');
        Alert4.classList.remove('d-block');
    } else {
        studentPasswordInput.classList.add('is-invalid');
        studentPasswordInput.classList.remove('is-valid');
        Alert4.classList.remove('d-none');
        Alert4.classList.add('d-block');
    }
})

