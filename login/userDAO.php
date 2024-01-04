<?php 
require_once("basicDAO.php");

class userDAO extends BasicDAO{
    public function registerUser($name, $email, $pass){
        $sql = "INSERT INTO users VALUES(default, ?, ?, ?) RETURNING id";
        $this->execDML($sql, $name, $email, $pass);
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
    public function fetchUserByPassword($password){
        $sql = "SELECT email from users WHERE password = ?";
        $pdo = $this->getConnection();
        try{
            $stmt = $pdo->prepare($sql);
            $stmt->execute([$password]);
            return $stmt->fetch(PDO::FETCH_ASSOC);
        }finally{
            $pdo = null;
        }
    }

    public function isEmailAvailable($email){
        $existingUser = $this->fetchUserByEmail($email);
        return empty($existingUser);
    }

}
?>