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
        $sql = "UPDATE user_info set text = ?, author = ? where usuario_id = ?";
        $this->execDML($sql, $text, $author, $id);
    }
    public function updateImg_link($img_link, $id){
        $sql = "UPDATE user_info set img_link = ? where usuario_id = ?";
        $this->execDML($sql, $img_link, $id);
    }
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