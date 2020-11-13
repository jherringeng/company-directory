import { getAllDepartments, getAllLocations, getEmployee, updateEmployee, promoteEmployeeModal, promoteEmployee } from './ajax-calls.js';
import { displayEmployeeInfoModal } from './display-functions.js';

var employees, departments, locations, statuses;
var departmentManager = {}, departmentManagerId = {}, locationManager = {};
var departmentLocation = {}, departmentLocationId = {};

// Get information from database once loaded
$( document ).ready(function() {

  getAllTablesForEmployees(displayEmployeePageData)

});

// getAllEmployees - gets all employees with details
// Uses callback displayAllEmployees to display on screen
function getAllTablesForEmployees(callback) {
  $.ajax({
    url: "libs/php/getAllTablesForEmployees.php",
    type: 'POST',
    dataType: 'json',
    data: {

    },
    success: function(result) {

      if (result.status.name == "ok") {

        var tableData = result['data'];
        console.log(tableData)
        callback(tableData);

      }

    },
    error: function(jqXHR, textStatus, errorThrown) {
      console.log("Request failed");
    }
  });
}

// Callback for getAllTablesForEmployees sets and displays locations, departments and employees
function displayEmployeePageData(tablesInput) {
  // Set global variables

  departments = tablesInput['departments'];
  departments.forEach(function(department) {

    departmentLocation[department['id']] = department['location'];
    departmentLocationId[department['id']] = department['locationID'];

    if (department['managerFirstName'] == null || department['managerLastName'] == null) {
      departmentManager[department['id']] = "No manager";
      departmentManagerId[department['id']] = null;
    } else {
      departmentManager[department['id']] = department['managerFirstName'] + ' ' + department['managerLastName'];
      departmentManagerId[department['id']] = department['departmentManager'];
    }
  });
  console.log(departments)
  locations = tablesInput['locations'];
  locations.forEach(function(location) {
    if (location['managerFirstName'] == null || location['managerLastName'] == null) {
      locationManager[location['id']] = "No manager";
    } else {
      locationManager[location['id']] = location['managerFirstName'] + ' ' + location['managerLastName'];
    }
  });
  console.log(locations)

  statuses = tablesInput['status']

  employees = tablesInput['employees'];
  displayAllEmployees(employees)

}

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
        console.log(employees)
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
  $("#employeesHeader").append('<div class="employee-info"><b>Manager</b></div>');
  $("#employeesHeader").append('<div class="employee-info"><b>Department</b></div>');
  $("#employeesHeader").append('<div class="employee-info"><b>Location</b></div>');


  employees.forEach(function(employee) {

    $("#company-employees").append('<div id="employee' + employee['id'] + '" class ="employee border border-primary" data-id="' + employee['id'] + '">'); // onclick="getEmployee(' + employee['id'] + ')"
    $("#employee" + employee['id']).append('<div class="employeeName employee-info"><b>' + employee['firstName'] + ' ' + employee['lastName'] + '</b></div>');
    $("#employee" + employee['id']).append('<div class="employeeTitle employee-info">' + employee['jobTitle'] + '</div>');
    var managerName;
    if (employee['jobTier'] == 3) {
      managerName = departmentManager[employee['departmentID']];
    } else if (employee['jobTier'] == 1) {
      managerName = "N/A";
    }
    else {
      managerName = locationManager[employee['locationID']];
    }
    $("#employee" + employee['id']).append('<div class="employeeManager employee-info">' + departmentManager[employee['departmentID']] + '</div>');
    $("#employee" + employee['id']).append('<div class="employeeDepartment employee-info">' + employee['department'] + '</div>');
    $("#employee" + employee['id']).append('<div class="employeeLocation employee-info">' + employee['location'] + '</div>');

    if(employee['status'] != 1) {
      $("#employee" + employee['id']).addClass( "absent-employee" );
    }

  })

  $('.container').css('height', 'auto');
}

// Event listeners for displaying and updating employees
$(document).on('click', '.employee', function () {
  getEmployee($(this).data("id"), displayEmployeeInfoModal);
});

// See ajax calls for function
$(document).on('click', '#employeeUpdateButton', function () {
  updateEmployee($(this).data("id"), departments, locations, statuses);
});

$(document).on('submit', '#promoteEmployeeModalForm', function () {
  var employeeId = $(this).data("id");
  promoteEmployee(employeeId, displayEmployeeInfoModal, getAllEmployees, displayAllEmployees);
});

// Event listener for employee class - gets employee from database
$(document).on('click', '#promoteEmployeeModal', function () {
  var employeeId = $(this).data("id");
  promoteEmployeeModal(employeeId, departments, locations);
});

$(document).on('submit', '#updateEmployeeModalForm', function () {
  employeeSaveUpdate($(this).data("id"));
});

function employeeSaveUpdate(employeeId) {
  console.log("Saving update to employee");

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
      locationId: $('#location').val(),
      status: $('#status').val()
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
$(document).on('click', '.newEmployee', function () {
  openNewEmployeeModal();
});

function showValues(){
  console.log("Showing values");
}

function openNewEmployeeModal() {
  $("#informationModalLabel").html('Employee Information');
  $("#informationModalBody").html("");

  // Constructs HTML for modal form
  $('.modalForm').attr("id","newEmployeeModal");
  $('.modalForm').attr("data-id", "" );

  $("#informationModalBody").append('<table id="employeeTable" class="table">');

    $("#employeeTable").append('<tr><td><label for="fname">First name</label></td><td><input type="text" id="fname" name="fname" value="" pattern="[A-Za-z ]+" required></td></tr>');
    $("#employeeTable").append('<tr><td><label for="lname">Last Name</td><td><input type="text" id="lname" name="lname" value="" pattern="[A-Za-z ]+" required></td></tr>');
    $("#employeeTable").append('<tr><td><label for="title">Job Title</td><td><input type="text" id="title" name="title" value="" pattern="[A-Za-z ]+" required></td></tr>');
    $("#employeeTable").append('<tr><td><label for="email">Email</td><td><input type="email" id="email" name="email" value="" required></td></tr>');
    $("#employeeTable").append('<tr><td><label for="department">Department</td><td><select id="department" name="department" value=""></td></tr>');
      departments.forEach(function(department) {
        $("#department").append('<option value="' + department['id'] + '">' + department['name'] + '</option>');
      });
    $("#employeeTable").append('<tr><td>Base Location</td><td id="baseLocation"></td></tr>');
    $("#employeeTable").append('<tr><td><label for="location">Location</td><td><select id="location" name="location" value=""></td></tr>');
      locations.forEach(function(location) {
        $("#location").append('<option value="' + location['id']  + '">' + location['name'] + '</option>');
      });

  updateLocationToDepartment();

  // Add buttons to modal footer
  $('.modal-footer').html("");
  $(".modal-footer").append('<input type="submit" class="btn btn-primary float-right">');
  $(".modal-footer").append('<button type="button" class="btn btn-secondary float-right" data-dismiss="modal">Close</button>');
  $('.modal-footer').show();

  $('#informationModal').modal('show');

}

$(document).on('change', '#department', function () {

  updateLocationToDepartment();

});

function updateLocationToDepartment() {
  var departmentSelected = $('#department').val();
  $('#baseLocation').html( departmentLocation[departmentSelected] );
  console.log(departmentLocationId)
  $('#location').val( departmentLocationId[departmentSelected] ).change();
}


// Event listener for new employee modal - adds employee to database
$(document).on('submit', '#newEmployeeModal', function () {

  saveNewEmployee();

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
$(document).on('click', '.showEmployeeFilterButton', function () {
  employeeFilterModal();
});

function employeeFilterModal() {
  $("#informationModalLabel").html('Employee Filter');
  $("#informationModalBody").html("");
  $("#informationModalBody").append('<table id="employeeTable" class="table">');

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
  $('.modal-footer').html("").show();
  $('.modal-footer').append('<button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>').show();
  $('.modal-footer').append('<button type="button" class="btn btn-primary" id="employeeFilterButton" data-id="">Filter employees</button>').show();

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

// Event listener for employee class - gets employee from database
$(document).on('keyup', '#searchEmployeesInput', 'input', function () {
  var searchTerm = $('#searchEmployeesInput').val();
  searchAllEmployees(searchTerm, displayAllEmployees);
});

function searchAllEmployees(searchTerm, callback) {
  console.log("Searching employees")
  $.ajax({
    url: "libs/php/searchAllEmployees.php",
    type: 'POST',
    dataType: 'json',
    data: {
      searchTerm: searchTerm
    },
    success: function(result) {

      if (result.status.name == "ok") {

        console.log('Searched employees')
        employees = result['data'];
        callback(employees);

      }

    },
    error: function(jqXHR, textStatus, errorThrown) {
      console.log("Request failed");
    }
  });
}

// /* Following from bootstrap-menu detail-smart-hide*/
// add padding top to show content behind navbar
$('.container').css('padding-top', $('.navbar').outerHeight() + 'px')

var last_scroll_top = 0;
var scroll_top = $(this).scrollTop();

// detect scroll top or down
if ($('.smart-scroll').length > 0) { // check if element exists

    $(window).on('scroll', function() {
        scroll_top = $(this).scrollTop();
        if(scroll_top < last_scroll_top) {
            $('.smart-scroll').removeClass('scrolled-down').addClass('scrolled-up');
        }
        else {
            $('.smart-scroll').removeClass('scrolled-up').addClass('scrolled-down');
        }
        last_scroll_top = scroll_top;
    });
}

$('.navbar-collapse').on('shown.bs.collapse', function () {
  var containerPadding = $('.navbar').outerHeight() + 'px';
  $('.container').animate({paddingTop: containerPadding}, 150);
  // $('.container').css('padding-top', $('.navbar').outerHeight() + 'px')
})

$('.navbar-collapse').on('hidden.bs.collapse', function () {
  var containerPadding = $('.navbar').outerHeight() + 'px';
  $('.container').animate({paddingTop: containerPadding}, 150);
  // $('.container').css('padding-top', $('.navbar').outerHeight() + 'px')
})
