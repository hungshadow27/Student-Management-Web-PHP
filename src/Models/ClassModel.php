<?php
require_once "./src/Models/DepartmentModel.php";

class ClassModel
{
    use Database;
    public function getAllClasses()
    {
        $classes = $this->table("class")->get();
        $departmentModel = new DepartmentModel();
        foreach ($classes as $class) {
            $class->department_info =  $departmentModel->getDepartmentById($class->department_id);
        }

        return $classes;
    }
    public function getClassById($id)
    {
        $class = $this->table("class")
            ->getOne('class_id', $id);
        $departmentModel = new DepartmentModel();
        $class->department_info =  $departmentModel->getDepartmentById($class->department_id);
        return $class;
    }
    public function updateClassById($class_id, $name, $department_id)
    {
        $rs = $this->table("class")
            ->update('class_id', $class_id, [
                'name' => $name,
                'department_id' => $department_id
            ]);
        return $rs;
    }
    public function deleteClassById($class_id)
    {
        $rs = $this->table("class")
            ->deleteOne('class_id', $class_id);
        return $rs;
    }
    public function addClass($class_id, $name, $department_id)
    {
        $rs = $this->table("class")
            ->insert([
                'class_id' => $class_id,
                'name' => $name,
                'department_id' => $department_id
            ]);
        return $rs;
    }
}
