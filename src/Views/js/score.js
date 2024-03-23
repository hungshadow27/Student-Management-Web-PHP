const showScoreTable = async () => {
  const subject_id =
    document.getElementsByClassName("select-subject-id")[0].value;
  if (subject_id === "") {
    return alert("Please select a subject");
  }
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
          <div class="z-20 border-4 border-black rounded text-lg w-[80%] h-screen bg-white space-y-2 p-3 fixed top-0 left-1/2 transform -translate-x-1/2">
              <button class="float-right font-bolđ text-xl bg-red-600 py-2 px-3" onclick="closeForm()">X</button>
              <div class="text-3xl font-medium text-yellow-700 w-full text-center">
                  Nhập điểm
              </div>
              <table class="w-full text-center text-sm font-light text-surface overflow-y-auto">
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
               }" class="text-center w-[10%] font-medium text-red-500 bg-blue-300 text-lg p-1 rounded"></td>
              <td class="whitespace-nowrap px-6 py-4">${
                item.scores[0] != undefined
                  ? item.scores[0].date.split(" ")[0]
                  : ""
              }</td>
          </tr>`;
             })}
          </tbody>
      </table>
      <div class="absolute bottom-0 left-0 w-full flex px-3 pb-3 justify-between items-center">
          <button class="rounded p-3 text-center bg-green-600 font-medium" onclick="handleUpdateScores('${subject_id}')">Lưu</button>
          <div class="flex justify-between items-center gap-2">
          <a href="<?= ROOT ?>/score/exportAndDownloadExcel?id=${subject_id}" class="rounded p-3 text-center bg-red-300 font-medium">Xuất Excel</a>
          <button class="rounded p-3 text-center bg-red-300 font-medium" onclick="handleShowChart('${subject_id}')">Biểu đồ</button>
          </div>
             
      </div>
              
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
const closeForm = () => {
  formContainer.innerHTML = "";
};
const handleShowChart = async (subject_id) => {
  loadingContainer.style.display = "block";
  try {
    const htmlString = `<div class="w-[50%] border-4 border-black rounded text-lg space-y-2 p-3 absolute z-30 top-[30px] left-1/2 transform -translate-x-1/2 bg-white">
    <button class="float-right font-bolđ text-xl bg-red-600 py-2 px-3" onclick="closeForm()">X</button>
    <div class="text-3xl text-yellow-700 w-full text-center">
        Biểu đồ điểm - ${subject_id}
    </div>
    <div id="chartContainer">
        
    </div>
</div>`;
    formContainer.innerHTML = htmlString;
    const resScores = await fetch(
      "<?= ROOT ?>/score/getBySubjectId ?id=" + subject_id
    );
    const dataScores = await resScores.json();
    const scoreGreaterThan5 = dataScores.filter(
      (score) => score.value >= 5
    ).length;
    const scoreLessThan5 = dataScores.filter((score) => score.value < 5).length;
    setTimeout(() => {
      loadingContainer.style.display = "none";
      google.charts.load("current", { packages: ["corechart"] });
      google.charts.setOnLoadCallback(() =>
        drawChart(scoreGreaterThan5, scoreLessThan5)
      );
    }, 500);
  } catch (error) {
    console.log("There was an error", error);
  }
};

function drawChart(scoreGreaterThan5, scoreLessThan5) {
  // Ensure google.visualization is defined before proceeding
  if (!google.visualization) {
    console.error("Google Charts library not loaded properly");
    return;
  }

  const data = google.visualization.arrayToDataTable([
    ["Tổng số học sinh", "Mhl"],
    ["Điểm dưới 5", scoreLessThan5],
    ["Điểm trên hoặc bằng 5", scoreGreaterThan5],
  ]);

  const options = {
    title: "Biểu đồ thống kê điểm",
  };

  const chart = new google.visualization.PieChart(
    document.getElementById("chartContainer")
  );
  chart.draw(data, options);
}

$(document).ready(function () {
  $("select").selectize({
    sortField: "text",
  });
});
