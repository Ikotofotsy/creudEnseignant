<?php
    class Database
    {
        public $PDO;
    
        function __construct()
        {
            require 'db-config.php';
            
            try
            {
                $this->PDO = new PDO($DB_DSN, $DB_USER, $DB_PASSWORD);
                //echo 'Connexion établie !';
            }
            catch(PDOException $pe)
            {
                echo 'Erreur de connexion : '.$pe->getMessage();
            }
        }
    
        function connexionDB()
        {
            
        }

        function insert($nom,$nbH,$tauxH)
        {
            $sql = "INSERT INTO enseignant(nom,nbH,tauxH) VALUES ('$nom','$nbH','$tauxH')";
            $statement = $this->PDO->exec($sql);
        }
    
        function select()
        {
            $sql = "SELECT * FROM enseignant";
            $statement = $this->PDO->query($sql);
            return $statement->fetchAll(PDO::FETCH_ASSOC);
        }

        function delete($num)
        {
            $sql = "DELETE FROM enseignant WHERE numEns = '$num' ";
            $statement = $this->PDO->exec($sql);
        }

        function update($num,$nom,$nbH,$tauxH)
        {
            $sql = "UPDATE enseignant SET nom = '$nom', nbH = $nbH, tauxH = $tauxH WHERE numEns = '$num' ";
            $statement = $this->PDO->exec($sql);
        }

        function min()
        {
            $sql = "SELECT * FROM enseignant WHERE (nbH*tauxH) = (SELECT MIN(nbH*tauxH) FROM enseignant)";
            $statement = $this->PDO->query($sql);
            return $statement->fetchAll(PDO::FETCH_ASSOC);
        }

        function max()
        {
            $sql = "SELECT * FROM enseignant WHERE (nbH*tauxH) = (SELECT MAX(nbH*tauxH) FROM enseignant)";
            $statement = $this->PDO->query($sql);
            return $statement->fetchAll(PDO::FETCH_ASSOC);
        }

        function total()
        {
            $sql = "SELECT SUM(nbH*tauxH) as total FROM enseignant";
            $statement = $this->PDO->query($sql);
            return $statement->fetchAll(PDO::FETCH_ASSOC);
        }
    }
    
    
?>