<?php
    require "database.php";

    $connexion =  new Database();

    header("Access-Control-Allow-Origin: *");
    header("content-type: application/json");
    header("Access-Control-Allow-Credetials:true");
    
    $data = $connexion->select();
    
    echo json_encode($data); 
?>