<?php
class UserModel
{
    use Database;

    public function getUserByUsername($username)
    {
        $rs = $this->table('user')
            ->getOne("username", "$username");
        if ($rs == null) {
            return null;
        }
        return $rs;
    }
}
