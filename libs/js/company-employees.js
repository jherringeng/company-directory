import {getAllDepartments, getAllLocations} from './ajax-calls.js';

var employees, departments, locations;

// Callback functions to set global variables - passed to ajax-calls
function setDepartments(departmentsInput) {
  departments = departmentsInput;
  console.log(departments);
}

function setLocations(locationsInput) {
  locations = locationsInput;
  console.log(locations);
}

// Get information from database once loaded
$( document ).ready(function() {

  getAllEmployees(displayAllEmployees);

  getAllDepartments(setDepartments);

  getAllLocations(setLocations);

});


function getAllEmployees(callback) {
  $.ajax({
    url: "libs/php/getAll.php",
    type: 'POST',
    dataType: 'json',
    data: {

    },
    success: function(result) {

      if (result.status.name == "ok") {

        employees = result['data'];
        callback(employees);

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

    $("#company-employees").append('<div id="employee' + employee['id'] + '" class ="employee" data-id="' + employee['id'] + '">'); // onclick="getEmployee(' + employee['id'] + ')"
    $("#employee" + employee['id']).append('<div class="employeeName employee-info"><b>' + employee['firstName'] + ' ' + employee['lastName'] + '</b></div>');
    $("#employee" + employee['id']).append('<div class="employeeTitle employee-info">' + employee['jobTitle'] + '</div>');
    $("#employee" + employee['id']).append('<div class="employeeEmail employee-info">' + employee['email'] + '</div>');
    $("#employee" + employee['id']).append('<div class="employeeDepartment employee-info">' + employee['department'] + '</div>');
    $("#employee" + employee['id']).append('<div class="employeeLocation employee-info">' + employee['location'] + '</div>');

  })
}

// Event listener for employee class - gets employee from database
$(document).on('click', '.employee', function () {
  getEmployee($(this).data("id"));
});

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
        var employee = result['data'][0];
        displayEmployeeInfoModal(employee);

      }

    },
    error: function(jqXHR, textStatus, errorThrown) {
      console.log("Request failed");
    }
  });

}

function displayEmployeeInfoModal(employee) {

    $("#employeeModalLabel").html('Employee Information');
    $("#employeeModalBody").html("");
    $("#employeeModalBody").append('<table id="employeeTable" class="table">');
    $("#employeeTable").append('<tr><td>First Name</td><td>' + employee['firstName'] + '</td></tr>');
    $("#employeeTable").append('<tr><td>Last Name</td><td>' + employee['lastName'] + '</td></tr>');
    $("#employeeTable").append('<tr><td>Job Title</td><td>' + employee['jobTitle'] + '</td></tr>');
    $("#employeeTable").append('<tr><td>Email</td><td>' + employee['email'] + '</td></tr>');
    $("#employeeTable").append('<tr><td>Department</td><td>' + employee['department'] + '</td></tr>');
    $("#employeeTable").append('<tr><td>Location</td><td>' + employee['location'] + '</td></tr>');

    // Add buttons to modal footer
    $('.modal-footer').html("");
    $('.modal-footer').append('<button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>')
    $('.modal-footer').append('<button type="button" class="btn btn-primary" id="employeeUpdateButton" data-id="' + employee['id'] + '">Update</button>')

    $('#employeeModal').modal('show');

}

// Event listener for employee class - gets employee from database
$(document).on('click', '#employeeUpdateButton', function () {
  updateEmployee($(this).data("id"));
});

function updateEmployee(employeeId) {

  console.log("Update employee")

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
          departments.forEach(function(department) {
            $("#department").append('<option value="' + department['id'] + '">' + department['name'] + '</option>');
          });
          $("#department").val(employee['departmentID']).change();
          $("#employeeTable").append('<tr><td><label for="location">Location</td><td><select id="location" name="location" value="' + employee['locationID'] + '"></td></tr>');
          locations.forEach(function(location) {
            $("#location").append('<option value="' + location['id']  + '">' + location['name'] + '</option>');
          });
          $("#location").val(employee['locationID']).change();

          // Add buttons to modal footer
          $('.modal-footer').html("");
          $('.modal-footer').append('<button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>')
          $('.modal-footer').append('<button type="button" class="btn btn-primary" id="employeeSaveUpdateButton" data-id="' + employee['id'] + '">Save Changes</button>')

          $('#employeeModal').modal('show');

        });
      }
    },
    error: function(jqXHR, textStatus, errorThrown) {
      console.log("Request failed");
    }
  });

}

// Event listener for employee class - gets employee from database
$(document).on('click', '#employeeSaveUpdateButton', function () {
  employeeSaveUpdate($(this).data("id"));
});

function employeeSaveUpdate(employeeId) {
  console.log("Saving update to employee")

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
        displayEmployeeInfoModal(employee);

        $('#employee' + employee['id'] + ' .employeeName').html('<b>' + employee['firstName'] + ' ' + employee['lastName'] + '</b>')
        $('#employee' + employee['id'] + ' .employeeTitle').html(employee['jobTitle']);
        $('#employee' + employee['id'] + ' .employeeEmail').html(employee['email']);
        $('#employee' + employee['id'] + ' .employeeDepartment').html(employee['department']);
        $('#employee' + employee['id'] + ' .employeeLocation').html(employee['location']);

        getAllEmployees(displayAllEmployees);

      }

    },
    error: function(jqXHR, textStatus, errorThrown) {
      console.log("Request failed");
    }
  });
}

// Event listener for employee class - gets employee from database
$(document).on('click', '#newEmployee', function () {
  openNewEmployeeModal();
});

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

  // Add buttons to modal footer
  $('.modal-footer').html("");
  $('.modal-footer').append('<button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>')
  $('.modal-footer').append('<button type="button" class="btn btn-primary" id="employeeSaveNewButton" data-id="">Save employee</button>')

  $('#employeeModal').modal('show');

}

// Event listener for employee class - gets employee from database
$(document).on('click', '#employeeSaveNewButton', function () {
  saveNewEmployee($(this).data("id"));
});

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
        var employee = result['data'][0];
        displayEmployeeInfoModal(employee);

        getAllEmployees(displayAllEmployees);

      }

    },
    error: function(jqXHR, textStatus, errorThrown) {
      console.log("Request failed");
    }
  });
}
