const formContainer = document.getElementById("formContainer");
const loadingContainer = document.getElementById("loadingContainer");
const alertContainer = document.getElementById("alertContainer");

const btnShowEditForm = async (e, department_id) => {
  e.preventDefault();
  loadingContainer.style.display = "block";
  try {
    const resDepartment = await fetch(
      "<?= ROOT ?>/department/getById?id=" + department_id
    );
    const dataDepartment = await resDepartment.json();
    console.log(dataDepartment);
    setTimeout(() => {
      loadingContainer.style.display = "none";
      createEditForm(dataDepartment);
    }, 500);
  } catch (error) {
    console.log("There was an error", error);
  }
};
const createEditForm = (dataDepartment) => {
  const htmlString = `
        <div class="border-4 border-black rounded text-lg space-y-2 p-3 bg-slate-700 text-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <button class="float-right font-bolđ text-xl bg-red-600 py-2 px-3" onclick="closeForm()">X</button>
            <div class="text-3xl text-yellow-700 w-full text-center">
                Sửa khoa
            </div>
            <div class="space-y-3">
                <div class="whitespace-nowrap">
                    <label for="input-department-id">Mã khoa</label>
                    <input class="text-black" type="text" id="input-department-id" readonly value="${dataDepartment.department_id}">
                </div>
                <div class="whitespace-nowrap">
                    <label for="input-department-name">Tên khoa</label>
                    <input class="text-black" type="text" id="input-department-name" value="${dataDepartment.name}">
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
  const inputId = document.getElementById("input-department-id");
  const inputName = document.getElementById("input-department-name");

  const departmentInputData = {
    department_id: inputId.value,
    name: inputName.value,
  };
  loadingContainer.style.display = "block";
  try {
    const res = await fetch(
      "<?= ROOT ?>/department/update?id=" + inputId.value,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(departmentInputData),
      }
    );
    const data = await res.json();
    console.log(data);
    setTimeout(() => {
      loadingContainer.style.display = "none";
      closeForm();
      updateAllRows();
      showAlertSuccess("Cập nhật khoa thành công!");
    }, 500);
  } catch (error) {
    showAlertFailed("Có lỗi xảy ra!");
    console.log("There was an error", error);
  }
};
const handleDelete = async (department_id) => {
  if (confirm("Xoá khoa này?")) {
    loadingContainer.style.display = "block";
    try {
      const res = await fetch(
        "<?= ROOT ?>/department/delete?id=" + department_id
      );
      const data = await res.json();
      console.log(data);
      setTimeout(() => {
        loadingContainer.style.display = "none";
        updateAllRows();
        showAlertSuccess("Xoá khoa thành công!");
      }, 500);
    } catch (error) {
      showAlertFailed("Có lỗi xảy ra!");
      console.log("There was an error", error);
    }
  }
};
const createAddForm = () => {
  const htmlString = `
        <div class="border-4 border-black rounded text-lg space-y-2 p-3 bg-slate-700 text-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <button class="float-right font-bolđ text-xl bg-red-600 py-2 px-3" onclick="closeForm()">X</button>
            <div class="text-3xl text-yellow-700 w-full text-center">
                Thêm khoa
            </div>
            <div class="space-y-3">
                <div class="whitespace-nowrap">
                    <label for="input-department-id">ID/Mã khoa</label>
                    <input class="text-black" type="text" id="input-department-id">
                </div>
                <div class="whitespace-nowrap">
                    <label for="input-department-name">Tên khoa</label>
                    <input class="text-black" type="text" id="input-department-name">
                </div>
            </div>
            <button class="w-full p-2 text-center bg-green-600 font-medium" onclick="handleAdd()">Thêm</button>
        </div>
    `;
  formContainer.innerHTML = htmlString;
};
const handleAdd = async () => {
  const inputId = document.getElementById("input-department-id");
  const inputName = document.getElementById("input-department-name");

  const departmentInputData = {
    department_id: inputId.value,
    name: inputName.value,
  };

  loadingContainer.style.display = "block";
  try {
    const res = await fetch("<?= ROOT ?>/department/add", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(departmentInputData),
    });
    const data = await res.json();
    console.log(data);
    setTimeout(() => {
      loadingContainer.style.display = "none";
      updateAllRows();
      closeForm();
      showAlertSuccess("Thêm khoa thành công!");
    }, 500);
  } catch (error) {
    showAlertFailed("Có lỗi xảy ra!");
    console.log("There was an error", error);
  }
};
const updateAllRows = async () => {
  loadingContainer.style.display = "block";
  try {
    const resDepartments = await fetch(
      "<?= ROOT ?>/department/getAllDepartment"
    );
    const dataDepartments = await resDepartments.json();
    console.log(dataDepartments);
    setTimeout(() => {
      loadingContainer.style.display = "none";
      const tableBody = document.querySelector("#department-table");
      tableBody.innerHTML = "";
      dataDepartments.forEach((department) => {
        addNewRow(department);
      });
    }, 500);
  } catch (error) {
    console.log("There was an error", error);
  }
};
const addNewRow = (departmentData) => {
  const tableBody = document.querySelector("#department-table");
  const newRow = document.createElement("tr");
  newRow.className = `border-b border-neutral-200 class-row-${departmentData.department_id}`;
  newRow.innerHTML = `
            <td class="whitespace-nowrap px-6 py-4 font-medium class-id">${departmentData.department_id}</td>
            <td class="whitespace-nowrap px-6 py-4 class-name">${departmentData.name}</td>
            <td class="whitespace-nowrap px-6 py-4">
                <button onclick="btnShowEditForm(event, '${departmentData.department_id}')" class="p-3 bg-yellow-500">Sửa</button>
                <button onclick="handleDelete('${departmentData.department_id}')" class="p-3 bg-red-500">Xóa</button>
            </td>
        `;

  tableBody.appendChild(newRow);
};
