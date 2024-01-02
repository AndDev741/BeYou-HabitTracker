<?php
require_once("userDAO.php");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

$data = json_decode(file_get_contents("php://input"), true);
$name = $data['name'];
$email = $data['email']; 
$pass = $data['password'];
$error = '';
// Verificar se algum campo específico está vazio
if (empty($name) || empty($email) || empty($pass)) {
    $error = "Por favor, preencha todos os campos!";
    echo json_encode(array('error' => $error));
    exit();
}

function validacao() {
    global $name, $email, $pass, $error;
    $userDAO = new userDAO();
    $emailVerify = array($email);
    if($userDAO->isEmailAvailable($emailVerify) === false){
        $error = "Este email já esta em uso!";
        echo json_encode(array("error" => $error));
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
    if(strlen($name) > 255) {
        $error = "O campo nome não pode exceder 55 caracteres";
        echo json_encode(array("error" => $error));
        exit();
    } else {
        $userDAO->registerUser($name, $email, $pass);
        echo json_encode(array('success' => "Registrado com sucesso!"));
        exit();
    }
}
validacao(); 

?>
