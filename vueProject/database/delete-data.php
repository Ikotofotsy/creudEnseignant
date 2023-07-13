<?php

    require "database.php";

    $connexion =  new Database();

    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: *");
    header("Access-Control-Allow-Methods: *");
    header("content-type: application/json");
    header("Access-Control-Allow-Credetials:true");

    $input = file_get_contents('php://input');
    $_POST = json_decode($input, true);
    
    $numEns = isset($_POST["numEns"]) ? $_POST["numEns"] : null;

    $connexion->delete($numEns);

?>