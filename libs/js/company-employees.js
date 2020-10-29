import { getAllDepartments, getAllLocations, getEmployee, updateEmployee} from './ajax-calls.js';
import { displayEmployeeInfoModal } from './display-functions.js';

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

// getAllEmployees - gets all employees with details
// Uses callback displayAllEmployees to display on screen
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

    $("#company-employees").append('<div id="employee' + employee['id'] + '" class ="employee border border-primary" data-id="' + employee['id'] + '">'); // onclick="getEmployee(' + employee['id'] + ')"
    $("#employee" + employee['id']).append('<div class="employeeName employee-info"><b>' + employee['firstName'] + ' ' + employee['lastName'] + '</b></div>');
    $("#employee" + employee['id']).append('<div class="employeeTitle employee-info">' + employee['jobTitle'] + '</div>');
    $("#employee" + employee['id']).append('<div class="employeeEmail employee-info">' + employee['email'] + '</div>');
    $("#employee" + employee['id']).append('<div class="employeeDepartment employee-info">' + employee['department'] + '</div>');
    $("#employee" + employee['id']).append('<div class="employeeLocation employee-info">' + employee['location'] + '</div>');

  })
}

// Event listener for displaying and updating employees
$(document).on('click', '.employee', function () {
  getEmployee($(this).data("id"), displayEmployeeInfoModal);
});

$(document).on('click', '#employeeUpdateButton', function () {
  updateEmployee($(this).data("id"), departments, locations);
});

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
  $("#informationModalLabel").html('Employee Information');
  $("#informationModalBody").html("");
  $("#informationModalBody").append('<table id="employeeTable" class="table">');

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

  $('#informationModal').modal('show');

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

// Event listener for employee class - gets employee from database
$(document).on('click', '#showEmployeeFilterButton', function () {
  employeeFilterModal();
});

function employeeFilterModal() {
  $("#informationModalLabel").html('Employee Filter');
  $("#informationModalBody").html("");
  $("#informationModalBody").append('<table id="employeeTable" class="table">');

  // $("#employeeTable").append('<tr><td><label for="fname">First name</label></td><td><input type="text" id="fname" name="fname" value=""></td></tr>');
  // $("#employeeTable").append('<tr><td><label for="lname">Last Name</td><td><input type="text" id="lname" name="lname" value=""></td></tr>');
  // $("#employeeTable").append('<tr><td><label for="title">Job Title</td><td><input type="text" id="title" name="title" value=""></td></tr>');
  // $("#employeeTable").append('<tr><td><label for="email">Email</td><td><input type="email" id="email" name="email" value=""></td></tr>');

  $("#employeeTable").append('<tr><td><label for="filterBy">Filter by:</td><td><select id="filterBy" name="filterBy" value=""></td></tr>');
    $("#filterBy").append('<option value="noFilter">No filter</option>');
    $("#filterBy").append('<option value="department">Department</option>');
    $("#filterBy").append('<option value="location">Location</option>');

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
  $('.modal-footer').append('<button type="button" class="btn btn-primary" id="employeeFilterButton" data-id="">Filter employees</button>')

  $('#informationModal').modal('show');
}

// Event listener for employee class - gets employee from database
$(document).on('click', '#employeeFilterButton', function () {
  getFilteredEmployees(displayAllEmployees);
});

function getFilteredEmployees(callback) {
  console.log("filtering employees")
  $.ajax({
    url: "libs/php/getFilteredEmployees.php",
    type: 'POST',
    dataType: 'json',
    data: {
      filterBy: $('#filterBy').val(),
      department: $('#department').val(),
      location: $('#location').val(),
    },
    success: function(result) {

      if (result.status.name == "ok") {

        console.log("Success!")
        employees = result['data'];
        callback(employees);

      }

    },
    error: function(jqXHR, textStatus, errorThrown) {
      console.log("Request failed");
    }
  });
}
