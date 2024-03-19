const formContainer = document.getElementById("formContainer");
const loadingContainer = document.getElementById("loadingContainer");
const alertContainer = document.getElementById("alertContainer");

const btnShowEditForm = async (e, class_id) => {
  e.preventDefault();
  loadingContainer.style.display = "block";
  try {
    const resClass = await fetch("<?= ROOT ?>/class/getById?id=" + class_id);
    const dataClass = await resClass.json();
    const resDepartments = await fetch(
      "<?= ROOT ?>/department/getAllDepartment"
    );
    const dataDepartments = await resDepartments.json();
    console.log(dataClass);
    setTimeout(() => {
      loadingContainer.style.display = "none";
      createEditForm(dataClass, dataDepartments);
    }, 500);
  } catch (error) {
    console.log("There was an error", error);
  }
};
const createEditForm = (dataClass, dataDepartments) => {
  const htmlString = `
        <div class="border-4 border-black rounded text-lg space-y-2 p-3 bg-slate-700 text-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <button class="float-right font-bolđ text-xl bg-red-600 py-2 px-3" onclick="closeForm()">X</button>
            <div class="text-3xl text-yellow-700 w-full text-center">
                Sửa lớp
            </div>
            <div class="space-y-3">
                <div class="whitespace-nowrap">
                    <label for="input-class-id">ID/Mã lớp</label>
                    <input class="text-black" type="text" id="input-class-id" value="${
                      dataClass.class_id
                    }">
                </div>
                <div class="whitespace-nowrap">
                    <label for="input-class-name">Tên lớp</label>
                    <input class="text-black" type="text" id="input-class-name" value="${
                      dataClass.name
                    }">
                </div>
                <div class="whitespace-nowrap">
                    <label for="input-class-department">Khoa</label>
                    <select id="input-class-department" class="text-black">
                      ${dataDepartments.map((item, index) => {
                        if (item.department_id == dataClass.department_id) {
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
  const inputId = document.getElementById("input-class-id");
  const inputName = document.getElementById("input-class-name");
  const inputDepartment = document.getElementById("input-class-department");

  const classInputData = {
    class_id: inputId.value,
    name: inputName.value,
    department_id: inputDepartment.value,
  };
  loadingContainer.style.display = "block";
  try {
    const res = await fetch("<?= ROOT ?>/class/update?id=" + inputId.value, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(classInputData),
    });
    const data = await res.json();
    console.log(data);
    setTimeout(() => {
      loadingContainer.style.display = "none";
      closeForm();
      updateAllRows();
      showAlertSuccess("Cập nhật lớp thành công!");
    }, 500);
  } catch (error) {
    showAlertFailed("Có lỗi xảy ra!");
    console.log("There was an error", error);
  }
};
const handleDelete = async (class_id) => {
  if (confirm("Xoá lớp này?")) {
    loadingContainer.style.display = "block";
    try {
      const res = await fetch("<?= ROOT ?>/class/delete?id=" + class_id);
      const data = await res.json();
      console.log(data);
      setTimeout(() => {
        loadingContainer.style.display = "none";
        updateAllRows();
        showAlertSuccess("Xoá lớp thành công!");
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
              Thêm lớp
          </div>
          <div class="space-y-3">
              <div class="whitespace-nowrap">
                  <label for="input-class-id">Mã lớp</label>
                  <input class="text-black" type="text" id="input-class-id">
              </div>
              <div class="whitespace-nowrap">
                  <label for="input-class-name">Tên lớp</label>
                  <input class="text-black" type="text" id="input-class-name">
              </div>
              <div class="whitespace-nowrap">
                  <label for="input-class-department">Khoa</label>
                  <select id="input-class-department" class="text-black">
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
  const inputId = document.getElementById("input-class-id");
  const inputName = document.getElementById("input-class-name");
  const inputDepartment = document.getElementById("input-class-department");

  const classInputData = {
    class_id: inputId.value,
    name: inputName.value,
    department_id: inputDepartment.value,
  };

  loadingContainer.style.display = "block";
  try {
    const res = await fetch("<?= ROOT ?>/class/add", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(classInputData),
    });
    const data = await res.json();
    console.log(data);
    setTimeout(() => {
      loadingContainer.style.display = "none";
      closeForm();
      updateAllRows();
      showAlertSuccess("Thêm lớp thành công!");
    }, 500);
  } catch (error) {
    showAlertFailed("Có lỗi xảy ra!");
    console.log("There was an error", error);
  }
};
const updateAllRows = async () => {
  loadingContainer.style.display = "block";
  try {
    const resClasses = await fetch("<?= ROOT ?>/class/getAllClass");
    const dataClasses = await resClasses.json();
    console.log(dataClasses);
    setTimeout(() => {
      loadingContainer.style.display = "none";
      const tableBody = document.querySelector("#class-table");
      tableBody.innerHTML = "";
      dataClasses.forEach((classs) => {
        addNewRow(classs);
      });
    }, 500);
  } catch (error) {
    console.log("There was an error", error);
  }
};
const addNewRow = (classData) => {
  const tableBody = document.querySelector("#class-table");
  const newRow = document.createElement("tr");
  newRow.className = `border-b border-neutral-200 class-row-${classData.class_id}`;
  newRow.innerHTML = `
            <td class="whitespace-nowrap px-6 py-4 font-medium class-id">${classData.class_id}</td>
            <td class="whitespace-nowrap px-6 py-4 class-name">${classData.name}</td>
            <td class="whitespace-nowrap px-6 py-4 class-department">${classData.department_info.name}</td>
            <td class="whitespace-nowrap px-6 py-4">
                <button onclick="btnShowEditForm(event, '${classData.class_id}')" class="p-3 bg-yellow-500">Sửa</button>
                <button onclick="handleDelete('${classData.class_id}')" class="p-3 bg-red-500">Xóa</button>
            </td>
        `;

  tableBody.appendChild(newRow);
};
