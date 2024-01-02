<?php 
require_once("basicDAO.php");

class userDAO extends BasicDAO{
    public function registerUser($nome, $email, $senha){
        $sql = "INSERT INTO users VALUES(default, ?, ?, ?)";
        $this->execDML($sql, $nome, $email, $senha);
    }
    public function fetchUserByEmail($email){
        $sql = "SELECT * from users WHERE email = ?";
        $pdo = $this->getConnection();
        try {
            $stmt = $pdo->prepare($sql);
            $stmt->execute($email);
            return $stmt->fetch(PDO::FETCH_ASSOC);
        } finally {
            $pdo = null;
        }
    }

    public function isEmailAvailable($email){
        $existingUser = $this->fetchUserByEmail($email);
        return empty($existingUser);
    }

}


?>