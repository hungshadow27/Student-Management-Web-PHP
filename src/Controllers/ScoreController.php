<?php

use PhpOffice\PhpSpreadsheet\Spreadsheet;
use PhpOffice\PhpSpreadsheet\Writer\Xlsx;

// Include autoloader của PHP Spreadsheet
require 'vendor/autoload.php';
require_once('./src/Models/ScoreModel.php');
require_once('./src/Models/SubjectModel.php');
class ScoreController
{
    use Controller;
    public function index($a = '', $b = '', $c = '')
    {
        if (!isset($_SESSION['USER'])) {
            redirect('login');
            exit;
        }
        $subjectModel = new SubjectModel();
        $subjects = $subjectModel->getAllSubjects();
        $data['subjects'] = $subjects;
        $this->view('Score.view', $data);
    }
    public function getBySubjectId()
    {
        //Authentication
        if (!isset($_SESSION['USER'])) {
            echo json_encode(['error' => '403: You cannot access this data']);
            exit;
        }
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
        //Authentication
        if (!isset($_SESSION['USER'])) {
            echo json_encode(['error' => '403: You cannot access this data']);
            exit;
        }
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
    public function exportAndDownloadExcel()
    {
        if (isset($_GET['id'])) {
            $subject_id = $_GET['id'];
            // Tạo một đối tượng Spreadsheet mới
            $spreadsheet = new Spreadsheet();

            // Tạo một trang tính mới
            $sheet = $spreadsheet->getActiveSheet();

            // Thêm dữ liệu vào các ô của trang tính
            $sheet->setCellValue('A2', 'STT');
            $sheet->setCellValue('B2', 'ID/Mã sinh viên');
            $sheet->setCellValue('C2', 'Họ tên');
            $sheet->setCellValue('D2', 'Giới tính');
            $sheet->setCellValue('E2', 'Điểm');
            $sheet->setCellValue('F2', 'Ngày chấm');

            // Dữ liệu mẫu, bạn có thể thay đổi hoặc lấy từ nguồn dữ liệu thực tế
            $scoreModel = new ScoreModel;
            $data = $scoreModel->getScoresBySubjectId($subject_id);
            $sheet->setCellValue('A1', "Bảng điểm học phần " . $data[0]->subject_info->name . " - " . $data[0]->subject_info->subject_id);

            // Duyệt qua mảng dữ liệu và thêm vào file Excel
            $row = 3;
            foreach ($data as $index => $rowData) {
                $sheet->setCellValue('A' . $row, $index + 1); //stt
                $sheet->setCellValue('B' . $row, $rowData->student_info->student_id);
                $sheet->setCellValue('C' . $row, $rowData->student_info->name);
                $sheet->setCellValue('D' . $row, $rowData->student_info->gender == 0 ? "Nam" : "Nữ");
                $sheet->setCellValue('E' . $row, $rowData->value);
                $sheet->setCellValue('F' . $row, $rowData->date);
                $row++;
            }

            // Tạo một tên tập tin duy nhất cho file Excel
            $filename = 'scores_' . date('YmdHis') . '.xlsx';

            // Đường dẫn để lưu trữ file Excel trên server
            $filepath = 'uploads/' . $filename;

            // Tạo một đối tượng Writer để ghi file Excel
            $writer = new Xlsx($spreadsheet);

            // Ghi file Excel vào đường dẫn đã chỉ định
            $writer->save($filepath);

            // Chuyển hướng người dùng để tải xuống file Excel
            redirect($filepath);
            exit;
        } else {
            echo json_encode(['error' => 'subject_id ID is not provided']);
        }
    }
}
