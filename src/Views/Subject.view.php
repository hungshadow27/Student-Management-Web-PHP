<?php require_once "./src/Views/layouts/header.php"; ?>
<style>
    input:checked {
        background-color: #22c55e;
        /* bg-green-500 */
    }

    input:checked~span:last-child {
        --tw-translate-x: 1.75rem;
        /* translate-x-7 */
    }
</style>
<div>
    <table class="w-full text-center text-sm font-light text-surface">
        <thead class="border-b border-neutral-200 font-medium">
            <tr>
                <th scope="col" class="px-6 py-4">ID/Mã học phần</th>
                <th scope="col" class="px-6 py-4">Tên học phần</th>
                <th scope="col" class="px-6 py-4">Khoa</th>
                <th scope="col" class="px-6 py-4">Sinh viên</th>
                <th scope="col" class="px-6 py-4">Đăng ký</th>
                <th scope="col" class="px-6 py-4">Thao tác</th>
            </tr>
        </thead>
        <tbody id="subject-table">
            <?php foreach ($subjects as $sub) : ?>
                <tr class="border-b border-neutral-200 subject-row-<?= $sub->subject_id ?>">
                    <td class="whitespace-nowrap px-6 py-4 font-medium">
                        <?= $sub->subject_id ?>
                    </td>
                    <td class="whitespace-nowrap px-6 py-4"><?= $sub->name ?></td>
                    <td class="whitespace-nowrap px-6 py-4"><?= $sub->department_info->name ?></td>
                    <td class="whitespace-nowrap px-6 py-4"><?= count($sub->registered_students) ?></td>
                    <td class="whitespace-nowrap px-6 py-4 flex justify-center"><label class="flex items-center relative w-max cursor-pointer select-none">
                            <input type="checkbox" <?= $sub->status == 0 ? "" : "checked" ?> id="toggle-status-<?= $sub->subject_id ?>" onclick="handleChangeStatus('<?= $sub->subject_id ?>')" class="appearance-none transition-colors cursor-pointer w-14 h-7 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black focus:ring-blue-500 bg-red-500" />
                            <span class="absolute font-medium text-xs uppercase right-1 text-white"> OFF </span>
                            <span class="absolute font-medium text-xs uppercase right-8 text-white"> ON </span>
                            <span class="w-7 h-7 right-7 absolute rounded-full transform transition-transform bg-gray-200" />
                        </label>
                    </td>
                    <td class="whitespace-nowrap px-6 py-4"><button onclick="btnShowEditForm(event,'<?= $sub->subject_id ?>')" class="p-3 bg-yellow-500">Sửa</button>
                        <button class="p-3 bg-red-500" onclick="handleDelete('<?= $sub->subject_id ?>')">Xóa</button>
                        <button class="p-3 bg-green-500" onclick="showListStudentForm('<?= $sub->subject_id ?>')">Danh sách SV</button>
                        <button class="p-3 bg-orange-500" onclick="showScoreTable('<?= $sub->subject_id ?>')">Nhập điểm</button>
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
    <?php require_once("./src/Views/js/subject.js"); ?>
</script>
<?php require_once "./src/Views/layouts/footer.php"; ?>