<?php
	header('Access-Control-Allow-Origin: *');
	header('Content-Type: application/json');
    $conn = mysqli_connect("mysql.ct8.pl","m38060_mysql","zaq1@WSX","m38060_db");
    // if($conn)
    //     echo"SUCCESS";
	// else
	// 	echo"Zle";

	$name = $_GET['name'];

	checkFridge($conn, $name);
	function checkFridge($conn, $name) {
		$query = "SELECT COUNT(*) FROM fridges WHERE name = ?";
		$stmt = mysqli_prepare($conn, $query);
		if (!$stmt) {
			die("Prepare failed: " . mysqli_error($conn));
		}
		mysqli_stmt_bind_param($stmt, "s", $name);
		mysqli_stmt_execute($stmt);
		$result = mysqli_stmt_get_result($stmt);
		$row = mysqli_fetch_array($result);
		$count = $row[0];
	
		if ($count <= 0) {
			createNewFridge($conn, $name);
		} else {
			// echo "jest";
			loadCards($conn, $name);
		}
		// echo "SUCCESS";
	}
	

	function createNewFridge($conn, $name) {
		$query = "INSERT INTO `fridges`(`name`) VALUES (?)";
		$stmt = mysqli_prepare($conn, $query);
		mysqli_stmt_bind_param($stmt, "s", $name);
		mysqli_stmt_execute($stmt);
		echo json_encode("");

	}

	function loadCards($conn, $name){
		$query = "SELECT * FROM cards WHERE fridge_name = ?";
		$stmt = mysqli_prepare($conn, $query);
		if (!$stmt) {
			die("Prepare failed for cards query: " . mysqli_error($conn));
		}
		mysqli_stmt_bind_param($stmt, "s", $name);
		mysqli_stmt_execute($stmt);
		$result = mysqli_stmt_get_result($stmt);
		$rows = [];
		while ($row = mysqli_fetch_array($result)) {
			$rows[] = $row;
		}
	
		$queryCount = "SELECT total_cards FROM fridges WHERE name = ?";
		$stmtCount = mysqli_prepare($conn, $queryCount);
		if (!$stmtCount) {
			die("Prepare failed for count_cards query: " . mysqli_error($conn));
		}
		mysqli_stmt_bind_param($stmtCount, "s", $name);
		mysqli_stmt_execute($stmtCount);
		$resultCount = mysqli_stmt_get_result($stmtCount);
		$countData = mysqli_fetch_assoc($resultCount);
	
		echo json_encode(["cards" => $rows, "totalCards" => $countData['total_cards']]);
	}
	
		
	
?>