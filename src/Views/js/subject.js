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
const handleChangeStatus = async (subject_id) => {
  const isChecked = document.querySelector(
    "#toggle-status-" + subject_id
  ).checked;
  loadingContainer.style.display = "block";

  const subjectStatusData = {
    subject_id: subject_id,
    status: isChecked ? "1" : "0",
  };
  try {
    const res = await fetch("<?= ROOT ?>/subject/setstatus", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(subjectStatusData),
    });
    const data = await res.json();
    console.log(data);
    setTimeout(() => {
      loadingContainer.style.display = "none";
      updateAllRows();
      closeForm();
      showAlertSuccess("Thay đổi trạng thái thành công!");
    }, 500);
  } catch (error) {
    showAlertFailed("Có lỗi xảy ra!");
    console.log("There was an error", error);
  }
};
const showListStudentForm = async (subject_id) => {
  loadingContainer.style.display = "block";
  try {
    const resSubject = await fetch(
      "<?= ROOT ?>/subject/getById?id=" + subject_id
    );
    const dataSubject = await resSubject.json();
    const ListStudentInfo = [];
    const registered_students_id = dataSubject.registered_students;

    // Use map to create an array of promises
    const studentPromises = registered_students_id.map(async (student_id) => {
      const resStudent = await fetch(
        "<?= ROOT ?>/student/getById?id=" + student_id
      );
      return await resStudent.json();
    });

    // Wait for all promises to resolve
    ListStudentInfo.push(...(await Promise.all(studentPromises)));

    console.log(dataSubject);
    setTimeout(() => {
      loadingContainer.style.display = "none";
      const htmlString = `
        <div class="border-4 border-black rounded text-lg space-y-2 p-3 bg-slate-700 text-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <button class="float-right font-bolđ text-xl bg-red-600 py-2 px-3" onclick="closeForm()">X</button>
            <div class="text-3xl text-yellow-700 w-full text-center">
                Danh sách sinh viên
            </div>
            <div class="space-y-3">
            ${ListStudentInfo.map((item, index) => {
              return `<div class="whitespace-nowrap">
              <label for="input-subject-id">${item.student_id}</label>
              <input class="text-black" type="text" id="input-subject-id" readonly value="${item.name}-${item.class_id}">
              <label class="font-medium p-1 bg-red-600" onclick="handleDeleteStudent('${dataSubject.subject_id}','${item.student_id}')">-</label>
          </div>`;
            })}    
            </div>
            <button class="w-full p-2 text-center bg-green-600 font-medium" onclick="showAddStudentForm('${
              dataSubject.subject_id
            }')">+</button>
        </div>
    `;
      formContainer.innerHTML = htmlString;
    }, 500);
  } catch (error) {
    console.log("There was an error", error);
  }
};
const showAddStudentForm = (subject_id) => {
  const htmlString = `
        <div class="border-4 border-black rounded text-lg space-y-2 p-3 bg-slate-700 text-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <button class="float-right font-bolđ text-xl bg-red-600 py-2 px-3" onclick="closeForm()">X</button>
            <div class="text-3xl text-yellow-700 w-full text-center">
                Thêm sinh viên
            </div>
            <div class="space-y-3">
                <div class="whitespace-nowrap">
                    <label for="input-subject-id">Mã sinh viên</label>
                    <input class="text-black" type="text" id="input-student-id" placeholder="Nhập mã sinh viên">
                </div>
            </div>
            <button class="w-full p-2 text-center bg-green-600 font-medium" onclick="handleAddStudent('${subject_id}')">Thêm</button>
        </div>
    `;
  formContainer.innerHTML = htmlString;
};
const handleDeleteStudent = async (subject_id, student_id) => {
  if (confirm("Xoá sinh viên này?")) {
    loadingContainer.style.display = "block";
    try {
      const resSubject = await fetch(
        "<?= ROOT ?>/subject/getById?id=" + subject_id
      );
      const dataSubject = await resSubject.json();

      let registered_students_id = await dataSubject.registered_students;

      registered_students_id = await registered_students_id.filter(
        (id) => id != student_id
      );
      console.log(registered_students_id);

      const resUpdate = await fetch(
        "<?= ROOT ?>/subject/updateRegisteredStudents",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            subject_id: subject_id,
            registered_students: registered_students_id,
          }),
        }
      );
      const data = await resUpdate.json();
      console.log(dataSubject);
      setTimeout(() => {
        loadingContainer.style.display = "none";
        closeForm();
        updateAllRows();
        showAlertSuccess("Xoá sinh viên thành công!");
      }, 500);
    } catch (error) {
      console.log("There was an error", error);
    }
  }
};
const handleAddStudent = async (subject_id) => {
  const inputId = document.querySelector("#input-student-id");
  loadingContainer.style.display = "block";
  try {
    const resSubject = await fetch(
      "<?= ROOT ?>/subject/getById?id=" + subject_id
    );
    const dataSubject = await resSubject.json();

    let registered_students_id = await dataSubject.registered_students;

    const studentExists = await registered_students_id.includes(
      parseInt(inputId.value)
    );

    if (studentExists) {
      loadingContainer.style.display = "none";
      return showAlertFailed("Sinh viên đã tồn tại trong danh sách!");
    } else {
      registered_students_id.push(parseInt(inputId.value)); // Parse inputId.value to ensure it's a number
      console.log(`${inputId.value} pushed to the list.`);
    }

    console.log(registered_students_id);

    const resUpdate = await fetch(
      "<?= ROOT ?>/subject/updateRegisteredStudents",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          subject_id: subject_id,
          registered_students: registered_students_id,
        }),
      }
    );
    const data = await resUpdate.json();
    console.log(dataSubject);
    setTimeout(() => {
      loadingContainer.style.display = "none";
      closeForm();
      updateAllRows();
      showAlertSuccess("Thêm sinh viên thành công!");
    }, 500);
  } catch (error) {
    console.log("There was an error", error);
  }
};
const showScoreTable = async (subject_id) => {
  loadingContainer.style.display = "block";
  try {
    const resSubject = await fetch(
      "<?= ROOT ?>/subject/getById?id=" + subject_id
    );
    const dataSubject = await resSubject.json();
    const ListStudentInfo = [];
    const registered_students_id = dataSubject.registered_students;

    // Use map to create an array of promises
    const studentPromises = registered_students_id.map(async (student_id) => {
      const resStudent = await fetch(
        "<?= ROOT ?>/student/getById?id=" + student_id
      );
      return await resStudent.json();
    });

    // Wait for all promises to resolve
    ListStudentInfo.push(...(await Promise.all(studentPromises)));

    const resScores = await fetch(
      "<?= ROOT ?>/score/getBySubjectId?id=" + subject_id
    );
    const dataScores = await resScores.json();

    // Add scores to each student
    console.log(dataScores);
    ListStudentInfo.forEach((student) => {
      const studentScores = dataScores.filter(
        (score) => score.student_id === student.student_id
      );
      student.scores = studentScores;
    });

    console.log(ListStudentInfo);

    console.log(dataSubject);
    setTimeout(() => {
      loadingContainer.style.display = "none";
      const htmlString = `
        <div class="border-4 border-black rounded text-lg w-[80%] bg-white space-y-2 p-3 fixed top-0 left-1/2 transform -translate-x-1/2">
            <button class="float-right font-bolđ text-xl bg-red-600 py-2 px-3" onclick="closeForm()">X</button>
            <div class="text-3xl font-medium text-yellow-700 w-full text-center">
                Nhập điểm
            </div>
            <table class="w-full text-center text-sm font-light text-surface">
        <thead class="border-b border-neutral-200 font-medium">
            <tr>
                <th scope="col" class="px-6 py-4">ID/Mã sinh viên</th>
                <th scope="col" class="px-6 py-4">Tên sinh viên</th>
                <th scope="col" class="px-6 py-4">Điểm</th>
                <th scope="col" class="px-6 py-4">Ngày chấm</th>
            </tr>
        </thead>
        <tbody id="subject-table">
           ${ListStudentInfo.map((item, index) => {
             return `<tr class="border-b border-neutral-200 subject-row-${
               item.student_id
             }">
            <td class="whitespace-nowrap px-6 py-4 font-medium">
            ${item.student_id}
            </td>
            <td class="whitespace-nowrap px-6 py-4">${item.name}</td>
            <td class="whitespace-nowrap px-6 py-4"><input type="text" id="input-value-${
              item.student_id
            }" value="${
               item.scores[0] != undefined ? item.scores[0].value : ""
             }" class="text-center w-[20%] font-medium text-red-500 bg-blue-300 text-lg p-3 rounded"></td>
            <td class="whitespace-nowrap px-6 py-4">${
              item.scores[0] != undefined
                ? item.scores[0].date.split(" ")[0]
                : ""
            }</td>
        </tr>`;
           })}
        </tbody>
    </table>
            <button class="w-full p-2 text-center bg-green-600 font-medium" onclick="handleUpdateScores('${subject_id}')">Lưu</button>
        </div>
    `;
      formContainer.innerHTML = htmlString;
    }, 500);
  } catch (error) {
    console.log("There was an error", error);
  }
};
const handleUpdateScores = async (subject_id) => {
  loadingContainer.style.display = "block";
  try {
    const resSubject = await fetch(
      "<?= ROOT ?>/subject/getById?id=" + subject_id
    );
    const dataSubject = await resSubject.json();
    const ListStudentInfo = [];
    const registered_students_id = dataSubject.registered_students;

    const studentPromises = registered_students_id.map(async (student_id) => {
      const resStudent = await fetch(
        "<?= ROOT ?>/student/getById?id=" + student_id
      );
      return await resStudent.json();
    });
    ListStudentInfo.push(...(await Promise.all(studentPromises)));
    console.log(dataSubject);
    const ListScores = [];
    ListStudentInfo.forEach((student) => {
      const score = {
        value: document.getElementById("input-value-" + student.student_id)
          .value,
        student_id: student.student_id,
        subject_id: subject_id,
      };
      ListScores.push(score);
    });

    const res = await fetch("<?= ROOT ?>/score/update?id=" + subject_id, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(ListScores),
    });
    const data = await res.json();
    console.log(data);
    setTimeout(() => {
      loadingContainer.style.display = "none";
      closeForm();
      showAlertSuccess("Cập nhật điểm thành công!");
    }, 500);
  } catch (error) {
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
            <td class="whitespace-nowrap px-6 py-4 font-medium class-id">${
              subjectData.subject_id
            }</td>
            <td class="whitespace-nowrap px-6 py-4 class-name">${
              subjectData.name
            }</td>
            <td class="whitespace-nowrap px-6 py-4 class-department">${
              subjectData.department_info.name
            }</td>
            <td class="whitespace-nowrap px-6 py-4 class-department">${
              subjectData.registered_students.length
            }</td>
            <td class="whitespace-nowrap px-6 py-4 flex justify-center">
              <label class="flex items-center relative w-max cursor-pointer select-none">
                <input type="checkbox" ${
                  subjectData.status === 0 ? "" : "checked"
                } id="toggle-status-${
    subjectData.subject_id
  }" onclick="handleChangeStatus('${
    subjectData.subject_id
  }')" class="appearance-none transition-colors cursor-pointer w-14 h-7 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black focus:ring-blue-500 bg-red-500" />
                <span class="absolute font-medium text-xs uppercase right-1 text-white"> OFF </span>
                <span class="absolute font-medium text-xs uppercase right-8 text-white"> ON </span>
                <span class="w-7 h-7 right-7 absolute rounded-full transform transition-transform bg-gray-200" />
              </label>
            </td>
            <td class="whitespace-nowrap px-6 py-4">
                <button onclick="btnShowEditForm(event, '${
                  subjectData.subject_id
                }')" class="p-3 bg-slate-500">Sửa</button>
                <button onclick="handleDelete('${
                  subjectData.subject_id
                }')" class="p-3 bg-red-500">Xóa</button>
                <button class="p-3 bg-slate-500" onclick="showListStudentForm('${
                  subjectData.subject_id
                }')">Danh sách SV</button>
                <button class="p-3 bg-slate-500" onclick="showScoreTable('${
                  subjectData.subject_id
                }')">Nhập điểm</button>
            </td>
        `;

  tableBody.appendChild(newRow);
};
