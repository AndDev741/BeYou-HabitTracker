<?php 
require_once("basicDAO.php");
require("getID.php");

class perfilDAO extends BasicDAO{
    private $email;
    public function getData($id){
        $sql = "SELECT * from user_info WHERE usuario_id = ?";
        $pdo = $this->getConnection();
        try{
            $stmt = $pdo->prepare($sql);
            $stmt->execute($id);
            return $stmt->fetch(PDO::FETCH_ASSOC);
        } finally {
            $pdo = null;
        }
    }

}

?>