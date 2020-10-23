import {getAllDepartments, getAllLocations} from './ajax-calls.js';

var employees, departments, locations;

$( document ).ready(function() {

  getAllEmployees();

  departments = getAllDepartments();

  locations = getAllLocations();
});

function getAllEmployees() {
  $.ajax({
    url: "libs/php/getAll.php",
    type: 'POST',
    dataType: 'json',
    data: {

    },
    success: function(result) {

      if (result.status.name == "ok") {

        console.log(result)
        employees = result['data'];
        displayAllEmployees(employees);

      }

    },
    error: function(jqXHR, textStatus, errorThrown) {
      console.log("Request failed");
    }
  });
}

function getEmployee(employeeId) {

  console.log("Getting employee")

  $.ajax({
    url: "libs/php/getEmployee.php",
    type: 'POST',
    dataType: 'json',
    data: {
      id: employeeId
    },
    success: function(result) {

      console.log(result)
      if (result.status.name == "ok") {

        console.log(result)
        displayEmployeeInfoModal(result);

      }

    },
    error: function(jqXHR, textStatus, errorThrown) {
      console.log("Request failed");
    }
  });

}

function displayAllEmployees(employees) {
  $("#company-employees").html("")
  $("#company-employees").append('<div id="employeesHeader" class ="employee">');
  $("#employeesHeader").append('<div class="employee-info"><b>Name</b></div>');
  $("#employeesHeader").append('<div class="employee-info"><b>Job Title</b></div>');
  $("#employeesHeader").append('<div class="employee-info"><b>Email Address</b></div>');
  $("#employeesHeader").append('<div class="employee-info"><b>Department</b></div>');
  $("#employeesHeader").append('<div class="employee-info"><b>Location</b></div>');


  employees.forEach(function(employee) {

    $("#company-employees").append('<div id="employee' + employee['id'] + '" class ="employee" onclick="getEmployee(' + employee['id'] + ')">');
    $("#employee" + employee['id']).append('<div class="employeeName employee-info"><b>' + employee['firstName'] + ' ' + employee['lastName'] + '</b></div>');
    $("#employee" + employee['id']).append('<div class="employeeTitle employee-info">' + employee['jobTitle'] + '</div>');
    $("#employee" + employee['id']).append('<div class="employeeEmail employee-info">' + employee['email'] + '</div>');
    $("#employee" + employee['id']).append('<div class="employeeDepartment employee-info">' + employee['department'] + '</div>');
    $("#employee" + employee['id']).append('<div class="employeeLocation employee-info">' + employee['location'] + '</div>');

  })
}

function updateEmployee(employeeId) {

  console.log("Getting employee")

  $.ajax({
    url: "libs/php/getEmployee.php",
    type: 'POST',
    dataType: 'json',
    data: {
      id: employeeId
    },
    success: function(result) {

      console.log(result)
      if (result.status.name == "ok") {

        console.log(result)
        result['data'].forEach(function(employee) {

      		$("#employeeModalLabel").html('Employee Information');
          $("#employeeModalBody").html("");
          $("#employeeModalBody").append('<table id="employeeTable" class="table">');

          $("#employeeTable").append('<tr><td><label for="fname">First name</label></td><td><input type="text" id="fname" name="fname" value="' + employee['firstName'] + '"></td></tr>');
          $("#employeeTable").append('<tr><td><label for="lname">Last Name</td><td><input type="text" id="lname" name="lname" value="' + employee['lastName'] + '"></td></tr>');
          $("#employeeTable").append('<tr><td><label for="title">Job Title</td><td><input type="text" id="title" name="title" value="' + employee['jobTitle'] + '"></td></tr>');
          $("#employeeTable").append('<tr><td><label for="email">Email</td><td><input type="email" id="email" name="email" value="' + employee['email'] + '"></td></tr>');
          $("#employeeTable").append('<tr><td><label for="department">Department</td><td><select id="department" name="department" value="' + employee['departmentID']  + '"></td></tr>');
          deptsAtLocation = [];
          departments.forEach(function(department) {
            $("#department").append('<option value="' + department['id'] + '">' + department['name'] + '</option>');
          });
          $("#department").val(employee['departmentID']).change();
          $("#employeeTable").append('<tr><td><label for="location">Location</td><td><select id="location" name="location" value="' + employee['locationID'] + '"></td></tr>');
          locations.forEach(function(location) {
            $("#location").append('<option value="' + location['id']  + '">' + location['name'] + '</option>');
          });
          $("#location").val(employee['locationID']).change();
          $('#employeeUpdateButton').attr('onclick', 'saveEmployeeUpdates(' + employee['id'] + ')');
          $('#employeeUpdateButton').html('Save Changes');

        })

      }

    },
    error: function(jqXHR, textStatus, errorThrown) {
      console.log("Request failed");
    }
  });

}

function saveEmployeeUpdates(employeeId) {
  console.log("Getting employee")

  $.ajax({
    url: "libs/php/updateEmployee.php",
    type: 'POST',
    dataType: 'json',
    data: {
      id: employeeId,
      lastName: $('#lname').val(),
      firstName: $('#fname').val(),
      jobTitle: $('#title').val(),
      email: $('#email').val(),
      department: $('#department').val(),
      location: $('#location').val()
    },
    success: function(result) {

      if (result.status.name == "ok") {

        console.log("Updated Employee")
        console.log();
        var employee = result['data'][0];
        displayEmployeeInfoModal(result);

        $('#employee' + employee['id'] + ' .employeeName').html('<b>' + employee['firstName'] + ' ' + employee['lastName'] + '</b>')
        $('#employee' + employee['id'] + ' .employeeTitle').html(employee['jobTitle']);
        $('#employee' + employee['id'] + ' .employeeEmail').html(employee['email']);
        $('#employee' + employee['id'] + ' .employeeDepartment').html(employee['department']);
        $('#employee' + employee['id'] + ' .employeeLocation').html(employee['location']);

        getAllEmployees();

      }

    },
    error: function(jqXHR, textStatus, errorThrown) {
      console.log("Request failed");
    }
  });
}

function openNewEmployeeModal() {
  $("#employeeModalLabel").html('Employee Information');
  $("#employeeModalBody").html("");
  $("#employeeModalBody").append('<table id="employeeTable" class="table">');

  $("#employeeTable").append('<tr><td><label for="fname">First name</label></td><td><input type="text" id="fname" name="fname" value=""></td></tr>');
  $("#employeeTable").append('<tr><td><label for="lname">Last Name</td><td><input type="text" id="lname" name="lname" value=""></td></tr>');
  $("#employeeTable").append('<tr><td><label for="title">Job Title</td><td><input type="text" id="title" name="title" value=""></td></tr>');
  $("#employeeTable").append('<tr><td><label for="email">Email</td><td><input type="email" id="email" name="email" value=""></td></tr>');
  $("#employeeTable").append('<tr><td><label for="department">Department</td><td><select id="department" name="department" value=""></td></tr>');
  departments.forEach(function(department) {
    $("#department").append('<option value="' + department['id'] + '">' + department['name'] + '</option>');
  });
  $("#employeeTable").append('<tr><td><label for="location">Location</td><td><select id="location" name="location" value=""></td></tr>');
  locations.forEach(function(location) {
    $("#location").append('<option value="' + location['id']  + '">' + location['name'] + '</option>');
  });
  $('#employeeUpdateButton').attr('onclick', 'saveNewEmployee()');
  $('#employeeUpdateButton').html('Save Employee');
  $('#employeeModal').modal('show');
}

function saveNewEmployee() {
  console.log("Saving employee")

  $.ajax({
    url: "libs/php/newEmployee.php",
    type: 'POST',
    dataType: 'json',
    data: {
      lastName: $('#lname').val(),
      firstName: $('#fname').val(),
      jobTitle: $('#title').val(),
      email: $('#email').val(),
      department: $('#department').val(),
      location: $('#location').val()
    },
    success: function(result) {

      if (result.status.name == "ok") {

        console.log("Saved Employee")
        console.log();
        var employee = result['data'][0];
        displayEmployeeInfoModal(result);

        getAllEmployees();

      }

    },
    error: function(jqXHR, textStatus, errorThrown) {
      console.log("Request failed");
    }
  });
}

function displayEmployeeInfoModal(result) {
  result['data'].forEach(function(employee) {

    $("#employeeModalLabel").html('Employee Information');
    $("#employeeModalBody").html("");
    $("#employeeModalBody").append('<table id="employeeTable" class="table">');
    $("#employeeTable").append('<tr><td>First Name</td><td>' + employee['firstName'] + '</td></tr>');
    $("#employeeTable").append('<tr><td>Last Name</td><td>' + employee['lastName'] + '</td></tr>');
    $("#employeeTable").append('<tr><td>Job Title</td><td>' + employee['jobTitle'] + '</td></tr>');
    $("#employeeTable").append('<tr><td>Email</td><td>' + employee['email'] + '</td></tr>');
    $("#employeeTable").append('<tr><td>Department</td><td>' + employee['department'] + '</td></tr>');
    $("#employeeTable").append('<tr><td>Location</td><td>' + employee['location'] + '</td></tr>');
    $('#employeeUpdateButton').attr('onclick', 'updateEmployee(' + employee['id'] + ')');
    $('#employeeUpdateButton').html('Update');
    $('#employeeModal').modal('show');

  })
}
