<?php 
require_once("../perfilDAO.php");
require_once("../getID.php");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Credentials: true");

$data = json_decode(file_get_contents("php://input"), true);
$text = $data['text'];
$author = $data['author'];
$email = $data['email'];

if(empty($text)){
    echo json_encode(array('error' => 'Por favor envie um texto válido'));
    exit();
} else{
    $getID = new getID();
    $id = $getID->fetchUserByEmail([$email]);
    $id = $id['id'];
    $perfilDAO = new perfilDAO();
    $perfilDAO->updateTextandAuthor($text, $author, $id);
    echo json_encode(array('success' => 'Texto alterado com sucesso!'));
    exit();
}

?>