<?php 
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Credentials: true");
require_once("habitsDAO.php");

$data = json_decode(file_get_contents("php://input"), true);
$habitID = $data['habitID'];
$error = '';
$sucess = '';

if(empty($habitID)){
    $error = "Ocorreu um erro, tente novamenmte";
    echo json_encode(array('error' => $error));
    exit();
}else{
    $newHabit = new habitsDAO();
    $registerHabit = $newHabit->deleteHabit($habitID);
    $sucess ="Hábito excluido com sucesso!";
    echo json_encode(array('success' => $sucess));
    exit();
}

?>
