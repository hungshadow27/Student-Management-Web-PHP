<?php
require('./src/Models/StudentModel.php');
class StudentController
{
    use Controller;
    public function index($a = '', $b = '', $c = '')
    {
        if (!isset($_SESSION['USER'])) {
            redirect('login');
            exit;
        }
        $studentModel = new StudentModel();
        $students = $studentModel->getAllStudents();
        $data['students'] = $students;
        $this->view('Student.view', $data);
    }
    public function getAllStudent()
    {
        if ($_SERVER['REQUEST_METHOD'] === 'GET') {
            $studentModel = new StudentModel();
            $students = $studentModel->getAllStudents();

            header('Content-Type: application/json');
            echo json_encode($students);
        } else {
            echo json_encode(['error' => 'Student ID is not provided']);
        }
    }
    public function getById()
    {
        if (isset($_GET['id'])) {
            $student_id = $_GET['id'];
            $studentModel = new StudentModel();
            $student = $studentModel->getStudentById($student_id);

            header('Content-Type: application/json');
            echo json_encode($student);
        } else {
            echo json_encode(['error' => 'Student ID is not provided']);
        }
    }
    public function update()
    {
        // Check if data is sent via POST
        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            // Get the raw POST data
            $json_data = file_get_contents('php://input');

            // Check if data exists
            if (!empty($json_data)) {
                // Decode JSON data
                $data = json_decode($json_data, true); // true parameter converts objects to associative arrays

                // Check if JSON decoding was successful
                if ($data !== null) {
                    // Access the data and perform necessary actions
                    $student_id = $data['student_id'];
                    $name = $data['name'];
                    $date = $data['date'];
                    $gender = $data['gender'];
                    $address = $data['address'];
                    $class = $data['class'];

                    // Now you can use these variables to update your database or perform any other actions
                    $studentModel = new StudentModel();
                    $studentModel->updateStudentById($student_id, $name, $date, $gender, $address, $class);
                    // Sample response - you may adjust this according to your requirements
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
            $student_id = $_GET['id'];
            $studentModel = new StudentModel();
            $studentModel->deleteStudentById($student_id);

            header('Content-Type: application/json');
            echo json_encode(['success' => 'Deleted']);
        } else {
            echo json_encode(['error' => 'Student ID is not provided']);
        }
    }
    public function add()
    {
        // Check if data is sent via POST
        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            // Get the raw POST data
            $json_data = file_get_contents('php://input');

            // Check if data exists
            if (!empty($json_data)) {
                // Decode JSON data
                $data = json_decode($json_data, true); // true parameter converts objects to associative arrays

                // Check if JSON decoding was successful
                if ($data !== null) {
                    // Access the data and perform necessary actions
                    $student_id = $data['student_id'];
                    $name = $data['name'];
                    $date = $data['date'];
                    $gender = $data['gender'];
                    $address = $data['address'];
                    $class = $data['class'];

                    // Now you can use these variables to update your database or perform any other actions
                    $studentModel = new StudentModel();
                    $studentModel->addStudent($student_id, $name, $date, $gender, $address, $class);
                    // Sample response - you may adjust this according to your requirements
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
