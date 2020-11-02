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

	$query = 'SELECT p.id, p.lastName, p.firstName, p.jobTitle, p.email, p.jobTier, d.name as department, d.id as departmentID, l.name as location, l.id as locationID FROM personnel p LEFT JOIN department d ON (d.id = p.departmentID) LEFT JOIN location l ON (l.id = d.locationID) ORDER BY p.lastName, p.firstName, d.name, l.name';

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

	$output['data']['employees'] = $data;

	// Get location table data
	$query = 'SELECT * FROM location ORDER BY name';
	$query = 'SELECT location.id, location.name, location.address, location.postcode, location.manager, personnel.firstName as managerFirstName, personnel.lastName as managerLastName FROM location LEFT JOIN personnel ON location.manager=personnel.id ORDER BY location.name';
	// $query = 'SELECT p.id, p.lastName, p.firstName, p.jobTitle, p.email, d.name as department, d.id as departmentID, l.name as location, l.id as locationID FROM personnel p LEFT JOIN department d ON (d.id = p.departmentID) LEFT JOIN location l ON (l.id = d.locationID) ORDER BY p.lastName, p.firstName, d.name, l.name';

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

	$output['data']['locations'] = $data;

	// Get location table data
	$query = 'SELECT department.id, department.name, department.departmentManager, department.locationID, personnel.firstName as managerFirstName, personnel.lastName as managerLastName, location.name as location FROM department LEFT JOIN personnel ON department.departmentManager=personnel.id LEFT JOIN location ON department.locationID=location.id ORDER BY name';
	// $query = 'SELECT location.id, location.name, location.address, location.postcode, location.manager, personnel.firstName, personnel.lastName FROM location LEFT JOIN personnel ON location.manager=personnel.id ORDER BY location.name';


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

	$output['data']['departments'] = $data;

	$output['status']['code'] = "200";
	$output['status']['name'] = "ok";
	$output['status']['description'] = "success";
	$output['status']['returnedIn'] = (microtime(true) - $executionStartTime) / 1000 . " ms";


	mysqli_close($conn);

	echo json_encode($output);

?>
