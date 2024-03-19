<?php
require_once "./src/Models/DepartmentModel.php";

class SubjectModel
{
    use Database;
    public function getAllSubjects()
    {
        $subjects = $this->table("subject")->get();
        $departmentModel = new DepartmentModel();
        foreach ($subjects as $subject) {
            $subject->department_info =  $departmentModel->getDepartmentById($subject->department_id);
        }

        return $subjects;
    }
    public function getSubjectById($subject_id)
    {
        $subject = $this->table("subject")->getOne('subject_id', $subject_id);
        $departmentModel = new DepartmentModel();
        $subject->department_info =  $departmentModel->getDepartmentById($subject->department_id);
        return $subject;
    }
    public function updateSubjectById($subject_id, $name, $department_id)
    {
        $rs = $this->table("subject")
            ->update('subject_id', $subject_id, [
                'name' => $name,
                'department_id' => $department_id
            ]);
        return $rs;
    }
    public function deleteSubjectById($subject_id)
    {
        $rs = $this->table("subject")
            ->deleteOne('subject_id', $subject_id);
        return $rs;
    }
    public function addSubject($subject_id, $name, $department_id)
    {
        $rs = $this->table("subject")
            ->insert([
                'subject_id' => $subject_id,
                'name' => $name,
                'department_id' => $department_id
            ]);
        return $rs;
    }
}
