<?php

	// example use from browser
	// http://localhost/companydirectory/libs/php/getAll.php

	// remove next two lines for production

	ini_set('display_errors', 'On');
	error_reporting(E_ALL);

	$executionStartTime = microtime(true);

	include("config.php");

	header('Content-Type: application/json; charset=UTF-8');

	$conn = new mysqli($cd_host, $cd_user, $cd_password, $cd_dbname, $cd_port, $cd_socket);

	if (mysqli_connect_errno()) {

		$output['status']['code'] = "300";
		$output['status']['name'] = "failure";
		$output['status']['description'] = "database unavailable";
		$output['status']['returnedIn'] = (microtime(true) - $executionStartTime) / 1000 . " ms";
		$output['data'] = [];

		mysqli_close($conn);

		echo json_encode($output);

		exit;

	}

	if ($_REQUEST['filterBy'] == "department") {
	  $query = 'SELECT p.id, p.lastName, p.firstName, p.jobTitle, p.email, p.jobTier, p.currentLocationId, d.name as department, d.id as departmentID, l.name as location, l.id as locationID, p.currentLocationId, p.status, s.name FROM personnel p LEFT JOIN department d ON (d.id = p.departmentID) LEFT JOIN location l ON (l.id = p.currentLocationId) LEFT JOIN status s ON (s.id = p.status) WHERE departmentID = "' . $_REQUEST['department'] . '" ORDER BY p.lastName, p.firstName, d.name, l.name';
	} elseif ($_REQUEST['filterBy'] == "location") {
		$query = 'SELECT p.id, p.lastName, p.firstName, p.jobTitle, p.email, p.jobTier, p.currentLocationId, d.name as department, d.id as departmentID, l.name as location, l.id as locationID, p.currentLocationId, p.status, s.name FROM personnel p LEFT JOIN department d ON (d.id = p.departmentID) LEFT JOIN location l ON (l.id = p.currentLocationId) LEFT JOIN status s ON (s.id = p.status) WHERE locationID = "' . $_REQUEST['location'] . '" ORDER BY p.lastName, p.firstName, d.name, l.name';
	} else {
		$query = 'SELECT p.id, p.lastName, p.firstName, p.jobTitle, p.email, p.jobTier, p.currentLocationId, d.name as department, d.id as departmentID, l.name as location, l.id as locationID, p.currentLocationId, p.status, s.name FROM personnel p LEFT JOIN department d ON (d.id = p.departmentID) LEFT JOIN location l ON (l.id = p.currentLocationId) LEFT JOIN status s ON (s.id = p.status) ORDER BY p.lastName, p.firstName, d.name, l.name';
	}




	$result = $conn->query($query);

	if (!$result) {

		$output['status']['code'] = "400";
		$output['status']['name'] = "executed";
		$output['status']['description'] = "query failed";
		$output['data'] = [];

		mysqli_close($conn);

		echo json_encode($output);

		exit;

	}

   	$data = [];

	while ($row = mysqli_fetch_assoc($result)) {

		array_push($data, $row);

	}

	$output['status']['code'] = "200";
	$output['status']['name'] = "ok";
	$output['status']['description'] = "success";
	$output['status']['returnedIn'] = (microtime(true) - $executionStartTime) / 1000 . " ms";
	$output['data'] = $data;

	mysqli_close($conn);

	echo json_encode($output);

?>
