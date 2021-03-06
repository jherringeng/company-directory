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

	$id = $_REQUEST['id']; $departmentName = $_REQUEST['departmentName']; $locationID = $_REQUEST['locationID'];

	// Gets current location of department for condition
	$query = "SELECT locationID FROM department WHERE id='$id'";

	$result = $conn->query($query);

	$list = mysqli_fetch_array($result);

	$currentLocation = $list[0];

	$query = "UPDATE department SET name='$departmentName', locationID='$locationID' WHERE id='$id'";

	$conn->query($query);

	$query = "UPDATE personnel SET currentLocationId = '$locationID' WHERE departmentID='$id' AND currentLocationId = '$currentLocation'";

	$conn->query($query);

	$query = "SELECT d.name, d.id, d.locationID, l.name as locationName FROM department d LEFT JOIN location l ON (l.id = d.locationId) WHERE d.id = '$id'";

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
