<?php require_once "./src/Views/layouts/header.php"; ?>
<div>
    <table class="w-full text-center text-sm font-light text-surface">
        <thead class="border-b border-neutral-200 font-medium">
            <tr>
                <th scope="col" class="px-6 py-4">ID/Mã môn</th>
                <th scope="col" class="px-6 py-4">Tên môn</th>
                <th scope="col" class="px-6 py-4">Khoa</th>
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
                    <td class="whitespace-nowrap px-6 py-4"><button onclick="btnShowEditForm(event,'<?= $sub->subject_id ?>')" class="p-3 bg-yellow-500">Sửa</button>
                        <button class="p-3 bg-red-500" onclick="handleDelete('<?= $sub->subject_id ?>')">Xóa</button>
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