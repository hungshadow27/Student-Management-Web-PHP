<?php require_once "./src/Views/layouts/header.php"; ?>
<div>
    <table class="w-full text-center text-sm font-light text-surface">
        <thead class="border-b border-neutral-200 font-medium">
            <tr>
                <th scope="col" class="px-6 py-4">ID</th>
                <th scope="col" class="px-6 py-4">Username</th>
                <th scope="col" class="px-6 py-4">Name</th>
                <th scope="col" class="px-6 py-4">Role</th>
                <th scope="col" class="px-6 py-4">Created_At</th>
            </tr>
        </thead>
        <tbody id="user-table">
            <?php foreach ($users as $user) : ?>
                <tr class="border-b border-neutral-200 user-row-<?= $user->user_id ?>">
                    <td class="whitespace-nowrap px-6 py-4 font-medium">
                        <?= $user->user_id ?>
                    </td>
                    <td class="whitespace-nowrap px-6 py-4"><?= $user->username ?></td>
                    <td class="whitespace-nowrap px-6 py-4"><?= $user->name ?></td>
                    <td class="whitespace-nowrap px-6 py-4"><?= $user->role ?></td>
                    <td class="whitespace-nowrap px-6 py-4"><?= $user->created_at ?></td>
                    <td class="whitespace-nowrap px-6 py-4"><button onclick="btnShowEditForm(event,'<?= $user->user_id ?>')" class="p-3 bg-yellow-500">Sửa</button>
                        <button class="p-3 bg-red-500" onclick="handleDelete('<?= $user->user_id ?>')">Xóa</button>
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
    <?php require_once("./src/Views/js/users.js"); ?>
</script>
<?php require_once "./src/Views/layouts/footer.php"; ?>