<?php
require('./src/Models/ClassModel.php');
class ClassController
{
    use Controller;
    public function index($a = '', $b = '', $c = '')
    {
        if (!isset($_SESSION['USER'])) {
            redirect('login');
            exit;
        } else if (unserialize($_SESSION['USER'])->role !== 'admin') {
            $this->view('403.view');
            exit;
        }
        $classModel = new ClassModel();
        $classes = $classModel->getAllClasses();
        $data['classes'] = $classes;
        $this->view('Class.view', $data);
    }
    public function getAllClass()
    {
        //Authentication
        if (!isset($_SESSION['USER'])) {
            echo json_encode(['error' => '403: You cannot access this data']);
            exit;
        }
        if ($_SERVER['REQUEST_METHOD'] === 'GET') {
            $classModel = new ClassModel();
            $classes = $classModel->getAllClasses();

            header('Content-Type: application/json');
            echo json_encode($classes);
        } else {
            echo json_encode(['error' => 'Student ID is not provided']);
        }
    }
    public function getById()
    {
        //Authentication
        if (!isset($_SESSION['USER'])) {
            echo json_encode(['error' => '403: You cannot access this data']);
            exit;
        }
        if (isset($_GET['id'])) {
            $class_id = $_GET['id'];
            $classModel = new ClassModel();
            $class = $classModel->getClassById($class_id);

            header('Content-Type: application/json');
            echo json_encode($class);
        } else {
            echo json_encode(['error' => 'Student ID is not provided']);
        }
    }
    public function update()
    {
        //Authentication
        if (!isset($_SESSION['USER']) || (isset($_SESSION['USER']) && unserialize($_SESSION['USER'])->role !== 'admin')) {
            echo json_encode(['error' => '403: You cannot access this data']);
            exit;
        }
        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            $json_data = file_get_contents('php://input');
            if (!empty($json_data)) {
                $data = json_decode($json_data, true); // true parameter converts objects to associative arrays
                if ($data !== null) {
                    $class_id = $data['class_id'];
                    $name = $data['name'];
                    $department_id = $data['department_id'];

                    $classModel = new ClassModel();
                    $classModel->updateClassById($class_id, $name, $department_id);

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
        //Authentication
        if (!isset($_SESSION['USER']) || (isset($_SESSION['USER']) && unserialize($_SESSION['USER'])->role !== 'admin')) {
            echo json_encode(['error' => '403: You cannot access this data']);
            exit;
        }
        if (isset($_GET['id'])) {
            $class_id = $_GET['id'];
            $classModel = new ClassModel();
            $classModel->deleteClassById($class_id);

            header('Content-Type: application/json');
            echo json_encode(['success' => 'Deleted']);
        } else {
            echo json_encode(['error' => 'Student ID is not provided']);
        }
    }
    public function add()
    {
        //Authentication
        if (!isset($_SESSION['USER']) || (isset($_SESSION['USER']) && unserialize($_SESSION['USER'])->role !== 'admin')) {
            echo json_encode(['error' => '403: You cannot access this data']);
            exit;
        }
        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            $json_data = file_get_contents('php://input');

            if (!empty($json_data)) {
                $data = json_decode($json_data, true); // true parameter converts objects to associative arrays

                // Check if JSON decoding was successful
                if ($data !== null) {
                    $class_id = $data['class_id'];
                    $name = $data['name'];
                    $department_id = $data['department_id'];

                    $classModel = new ClassModel();
                    $classModel->addClass($class_id, $name,  $department_id);

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
