const formContainer = document.getElementById("formContainer");
const loadingContainer = document.getElementById("loadingContainer");
const alertContainer = document.getElementById("alertContainer");

const btnShowEditForm = async (e, subject_id) => {
  e.preventDefault();
  loadingContainer.style.display = "block";
  try {
    const resSubject = await fetch(
      "<?= ROOT ?>/subject/getById?id=" + subject_id
    );
    const dataSubject = await resSubject.json();
    const resDepartments = await fetch(
      "<?= ROOT ?>/department/getAllDepartment"
    );
    const dataDepartments = await resDepartments.json();
    console.log(dataSubject);
    setTimeout(() => {
      loadingContainer.style.display = "none";
      createEditForm(dataSubject, dataDepartments);
    }, 500);
  } catch (error) {
    console.log("There was an error", error);
  }
};
const createEditForm = (dataSubject, dataDepartments) => {
  const htmlString = `
        <div class="border-4 border-black rounded text-lg space-y-2 p-3 bg-slate-700 text-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <button class="float-right font-bolđ text-xl bg-red-600 py-2 px-3" onclick="closeForm()">X</button>
            <div class="text-3xl text-yellow-700 w-full text-center">
                Sửa môn
            </div>
            <div class="space-y-3">
                <div class="whitespace-nowrap">
                    <label for="input-subject-id">Mã môn</label>
                    <input class="text-black" type="text" id="input-subject-id" readonly value="${
                      dataSubject.subject_id
                    }">
                </div>
                <div class="whitespace-nowrap">
                    <label for="input-subject-name">Tên môn</label>
                    <input class="text-black" type="text" id="input-subject-name" value="${
                      dataSubject.name
                    }">
                </div>
                <div class="whitespace-nowrap">
                    <label for="input-subject-department">Khoa</label>
                    <select id="input-subject-department" class="text-black">
                      ${dataDepartments.map((item, index) => {
                        if (item.department_id == dataSubject.department_id) {
                          return `<option value="${item.department_id}" selected>${item.name} - ${item.department_id}</option>`;
                        } else {
                          return `<option value="${item.department_id}">${item.name} - ${item.department_id}</option>`;
                        }
                      })}
                  </select>

                </div>
            </div>
            <button class="w-full p-2 text-center bg-green-600 font-medium" onclick="handleUpdate()">Sửa</button>
        </div>
    `;
  formContainer.innerHTML = htmlString;
};
const closeForm = () => {
  formContainer.innerHTML = "";
};
const handleUpdate = async () => {
  const inputId = document.getElementById("input-subject-id");
  const inputName = document.getElementById("input-subject-name");
  const inputDepartment = document.getElementById("input-subject-department");

  const subjectInputData = {
    subject_id: inputId.value,
    name: inputName.value,
    department_id: inputDepartment.value,
  };
  loadingContainer.style.display = "block";
  try {
    const res = await fetch("<?= ROOT ?>/subject/update?id=" + inputId.value, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(subjectInputData),
    });
    const data = await res.json();
    console.log(data);
    setTimeout(() => {
      loadingContainer.style.display = "none";
      updateAllRows();
      closeForm();
      showAlertSuccess("Cập nhật môn thành công!");
    }, 500);
  } catch (error) {
    showAlertFailed("Có lỗi xảy ra!");
    console.log("There was an error", error);
  }
};

const handleDelete = async (subject_id) => {
  if (confirm("Xoá môn này?")) {
    loadingContainer.style.display = "block";
    try {
      const res = await fetch("<?= ROOT ?>/subject/delete?id=" + subject_id);
      const data = await res.json();
      console.log(data);
      setTimeout(() => {
        loadingContainer.style.display = "none";
        updateAllRows();
        showAlertSuccess("Xoá môn thành công!");
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
    const resDepartments = await fetch(
      "<?= ROOT ?>/department/getAllDepartment"
    );
    const dataDepartments = await resDepartments.json();
    setTimeout(() => {
      loadingContainer.style.display = "none";
      const htmlString = `
        <div class="border-4 border-black rounded text-lg space-y-2 p-3 bg-slate-700 text-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <button class="float-right font-bolđ text-xl bg-red-600 py-2 px-3" onclick="closeForm()">X</button>
            <div class="text-3xl text-yellow-700 w-full text-center">
                Thêm môn
            </div>
            <div class="space-y-3">
                <div class="whitespace-nowrap">
                    <label for="input-subject-id">Mã môn</label>
                    <input class="text-black" type="text" id="input-subject-id">
                </div>
                <div class="whitespace-nowrap">
                    <label for="input-subject-name">Tên môn</label>
                    <input class="text-black" type="text" id="input-subject-name">
                </div>
                <div class="whitespace-nowrap">
                <label for="input-subject-department">Khoa</label>
                <select id="input-subject-department" class="text-black">
                  ${dataDepartments.map((item, index) => {
                    return `<option value="${item.department_id}">${item.name} - ${item.department_id}</option>`;
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
  const inputId = document.getElementById("input-subject-id");
  const inputName = document.getElementById("input-subject-name");
  const inputDepartment = document.getElementById("input-subject-department");

  const subjectInputData = {
    subject_id: inputId.value,
    name: inputName.value,
    department_id: inputDepartment.value,
  };

  loadingContainer.style.display = "block";
  try {
    const res = await fetch("<?= ROOT ?>/subject/add", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(subjectInputData),
    });
    const data = await res.json();
    console.log(data);
    setTimeout(() => {
      loadingContainer.style.display = "none";
      updateAllRows();
      closeForm();
      showAlertSuccess("Thêm môn thành công!");
    }, 500);
  } catch (error) {
    showAlertFailed("Có lỗi xảy ra!");
    console.log("There was an error", error);
  }
};
const updateAllRows = async () => {
  loadingContainer.style.display = "block";
  try {
    const resSubjects = await fetch("<?= ROOT ?>/subject/getAllSubject");
    const dataSubjects = await resSubjects.json();
    console.log(dataSubjects);
    setTimeout(() => {
      loadingContainer.style.display = "none";
      const tableBody = document.querySelector("#subject-table");
      tableBody.innerHTML = "";
      dataSubjects.forEach((subject) => {
        addNewRow(subject);
      });
    }, 500);
  } catch (error) {
    console.log("There was an error", error);
  }
};
const addNewRow = (subjectData) => {
  const tableBody = document.querySelector("#subject-table");
  const newRow = document.createElement("tr");
  newRow.className = `border-b border-neutral-200 class-row-${subjectData.subject_id}`;
  newRow.innerHTML = `
            <td class="whitespace-nowrap px-6 py-4 font-medium class-id">${subjectData.subject_id}</td>
            <td class="whitespace-nowrap px-6 py-4 class-name">${subjectData.name}</td>
            <td class="whitespace-nowrap px-6 py-4 class-department">${subjectData.department_info.name}</td>
            <td class="whitespace-nowrap px-6 py-4">
                <button onclick="btnShowEditForm(event, '${subjectData.subject_id}')" class="p-3 bg-yellow-500">Sửa</button>
                <button onclick="handleDelete('${subjectData.subject_id}')" class="p-3 bg-red-500">Xóa</button>
            </td>
        `;

  tableBody.appendChild(newRow);
};
