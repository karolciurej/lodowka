<?php
	header('Access-Control-Allow-Origin: *');
	header('Content-Type: application/json');
    $id = $_GET['id'] ?? '';
    $conn = mysqli_connect("mysql.ct8.pl","m38060_mysql","zaq1@WSX","m38060_db");
    $query = "DELETE FROM `cards` WHERE id_in_fridge = '$id'";
    $conn->query($query);
    echo json_encode($id)
?>