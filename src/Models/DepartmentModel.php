<?php
class DepartmentModel
{
    use Database;
    public function getAllDepartments()
    {
        $rs = $this->table("department")
            ->get();
        return $rs;
    }
    public function getDepartmentById($department_id)
    {
        $rs = $this->table("department")
            ->getOne('department_id', $department_id);
        return $rs;
    }
    public function updateDepartmentById($department_id, $name)
    {
        $rs = $this->table("department")
            ->update('department_id', $department_id, [
                'name' => $name,
            ]);
        return $rs;
    }
    public function deleteDepartmentById($department_id)
    {
        $rs = $this->table("department")
            ->deleteOne('department_id', $department_id);
        return $rs;
    }
    public function addDepartment($department_id, $name)
    {
        $rs = $this->table("department")
            ->insert([
                'department_id' => $department_id,
                'name' => $name,
            ]);
        return $rs;
    }
}
