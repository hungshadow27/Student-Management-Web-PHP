<?php

use PhpOffice\PhpSpreadsheet\Spreadsheet;
use PhpOffice\PhpSpreadsheet\Writer\Xlsx;

// Include autoloader của PHP Spreadsheet
require 'vendor/autoload.php';
require('./src/Models/StudentModel.php');
class StudentController
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
        $studentModel = new StudentModel();
        $students = $studentModel->getAllStudents();
        $data['students'] = $students;
        $this->view('Student.view', $data);
    }
    public function getAllStudent()
    {
        //Authentication
        if (!isset($_SESSION['USER'])) {
            echo json_encode(['error' => '403: You cannot access this data']);
            exit;
        }
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
        //Authentication
        if (!isset($_SESSION['USER'])) {
            echo json_encode(['error' => '403: You cannot access this data']);
            exit;
        }
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
        //Authentication
        if (!isset($_SESSION['USER']) || (isset($_SESSION['USER']) && unserialize($_SESSION['USER'])->role !== 'admin')) {
            echo json_encode(['error' => '403: You cannot access this data']);
            exit;
        }
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
        //Authentication
        if (!isset($_SESSION['USER']) || (isset($_SESSION['USER']) && unserialize($_SESSION['USER'])->role !== 'admin')) {
            echo json_encode(['error' => '403: You cannot access this data']);
            exit;
        }
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
        //Authentication
        if (!isset($_SESSION['USER']) || (isset($_SESSION['USER']) && unserialize($_SESSION['USER'])->role !== 'admin')) {
            echo json_encode(['error' => '403: You cannot access this data']);
            exit;
        }
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
    public function uploadFileExcel()
    {
        if (isset($_POST["submit"])) {
            if (isset($_FILES['fileUpload'])) {
                //Thư mục bạn lưu file upload
                $target_dir = $target_dir = ROOT . "/uploads";
                //Đường dẫn lưu file trên server
                $target_file   = $target_dir . basename($_FILES["fileUpload"]["name"]);
                $allowUpload   = true;
                //Lấy phần mở rộng của file (txt, jpg, png,...)
                $fileType = pathinfo($target_file, PATHINFO_EXTENSION);
                //Những loại file được phép upload
                $allowtypes    = array('xlsx');
                //Kích thước file lớn nhất được upload (bytes)
                $maxfilesize   = 10000000; //10MB

                //1. Kiểm tra file có bị lỗi không?
                if ($_FILES["fileUpload"]['error'] != 0) {
                    echo "<br>The uploaded file is error or no file selected.";
                    die;
                }

                //2. Kiểm tra loại file upload có được phép không?
                if (!in_array($fileType, $allowtypes)) {
                    echo "<br>Only allow for uploading xlsx files.";
                    $allowUpload = false;
                }

                //3. Kiểm tra kích thước file upload có vượt quá giới hạn cho phép
                if ($_FILES["fileUpload"]["size"] > $maxfilesize) {
                    echo "<br>Size of the uploaded file must be smaller than $maxfilesize bytes.";
                    $allowUpload = false;
                }

                // //4. Kiểm tra file đã tồn tại trên server chưa?
                // if (file_exists($target_file)) {
                //     echo "<br>The file name already exists on the server.";
                //     $allowUpload = false;
                // }

                if ($allowUpload) {
                    //Lưu file vào thư mục được chỉ định trên server
                    if (move_uploaded_file($_FILES["fileUpload"]["tmp_name"], $target_file)) {
                        $this->importExcel($target_file);
                        echo "<script>alert('Upload File thành công!');
                                window.location.replace('" . ROOT . "/student');
                            </script>";
                    } else {
                        echo "<br>An error occurred while uploading the file.";
                    }
                }
            }
        }
    }
    public function exportAndDownloadExcel()
    {
        // Tạo một đối tượng Spreadsheet mới
        $spreadsheet = new Spreadsheet();

        // Tạo một trang tính mới
        $sheet = $spreadsheet->getActiveSheet();

        // Thêm dữ liệu vào các ô của trang tính
        $sheet->setCellValue('A1', 'STT');
        $sheet->setCellValue('B1', 'ID/Mã sinh viên');
        $sheet->setCellValue('C1', 'Họ tên');
        $sheet->setCellValue('D1', 'Giới tính');
        $sheet->setCellValue('E1', 'Ngày sinh');
        $sheet->setCellValue('F1', 'Địa chỉ');
        $sheet->setCellValue('G1', 'Lớp');

        // Dữ liệu mẫu, bạn có thể thay đổi hoặc lấy từ nguồn dữ liệu thực tế
        $studentModel = new StudentModel;
        $data = $studentModel->getAllStudents();

        // Duyệt qua mảng dữ liệu và thêm vào file Excel
        $row = 2;
        foreach ($data as $index => $rowData) {
            $sheet->setCellValue('A' . $row, $index + 1); //stt
            $sheet->setCellValue('B' . $row, $rowData->student_id);
            $sheet->setCellValue('C' . $row, $rowData->name);
            $sheet->setCellValue('D' . $row, $rowData->gender == 0 ? "Nam" : "Nữ");
            $sheet->setCellValue('E' . $row, $rowData->date_of_birth);
            $sheet->setCellValue('F' . $row, $rowData->address);
            $sheet->setCellValue('G' . $row, $rowData->class_info->name);
            $row++;
        }

        // Tạo một tên tập tin duy nhất cho file Excel
        $filename = 'students_' . date('YmdHis') . '.xlsx';

        // Đường dẫn để lưu trữ file Excel trên server
        $filepath = 'uploads/' . $filename;

        // Tạo một đối tượng Writer để ghi file Excel
        $writer = new Xlsx($spreadsheet);

        // Ghi file Excel vào đường dẫn đã chỉ định
        $writer->save($filepath);

        // Chuyển hướng người dùng để tải xuống file Excel
        redirect($filepath);
        exit;
    }
    public function importExcel($filePath)
    {
        $filePath = ROOT . '/' . $filePath;
        // Kiểm tra xem tệp Excel có tồn tại không
        if (!file_exists($filePath)) {
            return false;
        }

        // Tạo một đối tượng đọc tệp Excel
        $reader = \PhpOffice\PhpSpreadsheet\IOFactory::createReader('Xlsx'); // Đối với tệp Excel xlsx
        $spreadsheet = $reader->load($filePath);

        // Lấy dữ liệu từ trang tính đầu tiên
        $sheet = $spreadsheet->getActiveSheet();

        // Lấy số hàng và số cột của bảng
        $highestRow = $sheet->getHighestRow();
        $highestColumn = $sheet->getHighestColumn();

        // Khởi tạo một mảng để lưu trữ dữ liệu
        $data = [];

        // Duyệt qua từng hàng để lấy dữ liệu
        for ($row = 2; $row <= $highestRow; $row++) { // Bắt đầu từ hàng thứ 2 để bỏ qua hàng tiêu đề
            // Khởi tạo một mảng để lưu trữ dữ liệu từ mỗi hàng
            $rowData = [];
            // Duyệt qua từng cột để lấy dữ liệu
            for ($col = 'A'; $col <= $highestColumn; $col++) {
                // Lấy giá trị của ô
                $cellValue = $sheet->getCell($col . $row)->getValue();
                // Thêm giá trị của ô vào mảng dữ liệu của hàng
                $rowData[] = $cellValue;
            }
            // Thêm mảng dữ liệu của hàng vào mảng dữ liệu chung
            $data[] = $rowData;
        }

        // Ở đây, bạn có thể làm gì đó với dữ liệu đã nhập, ví dụ: lưu vào cơ sở dữ liệu hoặc xử lý theo ý của bạn

        return $data;
    }
}
