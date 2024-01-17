<?php 
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Credentials: true");
require_once("habitsDAO.php");

$data = json_decode(file_get_contents("php://input"), true);
$habitID = $data['habitID'];
$name = $data['name'];
$importance = $data['importance'];
$dificulty = $data['dificulty'];
$category = $data['category'];
$weekDays = $data['weekDays'];
$description = $data['description'];
$error = '';
$sucess = '';

if(empty($name) || empty($importance) || empty($dificulty) || empty($category)){
    $error = "Por favor preencha todos os campos";
    echo json_encode(array('error' => $error));
    exit();
}else if(empty($weekDays)){
    $error = "Por favor escolha pelo menos 1 dia da semana";
    echo json_encode(array('error' => $error));
    exit();
}else if(strlen($name) > 55){
    $error = "O nome do hábito tem que ser menor que 55 caracteres";
    echo json_encode(array('error' => $error));
    exit();
}else if(strlen($description) > 255){
    $error = "A descrição tem que ser menor que 255 caracteres";
    echo json_encode(array('error' => $error));
    exit();
}else{
    $newHabit = new habitsDAO();
    $registerHabit = $newHabit->updateHabit($name, $importance, $dificulty, $category, $weekDays, $description, $habitID);
    $sucess ="Editado com sucesso!";
    echo json_encode(array('success' => $sucess));
    exit();
}

?>
