<?php 
require_once("configDB.php");
require_once("basicDAO.php");
class habitsDAO extends BasicDAO{
    private $email;
    public function registerUser($user_id, $name, $importance, $dificulty, $category, $weekDays, $description){
        $sql = "INSERT INTO habits VALUES(default, ?, ?, ?, ?, ?, ?, ?)";
        $this->execDML($sql, $user_id, $name, $importance, $dificulty, $category, $weekDays, $description);
    }
}

?>