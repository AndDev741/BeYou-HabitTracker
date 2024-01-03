<?php 
require('userDAO.php');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Credentials: true");

$data = json_decode(file_get_contents("php://input"), true);
$email = $data['email'];
$pass = $data['password'];
$error = '';

if(empty($data['email']) || empty($data['password'])){
    $error = "Por favor preencha todos os campos";
    echo json_encode(array('error' => $error));
    exit();
}
if(!filter_var($email, FILTER_VALIDATE_EMAIL)){
    $error = "Insira um email válido";
    echo json_encode(array("error" => $error));
    exit();
} 
if (strlen($email) > 255 || strlen($pass) > 255) {
    $error = "Os campos não podem exceder 255 caracteres.";
    echo json_encode(array('error' => $error));
    exit();
}
else {
    $userDAO = new userDao();
    $emailFetch = $userDAO->fetchUserByEmail([$email]);
    if(empty($emailFetch)){
        echo json_encode(array('error' => 'Email ou senha incorretos!'));
        exit();
    }
    if($emailFetch['email'] === $email && $emailFetch['password'] === $pass){
        echo json_encode(array('sucess' => 'Login efetuado com sucesso!'));
        exit();
    }
}
?>