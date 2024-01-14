<?php 
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Credentials: true");
require_once("habitsDAO.php");
require_once("getID.php");

$data = json_decode(file_get_contents("php://input"), true);
$email = $data['email'];
$name = $data['name'];
$importance = $data['importance'];
$dificulty = $data['dificulty'];
$category = $data['category'];
$weekDays = $data['weekDays'];
$description = $data['description'];
$error = '';
$sucess = '';


if(empty($name) || empty($importance) || empty($dificulty) || empty($category) || empty($weekDays)){
    $error = "Por favor preencha todos os campos";
    echo json_encode(array('error' => $error));
    exit();
}else{
    $getID = new getID();
    $id = $getID->fetchUserByEmail([$email]);
    $id = $id['id'];
    $newHabit = new habitsDAO();
    $registerHabit = $newHabit->registerUser($id, $name, $importance, $dificulty, $category, $weekDays, $description);
    $sucess ="Cadastrado com sucesso!";
    echo json_encode(array('success' => $sucess));
    exit();
    
}


?>