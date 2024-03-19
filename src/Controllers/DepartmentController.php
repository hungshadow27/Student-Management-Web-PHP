<?php
require('./src/Models/DepartmentModel.php');
class DepartmentController
{
    use Controller;
    public function index($a = '', $b = '', $c = '')
    {
        $departmentModel = new DepartmentModel();
        $departments = $departmentModel->getAllDepartments();
        $data['departments'] = $departments;
        $this->view('Department.view', $data);
    }
    public function getAllDepartment()
    {
        if ($_SERVER['REQUEST_METHOD'] === 'GET') {
            $departmentModel = new DepartmentModel();
            $departments = $departmentModel->getAllDepartments();
            header('Content-Type: application/json');
            echo json_encode($departments);
        } else {
            echo json_encode(['error' => 'Student ID is not provided']);
        }
    }
    public function getById()
    {
        if (isset($_GET['id'])) {
            $department_id = $_GET['id'];
            $departmentModel = new DepartmentModel();
            $department = $departmentModel->getDepartmentById($department_id);

            header('Content-Type: application/json');
            echo json_encode($department);
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
                    $department_id = $data['department_id'];
                    $name = $data['name'];

                    $departmentModel = new DepartmentModel();
                    $departmentModel->updateDepartmentById($department_id, $name);

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
            $department_id = $_GET['id'];
            $departmentModel = new DepartmentModel();
            $departmentModel->deleteDepartmentById($department_id);

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
                    $department_id = $data['department_id'];
                    $name = $data['name'];

                    $departmentModel = new DepartmentModel();
                    $departmentModel->addDepartment($department_id, $name);

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
