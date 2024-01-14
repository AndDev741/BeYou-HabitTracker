<?php 
require_once("basicDAO.php");

class getID extends BasicDAO{

    public function fetchUserByEmail($email){
        $sql = "SELECT id from users WHERE email = ?";
        $pdo = $this->getConnection();
        try {
            $stmt = $pdo->prepare($sql);
            $stmt->execute($email);
            return $stmt->fetch(PDO::FETCH_ASSOC);
        } finally {
            $pdo = null;
        }
    }
}

?>