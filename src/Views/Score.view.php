<?php require_once "./src/Views/layouts/header.php"; ?>
<div>
    <div class="p-5 flex items-center gap-2">
        <div>Choose Subject:</div>
        <select name="subject" id="select-state" placeholder="Pick a subject..." class="select-subject-id p-3 bg-gray-200 w-1/2">
            <option value="">Pick a subject...</option>
            <?php foreach ($subjects as $sub) : ?>
                <option value="<?= $sub->subject_id ?>"><?= $sub->subject_id ?>-<?= $sub->name ?></option>
            <?php endforeach; ?>
        </select>
        <button class="bg-yellow-800 p-3 rounded" onclick="showScoreTable()">Nhập điểm</button>
    </div>
    <div id="formContainer"></div>
</div>
<script>
    <?php require_once("./src/Views/js/score.js"); ?>
</script>
<?php require_once "./src/Views/layouts/footer.php"; ?>