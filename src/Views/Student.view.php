<?php require_once "./src/Views/layouts/header.php"; ?>
<div>
    <table class="w-full text-center text-sm font-light text-surface">
        <thead class="border-b border-neutral-200 font-medium">
            <tr>
                <th scope="col" class="px-6 py-4">ID/Mã sinh viên</th>
                <th scope="col" class="px-6 py-4">Họ và tên</th>
                <th scope="col" class="px-6 py-4">Ngày sinh</th>
                <th scope="col" class="px-6 py-4">Giới tính</th>
                <th scope="col" class="px-6 py-4">Địa chỉ</th>
                <th scope="col" class="px-6 py-4">Lớp</th>
                <th scope="col" class="px-6 py-4">Thao tác</th>
            </tr>
        </thead>
        <tbody id="student-table">
            <?php foreach ($students as $stud) : ?>
                <tr class="border-b border-neutral-200 student-row-<?= $stud->student_id ?>">
                    <td class="whitespace-nowrap px-6 py-4 font-medium">
                        <?= $stud->student_id ?>
                    </td>
                    <td class="whitespace-nowrap px-6 py-4"><?= $stud->name ?></td>
                    <td class="whitespace-nowrap px-6 py-4"><?= $stud->date_of_birth ?></td>
                    <td class="whitespace-nowrap px-6 py-4"><?= $stud->gender == 0 ? "Nam" : "Nữ" ?></td>
                    <td class="whitespace-nowrap px-6 py-4"><?= $stud->address ?></td>
                    <td class="whitespace-nowrap px-6 py-4"><?= $stud->class_info->name ?></td>
                    <td class="whitespace-nowrap px-6 py-4"><button onclick="btnShowEditForm(event,<?= $stud->student_id ?>)" class="p-3 bg-yellow-500">Sửa</button>
                        <button class="p-3 bg-red-500" onclick="handleDelete(<?= $stud->student_id ?>)">Xóa</button>
                    </td>
                </tr>
            <?php endforeach; ?>
        </tbody>
    </table>
    <div class="fixed bottom-0 left-1/2 transform -translate-x-1/2">
        <button class="p-3 bg-blue-500 text-lg" onclick="createAddForm()">Thêm</button>
    </div>
    <div id="formContainer"></div>
</div>
<script>
    <?php require_once("./src/Views/js/student.js"); ?>
</script>
<?php require_once "./src/Views/layouts/footer.php"; ?>