<?php 
require_once("basicDAO.php");

class testeDAO extends BasicDAO{
    public function email($email){
        $sql = "SELECT * from usuarios WHERE email = ?";
        $pdo = $this->getConnection();
        try {
            $stmt = $pdo->prepare($sql);
            $stmt->execute([$email]);
            return $stmt->fetch(PDO::FETCH_ASSOC);
        } finally {
            $pdo = null;
        }
    }

    public function isEmailAvailable($email){
        $existingUser = $this->email($email);
        return empty($existingUser);
    }
}

$test = new testeDAO();
$value = $test->isEmailAvailable("anddesenvolved@gmail.com");
echo $value;

?>