<?php
require_once "./src/Models/ClassModel.php";
class StudentModel
{
    use Database;
    public function getAllStudents()
    {
        $students = $this->table("student")->get();
        $classModel = new ClassModel();
        foreach ($students as $student) {
            $student->class_info =  $classModel->getClassById($student->class_id);
        }

        return $students;
    }
    public function getStudentById($id)
    {
        $student = $this->table("student")
            ->getOne('student_id', $id);
        $classModel = new ClassModel();
        $student->class_info =  $classModel->getClassById($student->class_id);
        return $student;
    }
    public function updateStudentById($id, $name, $date, $gender, $address, $class_id)
    {
        $rs = $this->table("student")
            ->update('student_id', $id, [
                'name' => $name,
                'date_of_birth' => $date,
                'gender' => $gender,
                'address' => $address,
                'class_id' => $class_id
            ]);
        return $rs;
    }
    public function deleteStudentById($id)
    {
        $rs = $this->table("student")
            ->deleteOne('student_id', $id);
        return $rs;
    }
    public function addStudent($id, $name, $date, $gender, $address, $class_id)
    {
        $rs = $this->table("student")
            ->insert([
                'student_id' => $id,
                'name' => $name,
                'date_of_birth' => $date,
                'gender' => $gender,
                'address' => $address,
                'class_id' => $class_id
            ]);
        return $rs;
    }
}
