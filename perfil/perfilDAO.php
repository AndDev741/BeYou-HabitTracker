<?php 
require_once("configDB.php");
require("getID.php");
class perfilDAO extends BasicDAO{
    private $email;
    public function updateName($name, $id){
        $sql = "UPDATE users set name = ? where id = ?";
        $this->execDML($sql, $name, $id);
    }
    public function updateTextandAuthor($text, $author, $id){
        $sql = "UPDATE perfil_info set text = ?, author = ? where user_id = ?";
        $this->execDML($sql, $text, $author, $id);
    }
    public function updateImg_link($img_link, $id){
        $sql = "UPDATE perfil_info set img_link = ? where user_id = ?";
        $this->execDML($sql, $img_link, $id);
    }
    public function getData($id){
        $sql = "SELECT * from perfil_info WHERE user_id = ?";
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