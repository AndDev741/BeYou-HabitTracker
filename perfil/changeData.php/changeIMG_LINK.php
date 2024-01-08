<?php 
require_once("../perfilDAO.php");
require_once("../getID.php");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Credentials: true");

$data = json_decode(file_get_contents("php://input"), true);
$img_link = $data['img_link'];
$email = $data['email'];

if(empty($img_link)){
    echo json_encode(array('error' => 'Por favor envie um link válido'));
    exit();
} else{
    $getID = new getID();
    $id = $getID->fetchUserByEmail([$email]);
    $id = $id['id'];
    $perfilDAO = new perfilDAO();
    $perfilDAO->updateImg_link($img_link, $id);
    echo json_encode(array('success' => 'Imagem alterada com sucesso!'));
    exit();
}

?>