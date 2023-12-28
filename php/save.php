<?php
	header('Access-Control-Allow-Origin: *');
	header('Content-Type: application/json');
    $total = $_GET['cards'] ?? '';
    $id = $_GET['id'] ?? '';
    $pos_x = $_GET['pos_x'] ?? '';
    $pos_y = $_GET['pos_y'] ?? '';
    $height = $_GET['height'] ?? '';
    $width = $_GET['width'] ?? '';
    $text = $_GET['text'] ?? '';
    $zindex = $_GET['zindex'] ?? '';
    $fridge_name = $_GET['fridge_name'] ?? '';
    $conn = mysqli_connect("mysql.ct8.pl","m38060_mysql","zaq1@WSX","m38060_db");
    
    $updateTotal = "UPDATE fridges SET total_cards = $total WHERE name = '$fridge_name'";
    $conn->query($updateTotal);

    $query = "SELECT id FROM cards WHERE id_in_fridge = '$id'";

    $result = $conn->query($query);
    
    if ($result->num_rows > 0) {
        $updateQuery = "UPDATE cards SET pos_x = '$pos_x', pos_y = '$pos_y', height = '$height', width = '$width', text = '$text', zindex = '$zindex', fridge_name = '$fridge_name' WHERE id_in_fridge = '$id'";
        $conn->query($updateQuery);
    } else {
        $insertQuery = "INSERT INTO cards (pos_x, pos_y, height, width, text, zindex, fridge_name, id_in_fridge) VALUES ('$pos_x', '$pos_y', '$height', '$width', '$text', '$zindex', '$fridge_name', '$id')";
        $conn->query($insertQuery);
    }
    
    $conn->close();
    echo json_encode($id)
    ?>