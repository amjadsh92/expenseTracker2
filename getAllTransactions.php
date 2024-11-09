<?php

include "connection.php";



  $query = $connection->prepare("SELECT * FROM transactions");

  $query->execute();

  $result = $query->get_result();

  
if ($result->num_rows > 0){
  $transactions = [];

  while($resultObject = $result->fetch_assoc()){
    $transactions[] = $resultObject;
  }
    
    echo json_encode($transactions);
  } else {
    echo json_encode([
      "message" => "Not Found"
    ]);
  }
