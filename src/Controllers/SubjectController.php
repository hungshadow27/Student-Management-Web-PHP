<?php
require('./src/Models/SubjectModel.php');
class SubjectController
{
    use Controller;
    public function index($a = '', $b = '', $c = '')
    {
        $subjectModel = new SubjectModel();
        $subjects = $subjectModel->getAllSubjects();
        $data['subjects'] = $subjects;
        $this->view('Subject.view', $data);
    }
    public function getAllSubject()
    {
        if ($_SERVER['REQUEST_METHOD'] === 'GET') {
            $subjectModel = new SubjectModel();
            $subjects = $subjectModel->getAllSubjects();

            header('Content-Type: application/json');
            echo json_encode($subjects);
        } else {
            echo json_encode(['error' => 'Student ID is not provided']);
        }
    }
    public function getById()
    {
        if (isset($_GET['id'])) {
            $subject_id = $_GET['id'];
            $subjectModel = new SubjectModel();
            $subject = $subjectModel->getSubjectById($subject_id);

            header('Content-Type: application/json');
            echo json_encode($subject);
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
                    $subject_id = $data['subject_id'];
                    $name = $data['name'];
                    $department_id = $data['department_id'];

                    $subjectModel = new SubjectModel();
                    $subjectModel->updateSubjectById($subject_id, $name, $department_id);

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
    public function delete()
    {
        if (isset($_GET['id'])) {
            $subject_id = $_GET['id'];
            $subjectModel = new SubjectModel();
            $subjectModel->deleteSubjectById($subject_id);

            header('Content-Type: application/json');
            echo json_encode(['success' => 'Deleted']);
        } else {
            echo json_encode(['error' => 'Student ID is not provided']);
        }
    }
    public function add()
    {
        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            $json_data = file_get_contents('php://input');

            if (!empty($json_data)) {
                $data = json_decode($json_data, true); // true parameter converts objects to associative arrays

                // Check if JSON decoding was successful
                if ($data !== null) {
                    $subject_id = $data['subject_id'];
                    $name = $data['name'];
                    $department_id = $data['department_id'];

                    $subjectModel = new SubjectModel();
                    $subjectModel->addSubject($subject_id, $name, $department_id);

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
