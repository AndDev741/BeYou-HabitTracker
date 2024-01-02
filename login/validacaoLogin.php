<?php 
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
//Apenas para testes

// Receber os dados do corpo da solicitação
$json_data = file_get_contents('php://input');
// Verificar se algum campo específico está vazio
$data = json_decode($json_data, true);

if(empty($data['email']) || empty($data['password'])){
    $error = "Por favor preencha todos os campos";
    echo json_encode(array('error' => $error));
    exit();
}

$email = $data['email'];
$pass = $data['password'];
$error = '';

if($email === 'teste1@gmail.com' && $pass === 'teste123'){
    $sucess = "Usuário conectado com sucesso!";
    echo json_encode(array('sucess' => $sucess));
    exit();
}

?>