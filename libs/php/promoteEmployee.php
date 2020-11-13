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

	$id = $_REQUEST['id']; $promoteTo = $_REQUEST['promoteTo']; $department = $_REQUEST['department']; $location = $_REQUEST['location']; $departmentName = $_REQUEST['departmentName']; $locationName = $_REQUEST['locationName'];

	$query;	$jobTitle; $jobTier;

	if ($promoteTo == "depManager") {
		$jobTitle = "Head of $departmentName";
		$jobTier = 3;
		$query = "UPDATE department SET departmentManager='$id' WHERE id='$department'";
	} else {
		$jobTitle = "Head of $locationName Branch";
		$jobTier = 2;
		$department = 13;
		$query = "UPDATE location SET manager='$id' WHERE id='$location'";
	}
	$conn->query($query);

	$query = "UPDATE personnel SET jobTitle='$jobTitle', departmentID='$department', jobTier = '$jobTier' WHERE id='$id'";
	$conn->query($query);

	$query = 'SELECT p.id, p.lastName, p.firstName, p.jobTitle, p.email, p.jobTier, p.currentLocationId, p.status, d.name as department, d.id as departmentID, d.locationID as baseLocationId, l.name as location, l.id as locationID, b.name as baseLocationName, s.name as statusName FROM personnel p LEFT JOIN department d ON (d.id = p.departmentID) LEFT JOIN location l ON (l.id = p.currentLocationId) LEFT JOIN location b ON (b.id = d.locationID) LEFT JOIN status s ON (s.id = p.status) WHERE p.id = ' . $_REQUEST['id'] . ' ORDER BY p.lastName, p.firstName, d.name, l.name';

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
