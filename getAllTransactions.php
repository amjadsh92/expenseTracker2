<?php

include "connection.php";



  $query = $connection->prepare("SELECT * FROM transactions");

  $query->execute();

  $result = $query->get_result();

  

  $transactions = [];

  while($resultObject = $result->fetch_assoc()){
    $transactions[] = $resultObject;
  }
    
    echo json_encode($transactions);
   
    
  
