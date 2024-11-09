<?php

include "connection.php";

$name = $_POST["description"] ?? null;



$amount = $_POST["amount"] ?? null;

$category = $_POST["type"] ?? null;

$date = $_POST["date"] ?? null;

if($name != null && $amount != null && $category != null && $date !=null){
  
  $query = $connection->prepare("INSERT INTO transactions (description, amount, type, date) VALUES (?, ?, ?, ?)");
  $query->bind_param("siss", $name, $amount, $category, $date);
  $query->execute();

  echo json_encode(["message" => "transaction added"]);
}
else{
  echo json_encode([
    "message" => "error"
  ]); ;
}

