<?php

include "connection.php";
echo "hi";
$id = $_REQUEST["id"];

echo $id;

if($id != null){
  
  $query = $connection->prepare("DELETE FROM transactions WHERE id = ?");
  $query->bind_param("i", $id);

  
  $query->execute();

  echo json_encode(["message" => "transaction deleted"]);
}
else{
  echo json_encode([
    "message" => "error"
  ]); ;
}
