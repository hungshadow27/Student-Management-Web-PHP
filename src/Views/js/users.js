const formContainer = document.getElementById("formContainer");
const loadingContainer = document.getElementById("loadingContainer");
const alertContainer = document.getElementById("alertContainer");

const btnShowEditForm = async (e, user_id) => {
  e.preventDefault();
  loadingContainer.style.display = "block";
  try {
    const resUser = await fetch("<?= ROOT ?>/users/getById?id=" + user_id);
    const dataUser = await resUser.json();
    console.log(dataUser);
    setTimeout(() => {
      loadingContainer.style.display = "none";
      createEditForm(dataUser);
    }, 500);
  } catch (error) {
    console.log("There was an error", error);
  }
};
const createEditForm = (dataUser) => {
  const htmlString = `
        <div class="border-4 border-black rounded text-lg space-y-2 p-3 bg-slate-700 text-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <button class="float-right font-bolđ text-xl bg-red-600 py-2 px-3" onclick="closeForm()">X</button>
            <div class="text-3xl text-yellow-700 w-full text-center">
                Sửa User
            </div>
            <div class="space-y-3">
                <div class="whitespace-nowrap">
                    <label for="input-user-id">ID</label>
                    <input class="text-black" type="text" id="input-user-id" readonly value="${
                      dataUser.user_id
                    }">
                </div>
                <div class="whitespace-nowrap">
                    <label for="input-user-id">Username</label>
                    <input class="text-black" type="text" id="input-user-username" readonly value="${
                      dataUser.username
                    }">
                </div>
                <div class="whitespace-nowrap">
                    <label for="input-user-id">Password</label>
                    <input class="text-black" type="text" id="input-user-password" value="${
                      dataUser.password
                    }">
                </div>
                <div class="whitespace-nowrap">
                    <label for="input-user-name">Name</label>
                    <input class="text-black" type="text" id="input-user-name" value="${
                      dataUser.name
                    }">
                </div>
                <div class="whitespace-nowrap">
                    <label for="input-user-role">Role</label>
                    <select id="input-user-role" class="text-black">
                        <option value="admin" ${
                          dataUser.role == "admin" ? "selected" : ""
                        }>Admin</option>
                        <option value="user" ${
                          dataUser.role == "user" ? "selected" : ""
                        }>User</option>
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
  const inputId = document.getElementById("input-user-id");
  const inputUsername = document.getElementById("input-user-username");
  const inputPassword = document.getElementById("input-user-password");
  const inputName = document.getElementById("input-user-name");
  const inputRole = document.getElementById("input-user-role");

  const userInputData = {
    user_id: inputId.value,
    username: inputUsername.value,
    password: inputPassword.value,
    name: inputName.value,
    role: inputRole.value,
  };
  loadingContainer.style.display = "block";
  try {
    const res = await fetch("<?= ROOT ?>/users/update?id=" + inputId.value, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userInputData),
    });
    const data = await res.json();
    console.log(data);
    setTimeout(() => {
      loadingContainer.style.display = "none";
      closeForm();
      updateAllRows();
      showAlertSuccess("Cập nhật user thành công!");
    }, 500);
  } catch (error) {
    showAlertFailed("Có lỗi xảy ra!");
    console.log("There was an error", error);
  }
};
const handleDelete = async (user_id) => {
  if (confirm("Xoá user này?")) {
    loadingContainer.style.display = "block";
    try {
      const res = await fetch("<?= ROOT ?>/users/delete?id=" + user_id);
      const data = await res.json();
      console.log(data);
      setTimeout(() => {
        loadingContainer.style.display = "none";
        updateAllRows();
        showAlertSuccess("Xoá user thành công!");
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
                Add User
            </div>
            <div class="space-y-3">
                <div class="whitespace-nowrap">
                    <label for="input-user-id">ID</label>
                    <input class="text-black" type="text" placeholder="optional" id="input-user-id" readonly value="">
                </div>
                <div class="whitespace-nowrap">
                    <label for="input-user-id">Username</label>
                    <input class="text-black" type="text" id="input-user-username" value="">
                </div>
                <div class="whitespace-nowrap">
                    <label for="input-user-id">Password</label>
                    <input class="text-black" type="text" id="input-user-password" value="">
                </div>
                <div class="whitespace-nowrap">
                    <label for="input-user-name">Name</label>
                    <input class="text-black" type="text" id="input-user-name" value="">
                </div>
                <div class="whitespace-nowrap">
                    <label for="input-user-role">Role</label>
                    <select id="input-user-role" class="text-black">
                        <option value="admin">Admin</option>
                        <option value="user">User</option>
                    </select>
                </div>
                
            </div>
            <button class="w-full p-2 text-center bg-green-600 font-medium" onclick="handleAdd()">Thêm</button>
        </div>
    `;
  formContainer.innerHTML = htmlString;
};
const handleAdd = async () => {
  const inputId = document.getElementById("input-user-id");
  const inputUsername = document.getElementById("input-user-username");
  const inputPassword = document.getElementById("input-user-password");
  const inputName = document.getElementById("input-user-name");
  const inputRole = document.getElementById("input-user-role");

  const userInputData = {
    user_id: inputId.value,
    username: inputUsername.value,
    password: inputPassword.value,
    name: inputName.value,
    role: inputRole.value,
  };

  loadingContainer.style.display = "block";
  try {
    const res = await fetch("<?= ROOT ?>/users/add", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userInputData),
    });
    const data = await res.json();
    console.log(data);
    setTimeout(() => {
      loadingContainer.style.display = "none";
      updateAllRows();
      closeForm();
      showAlertSuccess("Thêm user thành công!");
    }, 500);
  } catch (error) {
    showAlertFailed("Có lỗi xảy ra!");
    console.log("There was an error", error);
  }
};
const updateAllRows = async () => {
  loadingContainer.style.display = "block";
  try {
    const resUsers = await fetch("<?= ROOT ?>/users/getAllUser");
    const dataUsers = await resUsers.json();
    console.log(dataUsers);
    setTimeout(() => {
      loadingContainer.style.display = "none";
      const tableBody = document.querySelector("#user-table");
      tableBody.innerHTML = "";
      dataUsers.forEach((user) => {
        addNewRow(user);
      });
    }, 500);
  } catch (error) {
    console.log("There was an error", error);
  }
};
const addNewRow = (userData) => {
  const tableBody = document.querySelector("#user-table");
  const newRow = document.createElement("tr");
  newRow.className = `border-b border-neutral-200 class-row-${userData.user_id}`;
  newRow.innerHTML = `
  <td class="whitespace-nowrap px-6 py-4 font-medium">
  ${userData.user_id}
</td>
<td class="whitespace-nowrap px-6 py-4">${userData.username}</td>
<td class="whitespace-nowrap px-6 py-4">${userData.name}</td>
<td class="whitespace-nowrap px-6 py-4">${userData.role}</td>
<td class="whitespace-nowrap px-6 py-4">${userData.created_at}</td>
<td class="whitespace-nowrap px-6 py-4"><button onclick="btnShowEditForm(event,'${userData.user_id}')" class="p-3 bg-yellow-500">Sửa</button>
  <button class="p-3 bg-red-500" onclick="handleDelete('${userData.user_id}')">Xóa</button>
</td>
        `;

  tableBody.appendChild(newRow);
};
