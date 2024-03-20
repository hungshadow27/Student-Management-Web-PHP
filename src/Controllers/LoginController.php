<?php
require "./src/Models/UserModel.php";
class LoginController
{
    use Controller;
    public function __construct()
    {
        if (isset($_SESSION['USER'])) {
            redirect('home');
            exit;
        }
    }
    public function index($a = '', $b = '', $c = '')
    {
        $this->view('login.view');
    }
    public function signin()
    {
        $data[] = '';
        if ($_SERVER["REQUEST_METHOD"] == "POST") {
            $username = $_POST["username"];
            $password = $_POST["password"];

            $usermodel = new UserModel;
            $user = $usermodel->getUserByUsername($username);
            if ($user != null) {
                if ($user->username == $username && $user->password == $password) {
                    $_SESSION['USER'] = serialize($user);
                    redirect('home');
                    exit;
                }
            }
            $data['errors'] = "Thông tin tài khoản hoặc mật khẩu không chính xác!";
        }
        $this->view('login.view', $data);
    }
}
