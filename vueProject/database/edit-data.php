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
    $nom = isset($_POST["nom"]) ? $_POST["nom"] : null;
    $nbH = isset($_POST["nbH"]) ? $_POST["nbH"] : null;
    $tauxH = isset($_POST["tauxH"]) ? $_POST["tauxH"] : null;

    $connexion->update($numEns, $nom, $nbH, $tauxH);

?>