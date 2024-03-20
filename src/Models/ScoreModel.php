<?php

class ScoreModel
{
    use Database;
    public function getScoresBySubjectId($subject_id)
    {
        $scores = $this->table("score")->getListItemsWithCondition('subject_id', $subject_id);
        return $scores;
    }
    public function updateScoreById($score_id, $value)
    {
        $rs = $this->table("score")
            ->update('score_id', $score_id, [
                'value' => $value,
            ]);
        return $rs;
    }
    public function addNewScore($value, $subject_id, $student_id)
    {
        $rs = $this->table("score")
            ->insert([
                'value' => $value,
                'subject_id' => $subject_id,
                'student_id' => $student_id
            ]);
        return $rs;
    }
    public function updateScores($subject_id, $newScores)
    {
        $currentScores = $this->getScoresBySubjectId($subject_id);
        $rs = array();
        foreach ($newScores as $score) {
            $scoreExists = false;

            // Duyệt qua các điểm số hiện tại để kiểm tra xem có tồn tại điểm số này không
            foreach ($currentScores as &$currentScore) {
                if ($score['student_id'] == $currentScore->student_id) {
                    // Nếu tồn tại, cập nhật giá trị của điểm số
                    $this->updateScoreById($currentScore->score_id, $score['value']);
                    $scoreExists = true;
                    break;
                }
            }
            if (!$scoreExists) {
                $this->addNewScore($score['value'], $subject_id, $score['student_id']);
            }
        }
        return $rs;
    }
}
