<?php
require_once("configDB.php");

class BasicDAO{
    protected function getConnection(){
        global $dsn, $user, $pass;
        $pdo = new PDO($dsn, $user, $pass, [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]);
        return $pdo;
    }
    protected function execDML($sql, ...$params){
        $pdo = $this->getConnection();
        try{
            $stmt = $pdo->prepare($sql);
            $stmt->execute($params);
        }finally {
            $pdo = null;
        }
    }
}



?>