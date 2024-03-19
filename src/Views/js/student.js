const formContainer = document.getElementById("formContainer");
const loadingContainer = document.getElementById("loadingContainer");
const alertContainer = document.getElementById("alertContainer");

const btnShowEditForm = async (e, student_id) => {
  e.preventDefault();
  loadingContainer.style.display = "block";
  try {
    const resStudent = await fetch(
      "<?= ROOT ?>/student/getById?id=" + student_id
    );
    const dataStudent = await resStudent.json();
    const resClasses = await fetch("<?= ROOT ?>/class/getAllClass");
    const dataClasses = await resClasses.json();
    console.log(dataStudent);
    setTimeout(() => {
      loadingContainer.style.display = "none";
      createEditForm(dataStudent, dataClasses);
    }, 500);
  } catch (error) {
    console.log("There was an error", error);
  }
};
const createEditForm = (dataStudent, dataClasses) => {
  const htmlString = `
        <div class="border-4 border-black rounded text-lg space-y-2 p-3 bg-slate-700 text-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <button class="float-right font-bolđ text-xl bg-red-600 py-2 px-3" onclick="closeForm()">X</button>
            <div class="text-3xl text-yellow-700 w-full text-center">
                Sửa sinh viên
            </div>
            <div class="space-y-3">
                <div class="whitespace-nowrap">
                    <label for="input-student-id">Mã sinh viên</label>
                    <input class="text-black" type="text" id="input-student-id" readonly value="${
                      dataStudent.student_id
                    }">
                </div>
                <div class="whitespace-nowrap">
                    <label for="input-student-name">Họ tên</label>
                    <input class="text-black" type="text" id="input-student-name" value="${
                      dataStudent.name
                    }">
                </div>
                <div class="whitespace-nowrap">
                    <label for="input-student-date">Ngày sinh</label>
                    <input class="text-black" type="date" id="input-student-date" value="${
                      dataStudent.date_of_birth
                    }">
                </div>
                <div class="whitespace-nowrap">
                    <label for="input-student-gender">Giới tính</label>
                    <select id="input-student-gender" class="text-black">
                        <option value="0" ${
                          dataStudent.gender == 0 ? "selected" : ""
                        }>Nam</option>
                        <option value="1" ${
                          dataStudent.gender == 1 ? "selected" : ""
                        }>Nữ</option>
                    </select>
                </div>
                <div class="whitespace-nowrap">
                    <label for="input-student-address">Địa chỉ</label>
                    <input class="text-black" type="text" id="input-student-address" value="${
                      dataStudent.address
                    }">
                </div>
                <div class="whitespace-nowrap">
                    <label for="input-student-class">Lớp</label>
                    <select id="input-student-class" class="text-black">
                      ${dataClasses.map((item, index) => {
                        if (item.class_id == dataStudent.class_id) {
                          return `<option value="${item.class_id}" selected>${item.name} - ${item.department_id}</option>`;
                        } else {
                          return `<option value="${item.class_id}">${item.name} - ${item.department_id}</option>`;
                        }
                      })}
                  </select>

                </div>
            </div>
            <button class="w-full p-2 text-center bg-green-600 font-medium" onclick="handleUpdate(${
              dataStudent.student_id
            })">Sửa</button>
        </div>
    `;
  formContainer.innerHTML = htmlString;
};
const closeForm = () => {
  formContainer.innerHTML = "";
};
const handleUpdate = async (student_id) => {
  const inputId = document.getElementById("input-student-id");
  const inputName = document.getElementById("input-student-name");
  const inputDate = document.getElementById("input-student-date");
  const inputGender = document.getElementById("input-student-gender");
  const inputAddress = document.getElementById("input-student-address");
  const inputClass = document.getElementById("input-student-class");

  const studentInputData = {
    student_id: inputId.value,
    name: inputName.value,
    date: inputDate.value,
    gender: inputGender.value,
    address: inputAddress.value,
    class: inputClass.value,
  };
  loadingContainer.style.display = "block";
  try {
    const res = await fetch("<?= ROOT ?>/student/update?id=" + student_id, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(studentInputData),
    });
    const data = await res.json();
    console.log(data);
    setTimeout(() => {
      loadingContainer.style.display = "none";
      updateAllRows();
      closeForm();
      showAlertSuccess("Cập nhật sinh viên thành công!");
    }, 500);
  } catch (error) {
    showAlertFailed("Có lỗi xảy ra!");
    console.log("There was an error", error);
  }
};
const handleDelete = async (student_id) => {
  if (confirm("Xoá sinh viên này?")) {
    loadingContainer.style.display = "block";
    try {
      const res = await fetch("<?= ROOT ?>/student/delete?id=" + student_id);
      const data = await res.json();
      console.log(data);
      setTimeout(() => {
        loadingContainer.style.display = "none";
        updateAllRows();
        showAlertSuccess("Xoá sinh viên thành công!");
      }, 500);
    } catch (error) {
      showAlertFailed("Có lỗi xảy ra!");
      console.log("There was an error", error);
    }
  }
};
const createAddForm = async () => {
  loadingContainer.style.display = "block";
  try {
    const resClasses = await fetch("<?= ROOT ?>/class/getAllClass");
    const dataClasses = await resClasses.json();
    setTimeout(() => {
      loadingContainer.style.display = "none";
      const htmlString = `
        <div class="border-4 border-black rounded text-lg space-y-2 p-3 bg-slate-700 text-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <button class="float-right font-bolđ text-xl bg-red-600 py-2 px-3" onclick="closeForm()">X</button>
            <div class="text-3xl text-yellow-700 w-full text-center">
                Thêm sinh viên
            </div>
            <div class="space-y-3">
                <div class="whitespace-nowrap">
                    <label for="input-student-id">Mã sinh viên</label>
                    <input class="text-black" type="text" id="input-student-id" placeholder="không bắt buộc(tạo tự động)">
                </div>
                <div class="whitespace-nowrap">
                    <label for="input-student-name">Họ tên</label>
                    <input class="text-black" type="text" id="input-student-name">
                </div>
                <div class="whitespace-nowrap">
                    <label for="input-student-date">Ngày sinh</label>
                    <input class="text-black" type="date" id="input-student-date">
                </div>
                <div class="whitespace-nowrap">
                    <label for="input-student-gender">Giới tính</label>
                    <select id="input-student-gender" class="text-black">
                        <option value="0">Nam</option>
                        <option value="1">Nữ</option>
                    </select>
                </div>
                <div class="whitespace-nowrap">
                    <label for="input-student-address">Địa chỉ</label>
                    <input class="text-black" type="text" id="input-student-address">
                </div>
                <div class="whitespace-nowrap">
                <label for="input-student-class">Lớp</label>
                <select id="input-student-class" class="text-black">
                  ${dataClasses.map((item, index) => {
                    return `<option value="${item.class_id}">${item.name} - ${item.department_id}</option>`;
                  })}
              </select>

            </div>
            </div>
            <button class="w-full p-2 text-center bg-green-600 font-medium" onclick="handleAdd()">Thêm</button>
        </div>
    `;
      formContainer.innerHTML = htmlString;
    }, 500);
  } catch (error) {
    console.log("There was an error", error);
  }
};
const handleAdd = async () => {
  const inputId = document.getElementById("input-student-id");
  const inputName = document.getElementById("input-student-name");
  const inputDate = document.getElementById("input-student-date");
  const inputGender = document.getElementById("input-student-gender");
  const inputAddress = document.getElementById("input-student-address");
  const inputClass = document.getElementById("input-student-class");

  const studentInputData = {
    student_id: inputId.value,
    name: inputName.value,
    date: inputDate.value,
    gender: inputGender.value,
    address: inputAddress.value,
    class: inputClass.value,
  };

  loadingContainer.style.display = "block";
  try {
    const res = await fetch("<?= ROOT ?>/student/add", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(studentInputData),
    });
    const data = await res.json();
    console.log(data);
    setTimeout(() => {
      loadingContainer.style.display = "none";
      updateAllRows();
      closeForm();
      showAlertSuccess("Thêm sinh viên thành công!");
    }, 500);
  } catch (error) {
    showAlertFailed("Có lỗi xảy ra!");
    console.log("There was an error", error);
  }
};
const updateAllRows = async () => {
  loadingContainer.style.display = "block";
  try {
    const resStudents = await fetch("<?= ROOT ?>/student/getAllStudent");
    const dataStudents = await resStudents.json();
    console.log(dataStudents);
    setTimeout(() => {
      loadingContainer.style.display = "none";
      const tableBody = document.querySelector("#student-table");
      tableBody.innerHTML = "";
      dataStudents.forEach((student) => {
        addNewRow(student);
      });
    }, 500);
  } catch (error) {
    console.log("There was an error", error);
  }
};
const addNewRow = (studentData) => {
  const tableBody = document.querySelector("#student-table");
  const newRow = document.createElement("tr");
  newRow.className = `border-b border-neutral-200 class-row-${studentData.class_id}`;
  newRow.innerHTML = `
            <td class="whitespace-nowrap px-6 py-4 font-medium student-id">${
              studentData.student_id
            }</td>
            <td class="whitespace-nowrap px-6 py-4 student-name">${
              studentData.name
            }</td>
            <td class="whitespace-nowrap px-6 py-4 student-date">${
              studentData.date_of_birth
            }</td>
            <td class="whitespace-nowrap px-6 py-4 student-gender">${
              studentData.gender == 0 ? "Nam" : "Nữ"
            }</td>
            <td class="whitespace-nowrap px-6 py-4 student-address">${
              studentData.address
            }</td>
            <td class="whitespace-nowrap px-6 py-4 student-class">${
              studentData.class_info.name
            }</td>
            <td class="whitespace-nowrap px-6 py-4"><button onclick="btnShowEditForm(event,${
              studentData.student_id
            })" class="p-3 bg-yellow-500">Sửa</button>
              <button class="p-3 bg-red-500" onclick="handleDelete(${
                studentData.student_id
              })">Xóa</button>
            </td>
        `;

  tableBody.appendChild(newRow);
};
