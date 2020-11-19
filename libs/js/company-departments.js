import { getAllTables, getEmployee, updateEmployee, employeeSaveUpdate, promoteEmployeeModal, promoteEmployee} from './ajax-calls.js';
import { displayEmployeeInfoModal, deleteEmployeeModal } from './display-functions.js';

var employees, departments, locations, statuses;

$( document ).ready(function() {

  getAllTables(displayDepartmentPageData)

});

// Callback for getAllTables sets and displays locations, departments and employees
function displayDepartmentPageData(tablesInput) {

  $('#company-departments').html('');
  employees = {}
  // Set global variables
  locations = tablesInput['locations'];
  console.log(locations)
  departments = tablesInput['departments'];
  console.log(departments)
  employees = tablesInput['employees'];
  console.log(employees)
  statuses = tablesInput['status'];
  console.log(statuses)

  // Adds locations then departments in that location then employees in that department
  departments.forEach(function(department) {
    var departmentIdTag = 'department-' + department['id'];
    $('#company-departments').append('<div id="department-' + department['id'] + '" class="border border-primary department"></div>');
    $('#' + departmentIdTag).append('<div class="department-name" data-id="' + department['id'] + '"><h3>' + department['name'] + '<img src="./libs/icons/ellipses.svg" class="icon btn btn-warning ml-2"></h3></div>');

    var managerName;
    if (department['managerFirstName'] == null || department['managerLastName'] == null) {
      managerName = "No manager";
    } else {
      managerName = department['managerFirstName'] + ' ' + department['managerLastName'];
    }
    $('#' + departmentIdTag).append('<h5>Manager: <span class="employee-name btn btn-outline-dark"  data-id="' + department['departmentManager'] + '">' + managerName + '</span></h5>');

    $('#' + departmentIdTag).append('<div id="' + departmentIdTag + 'LastLine" class="department-lastline">');
    $('#' + departmentIdTag + 'LastLine').append('<h5>' + department['location'] + '</h5></div>');

    // Button to toggle dropdown
    var departmentEmployeesIdTag = 'department-employees' + department['id'];
    $('#' + departmentIdTag + 'LastLine').append('<button data-toggle="collapse" data-target="#' + departmentEmployeesIdTag + '" class="btn btn-info department-show-employees">Show Employees</button>');

    // Creates dropdown for containing employees
    $('#' + departmentIdTag).append('<div id="' + departmentEmployeesIdTag + '" class="department-employees collapse">');
    employees.forEach(function(employee) {
      if (employee['departmentID'] === department['id'] && employee['id'] != department['departmentManager']) {
        $('#' + departmentEmployeesIdTag).append( '<div id="employee' + employee['id'] + '" class="employee-name btn btn-outline-dark" data-id=' + employee['id'] + '>' + employee['firstName'] + ' ' + employee['lastName'] + '</div>');
        if (employee['currentLocationId'] !== department['locationID']) {
          $('#employee' + employee['id']).addClass('offsite-employee');
        }
        if (employee['status'] != 1) {
          $('#employee' + employee['id']).addClass('absent-employee');
        }
      }
    });
  })

  $('.container').css('height', 'auto');
};

// Event listeners for displaying and updating employees - ADD TO EACH PAGE SCRIPT
$(document).on('click', '.employee-name', function () {
  var employeeId = $(this).data("id");
  getEmployee(employeeId, displayEmployeeInfoModal);
});

$(document).on('click', '.branchManager', function () {
  var employeeId = $(this).data("id");
  getEmployee(employeeId, displayEmployeeInfoModal);
});

$(document).on('click', '#employeeUpdateButton', function () {
  var employeeId = $(this).data("id");
  updateEmployee(employeeId, departments, locations, statuses);
});

$(document).on('submit', '#updateEmployeeModalForm', function () {
  var employeeId = $(this).data("id");
  console.log($('#updateEmployeeModalForm').data("id"))
  employeeSaveUpdate(employeeId, displayEmployeeInfoModal, getAllTables, displayDepartmentPageData);
});

$(document).on('submit', '#promoteEmployeeModalForm', function () {
  var employeeId = $(this).data("id");
  promoteEmployee(employeeId, displayEmployeeInfoModal, getAllTables, displayDepartmentPageData);
});

// Event listener for employee class - gets employee from database
$(document).on('click', '#promoteEmployeeModal', function () {
  var employeeId = $(this).data("id");
  promoteEmployeeModal(employeeId, departments, locations);
});

// See display-functions for function
$(document).on('click', '#employeeDeleteButton', function () {
  var employeeId = $(this).data("id");
  var employeeName = $(this).data("name");
  deleteEmployeeModal(employeeId, employeeName);
});

$(document).on('change', '#managerTier', function () {
  if ($('#managerTier').val() == 'depManager') {
    $('#departmentManagerRow').show();
    $('#locationManagerRow').hide();
  } else {
    $('#departmentManagerRow').hide();
    $('#locationManagerRow').show();
  }
});

// Event listener for new employee modal - adds employee to database
$(document).on('click', '.department-name', function () {
  var departmentId = $(this).data('id');
  getDepartment(departmentId, showDepartmentModal);
});

function getDepartment(departmentId, displayInfoModal) {
  console.log("getting department")
  $.ajax({
    url: "libs/php/getDepartmentByID.php",
    type: 'POST',
    dataType: 'json',
    data: {
      id: departmentId
    },
    success: function(result) {

      console.log(result)

      if (result.status.name == "ok") {

        console.log("Showing Department")
        var department = result['data'][0];
        console.log(department)
        displayInfoModal(department);

      }

    },
    error: function(jqXHR, textStatus, errorThrown) {
      console.log("Request failed");
      console.warn(jqXHR.responseText)
    }
  });
}

function showDepartmentModal(department) {
  $("#informationModalLabel").html('New Department');
  $("#informationModalBody").html("");

  // Constructs HTML for modal form
  $('.modalForm').attr("id","newDepartmentModal");
  $('.modalForm').attr("data-id", "" );

  $("#informationModalBody").append('<table id="infoTable" class="table">');

    $("#infoTable").append('<tr><td>Department Name</label></td><td>' + department['name'] + '</td></tr>');
    $("#infoTable").append('<tr><td>Location</td><td>' + department['locationName'] + '</td></tr>');

    var managerName;
    if (department['managerFirstName'] == null || department['managerLastName'] == null) {
      managerName = "No manager";
    } else {
      managerName = department['managerFirstName'] + ' ' + department['managerLastName'];
    }
    $("#infoTable").append('<tr><td>Manager</td><td>' + managerName + '</td></tr>');


  // Add buttons to modal footer
  $('.modal-footer').html("");
  $(".modal-footer").append('<button type="button" id="editDepartment" class="btn btn-primary float-right" data-id="' + department['id'] + '" data-name="' + department['name'] + '" data-locationid="' + department['locationID'] + '">Edit</button>');
  $(".modal-footer").append('<button type="button" id="deleteDepartment" class="btn btn-danger float-right" data-id="' + department['id'] + '" data-name="' + department['name'] + '">Delete</button>');
  $(".modal-footer").append('<button type="button" class="btn btn-secondary float-right" data-dismiss="modal">Close</button>');
  $('.modal-footer').show();

  $('#informationModal').modal('show');

}

// Event listener for employee class - gets employee from database
$(document).on('click', '#editDepartment', function () {
  var departmentId = $(this).data('id');
  var departmentName = $(this).data('name');
  var locationID = $(this).data('locationid');
  editDepartmentModal(departmentId, departmentName, locationID, locations);
});

function editDepartmentModal(departmentId, departmentName, locationID, locations) {
  $("#informationModalLabel").html('Edit Department');
  $("#informationModalBody").html("");

  // Constructs HTML for modal form
  $('.modalForm').attr("id","editDepartmentModal");
  $('.modalForm').attr("data-id", departmentId );

  $("#informationModalBody").append('<table id="inputTable" class="table">');

    $("#inputTable").append('<tr><td><label for="departmentNameInput">Department Name</label></td><td><input type="text" id="departmentNameInput" name="departmentNameInput" value="' + departmentName + '" pattern="[0-9A-Za-z ]+" required></td></tr>');
    $("#inputTable").append('<tr><td><label for="locationInput">Available locations: </td><td><select id="locationInput" name="locationInput" value=""></td></tr>');
      locations.forEach(function(location) {
        if (location['id'] > 0) {
          $("#locationInput").append('<option value="' + location['id']  + '" name="' + location['name'] + '" required>' + location['name'] + '</option>');
        }
      });
      $('#locationInput').val(locationID).change();
  // Add buttons to modal footer
  $('.modal-footer').html("");
  $(".modal-footer").append('<input type="submit" class="btn btn-primary float-right">');
  $(".modal-footer").append('<button type="button" class="btn btn-secondary float-right" data-dismiss="modal">Close</button>');
  $('.modal-footer').show();

  $('#informationModal').modal('show');

}

// Event listener for new employee modal - adds employee to database
$(document).on('submit', '#editDepartmentModal', function () {
  var departmentId = $(this).data('id');
  updateDepartment(departmentId, showDepartmentModal, getAllTables, displayDepartmentPageData);
});

function updateDepartment(departmentId, displayInfoModal, updateCallback, displayCallback) {
  console.log("Updating department")

  $.ajax({
    url: "libs/php/updateDepartment.php",
    type: 'POST',
    dataType: 'json',
    data: {
      id: departmentId,
      departmentName: $('#departmentNameInput').val(),
      locationID: $('#locationInput').val(),
    },
    success: function(result) {

      console.log(result)

      if (result.status.name == "ok") {

        console.log("Saved Department")
        var department = result['data'][0];
        displayInfoModal(department);

        updateCallback(displayCallback);
        $('#newDepartmentModal').modal('hide');

      }

    },
    error: function(jqXHR, textStatus, errorThrown) {
      console.log("Request failed");
      console.warn(jqXHR.responseText)
    }
  });
}

// Event listener for employee class - gets employee from database
$(document).on('click', '.newDepartment', function () {
  newDepartmentModal(locations);
});

function newDepartmentModal(locations) {
  $("#informationModalLabel").html('New Department');
  $("#informationModalBody").html("");

  // Constructs HTML for modal form
  $('.modalForm').attr("id","newDepartmentModal");
  $('.modalForm').attr("data-id", "" );

  $("#informationModalBody").append('<table id="inputTable" class="table">');

    $("#inputTable").append('<tr><td><label for="departmentNameInput">Department Name</label></td><td><input type="text" id="departmentNameInput" name="departmentNameInput" value="" pattern="[0-9A-Za-z ]+" required></td></tr>');
    $("#inputTable").append('<tr><td><label for="locationInput">Available locations: </td><td><select id="locationInput" name="locationInput" value=""></td></tr>');
      locations.forEach(function(location) {
        if (location['id'] > 0) {
          $("#locationInput").append('<option value="' + location['id']  + '" name="' + location['name'] + '" required>' + location['name'] + '</option>');
        }

      });
  // Add buttons to modal footer
  $('.modal-footer').html("");
  $(".modal-footer").append('<input type="submit" class="btn btn-primary float-right">');
  $(".modal-footer").append('<button type="button" class="btn btn-secondary float-right" data-dismiss="modal">Close</button>');
  $('.modal-footer').show();

  $('#informationModal').modal('show');

}

// Event listener for new employee modal - adds employee to database
$(document).on('click', '#deleteDepartment', function () {
  var departmentId = $(this).data('id');
  var departmentName = $(this).data('name');
  deleteDepartmentModal(departmentId, departmentName);
});

function deleteDepartmentModal(departmentId, departmentName) {
  console.log("Confirm delete department")
  $("#confirmationModalLabel").html('Delete ' + departmentName + ' department?');
  $("#confirmationModalBody").html("");

  // Add buttons to modal footer
  $('#confirmationModalFooter').html("");
  $("#confirmationModalFooter").append('<button id="confirmDeleteDepartment" type="button" class="btn btn-danger float-right" data-dismiss="modal" data-id="' + departmentId + '">Confirm</button>');
  $("#confirmationModalFooter").append('<button type="button" class="btn btn-secondary float-right" data-dismiss="modal">Cancel</button>');
  $('#modal-footer').show();

  $('#confirmationModal').modal('show');
}

// Event listener for new employee modal - adds employee to database
$(document).on('click', '#confirmDeleteDepartment', function () {
  var departmentId = $(this).data('id');
  deleteDepartment(departmentId, getAllTables, displayDepartmentPageData);
});

function deleteDepartment(departmentId, updateCallback, displayCallback) {
  console.log("Deleting department")

  $.ajax({
    url: "libs/php/deleteDepartmentByID.php",
    type: 'POST',
    dataType: 'json',
    data: {
      id: departmentId
    },
    success: function(result) {



      if (result.status.name == "ok") {

        console.log("Deleted Department")

        updateCallback(displayCallback);
        $('#informationModal').modal('hide');
        $('#confirmationModal').modal('hide');

      }

    },
    error: function(jqXHR, textStatus, errorThrown) {
      console.log("Request failed");
      console.warn(jqXHR.responseText)
    }
  });
}

// Event listener for new employee modal - adds employee to database
$(document).on('submit', '#newDepartmentModal', function () {
  saveNewDepartment(showDepartmentModal, getAllTables, displayDepartmentPageData);
});

function saveNewDepartment(displayInfoModal, updateCallback, displayCallback) {
  console.log("Saving department")

  $.ajax({
    url: "libs/php/newDepartment.php",
    type: 'POST',
    dataType: 'json',
    data: {
      departmentName: $('#departmentNameInput').val(),
      locationID: $('#locationInput').val(),
    },
    success: function(result) {

      console.log(result)

      if (result.status.name == "ok") {

        console.log("Saved Department")
        var department = result['data'][0];
        displayInfoModal(department);

        updateCallback(displayCallback);
        $('#newDepartmentModal').modal('hide');

      }

    },
    error: function(jqXHR, textStatus, errorThrown) {
      console.log("Request failed");
      console.warn(jqXHR.responseText)
    }
  });
}
