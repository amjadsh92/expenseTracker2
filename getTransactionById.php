<?php

include "connection.php";

$id = $_POST["id"] ?? null;

if($id != null){
  $query = $connection->prepare("SELECT * FROM transactions WHERE id = $id");

  $query->execute();

  $result = $query->get_result();

  if($result->num_rows > 0) {
    $transaction = $result->fetch_assoc();
    
    echo json_encode($transaction);
  } else {
    echo json_encode([
      "message" => "Not Found"
    ]);
  }
}