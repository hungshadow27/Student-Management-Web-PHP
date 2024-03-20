<?php
require('./src/Models/ScoreModel.php');
class ScoreController
{
    use Controller;
    public function index($a = '', $b = '', $c = '')
    {
        echo "403";
    }
    public function getBySubjectId()
    {
        if (isset($_GET['id'])) {
            $subject_id = $_GET['id'];
            $scoreModel = new ScoreModel();
            $scores = $scoreModel->getScoresBySubjectId($subject_id);

            header('Content-Type: application/json');
            echo json_encode($scores);
        } else {
            echo json_encode(['error' => 'Student ID is not provided']);
        }
    }
    public function update()
    {
        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            $json_data = file_get_contents('php://input');
            if (!empty($json_data)) {
                $data = json_decode($json_data, true); // true parameter converts objects to associative arrays
                if ($data !== null) {
                    $subject_id = $_GET['id'];
                    $ListScores  = $data;

                    $scoreModel = new ScoreModel();
                    $scoreModel->updateScores($subject_id, $ListScores);

                    header('Content-Type: application/json');
                    echo json_encode(['success' => true, 'message' => 'Data received successfully']);
                    exit; // Terminate the script after sending the response
                } else {
                    echo json_encode(['error' => 'Invalid JSON data']);
                }
            } else {
                echo json_encode(['error' => 'No data received']);
            }
        } else {
            echo json_encode(['error' => 'Only POST requests are allowed']);
        }
    }
}
