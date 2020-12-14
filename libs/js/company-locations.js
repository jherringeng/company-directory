import { getAllTables, getEmployee, updateEmployee, employeeSaveUpdate, promoteEmployeeModal, promoteEmployee, deleteEmployee} from './ajax-calls.js';
import { displayEmployeeInfoModal, deleteEmployeeModal } from './display-functions.js';

var employees, departments, locations, statuses;

$( document ).ready(function() {

  getAllTables(displayLocationPageData)

});

// Callback for getAllTables sets and displays locations, departments and employees
function displayLocationPageData(tablesInput) {

  $('#company-locations').html('');

  // Set global variables
  locations = tablesInput['locations'];
  // console.log(locations)
  departments = tablesInput['departments'];
  employees = tablesInput['employees'];
  statuses = tablesInput['status'];

  // Adds locations then departments in that location then employees in that department
  locations.forEach(function(location) {
    if (location['id'] <= 0) {
      return;
    }
    var locationIdTag = '#location-' + location['id'];
    $('#company-locations').append('<div id="location-' + location['id'] + '" class="border border-primary location"></div>');
    var locationDetailsIdTag = '#locationDetails-' + location['id'];
    $(locationIdTag).append('<div id="locationDetails-' + location['id']  + '" class="location-details"></div>');
    $(locationDetailsIdTag).append('<div class="location-name" data-id="' + location['id'] + '"><h3 class="mr-2">' + location['name'] + '<img src="./libs/icons/pencil-24.svg" class="btn"></h3></div>');
    var managerName;
    if (location['firstName'] == null || location['firstName'] == null) {
      managerName = "Open Position";
    } else {
      managerName = location['firstName'] + ' ' + location['lastName'];
    }
    $(locationDetailsIdTag).append('<h5 class="location-manager"><span class="manager-label">Manager: </span><span class="branchManager btn btn-lg btn-outline-dark"  data-id="' + location['manager'] + '">' + managerName + '</span></h5>');
    $(locationDetailsIdTag).append('<h5 class="location-address">' + location['address'] +', ' + location['name'] + ', ' + location['postcode'] + '</h5>');
    departments.forEach(function(department){

      if (department['locationID'] === location['id']) {
        var departmentIdTag = 'department-' + department['id'];
        var departmentEmployeesIdTag = 'department-employees' + department['id'];
        $(locationIdTag).append('<div id="' + departmentIdTag + '" class="location-department">');
        $('#' + departmentIdTag).append('<div class="location-department-name"><h4>' + department['name'] + '</h4></div>');

        var managerName;
        if (department['managerFirstName'] == null || department['managerLastName'] == null) {
          managerName = 'No manager';
        } else {
          managerName = department['managerFirstName'] + ' ' + department['managerLastName'];
        }
        $('#' + departmentIdTag).append('<div class="location-department-manager"><span class="manager-label">Manager: </span><span class="employee-name btn btn-outline-dark" id="departmentManager' + department['departmentManager'] + '"  data-id="' + department['departmentManager'] + '">' + managerName + '</span></div>');

        var manager = employees.filter(employee => {
          return employee.id == department['departmentManager'];
        })

        // console.log(manager)
        if (manager[0]) {
          if (manager[0]['status'] != 1) {
            $('#departmentManager' + department['departmentManager']).addClass('absent-employee');
          } else if (manager[0]['currentLocationId'] != department['locationID']) {
            $('#departmentManager' + department['departmentManager']).addClass('offsite-employee');
          }
        }

        // console.log('#' + departmentIdTag + '.location-department-manager.employee-name')

        $('#' + departmentIdTag).append('<button data-toggle="collapse" data-target="#' + departmentEmployeesIdTag + '" class="btn btn-info btn-show-employees">Show Employees</button>');
        $(locationIdTag).append('<div id="' + departmentEmployeesIdTag + '" class="location-department-employees collapse">');
        // console.log(departmentEmployeesIdTag)
        employees.forEach(function(employee) {

          if (employee['departmentID'] === department['id'] && employee['id'] != department['departmentManager']) {
            $('#' + departmentEmployeesIdTag).append( '<div id="employee' + employee['id'] + '" class="employee-name btn btn-outline-dark" data-id=' + employee['id'] + '>' + employee['firstName'] + ' ' + employee['lastName'] + '</div>');
            if (employee['status'] != 1) {
              $('#employee' + employee['id']).addClass('absent-employee');
            } else if (employee['currentLocationId'] !== department['locationID']) {
              $('#employee' + employee['id']).addClass('offsite-employee');
            }

          }
        });
      }
    })
  })
  $('.container').css('height', 'auto');
}

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
  var employeeId = $('#updateEmployeeModalForm').data("id");
  employeeSaveUpdate(employeeId, displayEmployeeInfoModal, getAllTables, displayLocationPageData);
});

$(document).on('submit', '#promoteEmployeeModalForm', function () {
  var employeeId = $(this).data("id");
  promoteEmployee(employeeId, displayEmployeeInfoModal, getAllTables, displayLocationPageData);
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

// See display-functions for function
$(document).on('click', '#confirmDeleteEmployee', function () {
  var employeeId = $(this).data("id");
  deleteEmployee(employeeId, getAllTables, displayLocationPageData);
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



// Event listener for employee class - gets employee from database
$(document).on('click', '.newLocation', function () {
  newLocationModal();
});

function newLocationModal() {
  $("#informationModalLabel").html('New Location');
  $("#informationModalBody").html("");

  // Constructs HTML for modal form
  $('.modalForm').attr("id","newLocationModal");
  $('.modalForm').attr("data-id", "" );

  $("#informationModalBody").append('<table id="inputTable" class="table">');

    $("#inputTable").append('<tr><td><label for="locationNameInput">Location Name</label></td><td><input type="text" id="locationNameInput" name="locationNameInput" value="" pattern="[A-Za-z ]+" required></td></tr>');
    $("#inputTable").append('<tr><td><label for="addressInput">Address</td><td><input type="text" id="addressInput" name="addressInput" value="" pattern="[0-9A-Za-z ]+" required></td></tr>');
    $("#inputTable").append('<tr><td><label for="postcodeInput">Postcode</td><td><input type="text" id="postcodeInput" name="postcodeInput" value="" pattern="[0-9A-Za-z ]+" required></td></tr>');

  // Add buttons to modal footer
  $('.modal-footer').html("");
  $(".modal-footer").append('<input type="submit" class="btn btn-primary float-right">');
  $(".modal-footer").append('<button type="button" class="btn btn-secondary float-right" data-dismiss="modal">Close</button>');
  $('.modal-footer').show();

  $('#informationModal').modal('show');

}

// Event listener for new employee modal - adds employee to database
$(document).on('click', '.location-name', function () {
  var locationId = $(this).data('id');
  getLocation(locationId, showLocationModal);
  // editLocation(showLocationModal, getAllTables, displayLocationPageData);
});

function getLocation(locationId, displayInfoModal) {
  $.ajax({
    url: "libs/php/getLocation.php",
    type: 'POST',
    dataType: 'json',
    data: {
      locationId: locationId
    },
    success: function(result) {

      if (result.status.name == "ok") {

        // console.log("Showing Location")
        var location = result['data'][0];
        // console.log(location)
        displayInfoModal(location);

      }

    },
    error: function(jqXHR, textStatus, errorThrown) {
      // console.log("Request failed");
      console.warn(jqXHR.responseText)
    }
  });
}

function showLocationModal(location) {
  $("#informationModalLabel").html('Location Information');
  $("#informationModalBody").html("");

  // Constructs HTML for modal form
  $('.modalForm').attr("id","");
  $('.modalForm').attr("data-id", "");

  $("#informationModalBody").append('<table id="infoTable" class="table">');

    $("#infoTable").append('<tr><td>Location Name</td><td>' + location['name'] + '</td></tr>');
    $("#infoTable").append('<tr><td>Address</td><td>' + location['address'] + '</td></tr>');
    $("#infoTable").append('<tr><td>Postcode</td><td>' + location['postcode'] + '</td></tr>');
    var managerName;
    if (location['managerFirstName'] == null || location['managerLastName'] == null) {
      managerName = "No manager";
      $("#infoTable").append('<tr><td>Manager</td><td>' + managerName + '</td></tr>');
    } else {
      managerName = location['managerFirstName'] + ' ' + location['managerLastName'];
      $("#infoTable").append('<tr><td>Manager</td><td>' + managerName + '<button type="button" id="removeLocationManager" class="btn btn-warning float-right" data-id="' + location['id'] + '" data-name="' + location['name'] + '" data-manager="' + managerName + '" data-managerid="' + location['manager'] + '"><img src="./libs/icons/dash-24.svg"></button></td></tr></td></tr>');
    }

  // Add buttons to modal footer
  $('.modal-footer').html("");
  $(".modal-footer").append('<button id="editLocation" type="button" class="btn btn-primary float-right" data-id="' + location['id'] + '">Edit</button>');
  $(".modal-footer").append('<button id="deleteLocation" type="button" class="btn btn-danger float-right" data-id="' + location['id'] + '" data-name="' + location['name'] + '">Delete</button>');
  $(".modal-footer").append('<button type="button" class="btn btn-secondary float-right" data-dismiss="modal">Close</button>');
  $('.modal-footer').show();

  $('#informationModal').modal('show');

}

// Event listener for new employee modal - adds employee to database
$(document).on('click', '#editLocation', function () {
  var locationId = $(this).data('id');
  editLocation(locationId, editLocationModal);
});

function editLocation(locationId, displayInfoModal) {
  $.ajax({
    url: "libs/php/getLocation.php",
    type: 'POST',
    dataType: 'json',
    data: {
      locationId: locationId
    },
    success: function(result) {

      if (result.status.name == "ok") {

        // console.log("Showing Location")
        var location = result['data'][0];
        // console.log(location)
        displayInfoModal(location);

      }

    },
    error: function(jqXHR, textStatus, errorThrown) {
      // console.log("Request failed");
      console.warn(jqXHR.responseText)
    }
  });
}

function editLocationModal(location) {
  $("#informationModalLabel").html('Edit Location');
  $("#informationModalBody").html("");

  // Constructs HTML for modal form
  $('.modalForm').attr("id","editLocationModal");
  // NOTE Remove?
  $('.modalForm').attr("data-id", location['id'] );

  $("#informationModalBody").append('<table id="inputTable" class="table">');

    $("#inputTable").append('<tr class="d-none"\"><td><input type="text" id="locationIdInput" name="locationIdInput" value="' + location['id'] + '"</td></tr>');
    $("#inputTable").append('<tr><td><label for="locationNameInput">Location Name</label></td><td><input type="text" id="locationNameInput" name="locationNameInput" value="' + location['name'] + '" pattern="^[A-Za-z -]+$" required></td></tr>');
    $("#inputTable").append('<tr><td><label for="addressInput">Address</td><td><input type="text" id="addressInput" name="addressInput" value="' + location['address'] + '" pattern="^[0-9A-Za-z\- ]+$" required></td></tr>');
    $("#inputTable").append('<tr><td><label for="postcodeInput">Postcode</td><td><input type="text" id="postcodeInput" name="postcodeInput" value="' + location['postcode'] + '" pattern="[0-9A-Za-z ]+" required></td></tr>');

  // Add buttons to modal footer
  $('.modal-footer').html("");
  $(".modal-footer").append('<input type="submit" class="btn btn-primary float-right">');
  $(".modal-footer").append('<button type="button" class="btn btn-secondary float-right" data-dismiss="modal">Close</button>');
  $('.modal-footer').show();

  $('#informationModal').modal('show');

}

// Event listener for new employee modal - adds employee to database
$(document).on('submit', '#editLocationModal', function () {
  var locationId = $(this).data('id');
  updateLocation(locationId, showNewLocationModal, getAllTables, displayLocationPageData);
});

function updateLocation(locationId, displayInfoModal, updateCallback, displayCallback) {
  // console.log("Editing location")

  $.ajax({
    url: "libs/php/editLocation.php",
    type: 'POST',
    dataType: 'json',
    data: {
      locationId: $('#locationIdInput').val(),
      locationName: $('#locationNameInput').val(),
      address: $('#addressInput').val(),
      postcode: $('#postcodeInput').val(),
    },
    success: function(result) {

      if (result.status.name == "ok") {

        // console.log("Saved Location")
        var location = result['data'][0];
        // console.log(location)
        displayInfoModal(location);

        updateCallback(displayCallback);

      }

    },
    error: function(jqXHR, textStatus, errorThrown) {
      // console.log("Request failed");
      console.warn(jqXHR.responseText)
    }
  });
}

// Event listener for new employee modal - adds employee to database
$(document).on('submit', '#newLocationModal', function () {
  saveNewLocation(showNewLocationModal, getAllTables, displayLocationPageData);
});

function saveNewLocation(displayInfoModal, updateCallback, displayCallback) {
  // console.log("Saving location")

  $.ajax({
    url: "libs/php/newLocation.php",
    type: 'POST',
    dataType: 'json',
    data: {
      locationName: $('#locationNameInput').val(),
      address: $('#addressInput').val(),
      postcode: $('#postcodeInput').val(),
    },
    success: function(result) {

      if (result.status.name == "ok") {

        // console.log("Saved Location")
        var location = result['data'][0];
        displayInfoModal(location);

        updateCallback(displayCallback);

      }

    },
    error: function(jqXHR, textStatus, errorThrown) {
      // console.log("Request failed");
      console.warn(jqXHR.responseText)
    }
  });
}

function showNewLocationModal(location) {
  $("#informationModalLabel").html('Location');
  $("#informationModalBody").html("");

  // Constructs HTML for modal form
  $('.modalForm').attr("id","");
  $('.modalForm').attr("data-id", "" );

  $("#informationModalBody").append('<table id="inputTable" class="table">');

    $("#inputTable").append('<tr><td><label for="locationNameInput">Location Name</label></td><td>' + location['name'] + '</td></tr>');
    $("#inputTable").append('<tr><td><label for="addressInput">Address</td><td>' + location['address'] + '</td></tr>');
    $("#inputTable").append('<tr><td><label for="postcodeInput">Postcode</td><td>' + location['postcode'] + '</td></tr>');

  // Add buttons to modal footer
  $('.modal-footer').html("");
  $(".modal-footer").append('<button type="button" class="btn btn-secondary float-right" data-dismiss="modal">Close</button>');
  $('.modal-footer').show();

  $('#informationModal').modal('show');

}


// Event listener for new employee modal - adds employee to database
$(document).on('click', '#deleteLocation', function () {
  var locationId = $(this).data('id');
  var locationName = $(this).data('name');
  deleteLocationModal(locationId, locationName);
});

function checkIfDepartmentInLocation(department, locationID) {
  return department['locationID'] == locationID;
}

function deleteLocationModal(locationId, locationName) {

  var departmentsInLocation = departments.filter(department => department['locationID'] == locationId);

  if(departmentsInLocation.length == 0) {
    $("#confirmationModalLabel").html('Delete ' + locationName + ' location?');
    $("#confirmationModalBody").html("");

    // Add buttons to modal footer
    $('#confirmationModalFooter').html("");
    $("#confirmationModalFooter").append('<button id="confirmDeleteLocation" type="button" class="btn btn-danger float-right" data-dismiss="modal" data-id="' + locationId + '">Confirm</button>');
    $("#confirmationModalFooter").append('<button type="button" class="btn btn-secondary float-right" data-dismiss="modal">Cancel</button>');
    $('#modal-footer').show();

    $('#confirmationModal').modal('show');
  }

  else {
    $("#confirmationModalLabel").html('Cannot delete ' + locationName + ' location.');
    $("#confirmationModalBody").html("");
    $("#confirmationModalBody").append('<p>Please move or delete the following <a href="/company-directory/departments.html">departments</a> to delete location:</p>');
    departmentsInLocation.forEach(function(department) {
      $("#confirmationModalBody").append('<p>' + department['name'] + '</p>');
    });
    $("#confirmationModalBody").append();

    // Add buttons to modal footer
    $('#confirmationModalFooter').html("");
    $("#confirmationModalFooter").append('<button type="button" class="btn btn-secondary float-right" data-dismiss="modal">Close</button>');
    $('#modal-footer').show();

    $('#confirmationModal').modal('show');
  }

}

// Event listener for new employee modal - adds employee to database
$(document).on('click', '#confirmDeleteLocation', function () {
  var locationId = $(this).data('id');
  deleteLocation(locationId, getAllTables, displayLocationPageData);
});

function deleteLocation(locationId, updateCallback, displayCallback) {
  // console.log("Deleting location")

  $.ajax({
    url: "libs/php/deleteLocationByID.php",
    type: 'POST',
    dataType: 'json',
    data: {
      locationId: locationId
    },
    success: function(result) {

      if (result.status.name == "ok") {

        // console.log("Deleted Location")

        updateCallback(displayCallback);
        $('#informationModal').modal('hide');
        $('#confirmationModal').modal('hide');

      }

    },
    error: function(jqXHR, textStatus, errorThrown) {
      // console.log("Request failed");
      console.warn(jqXHR.responseText)
    }
  });
}

// Event listener for new employee modal - adds employee to database
$(document).on('click', '#removeLocationManager', function () {
  var locationId = $(this).data('id');
  var locationName = $(this).data('name');
  var managerName = $(this).data('manager');
  var managerId = $(this).data('managerid');
  removeLocationManagerModal(locationId, locationName, managerName, managerId);
});

function removeLocationManagerModal(locationId, locationName, managerName, managerId) {
  // console.log("Confirm remove location manager")
  $("#confirmationModalLabel").html('Remove ' + managerName + ' as '+ locationName + ' manager?');
  $("#confirmationModalBody").html("");

  // Add buttons to modal footer
  $('#confirmationModalFooter').html("");
  $("#confirmationModalFooter").append('<button id="confirmRemoveLocationManager" type="button" class="btn btn-danger float-right" data-dismiss="modal" data-id="' + locationId + '" data-managerid="' + managerId + '">Confirm</button>');
  $("#confirmationModalFooter").append('<button type="button" class="btn btn-secondary float-right" data-dismiss="modal">Cancel</button>');
  $('#modal-footer').show();

  $('#confirmationModal').modal('show');
}

// Event listener for new employee modal - adds employee to database
$(document).on('click', '#confirmRemoveLocationManager', function () {
  var locationId = $(this).data('id');
  var managerId = $(this).data('managerid');
  // console.log(managerId)
  removeLocationManager(locationId, managerId, getAllTables, displayLocationPageData);
});

function removeLocationManager(locationId, managerId, updateCallback, displayCallback) {
  // console.log("Removing location manager")

  $.ajax({
    url: "libs/php/removeLocationManager.php",
    type: 'POST',
    dataType: 'json',
    data: {
      id: locationId,
      managerId: managerId
    },
    success: function(result) {

      if (result.status.name == "ok") {

        // console.log("Removed Location manager")

        updateCallback(displayCallback);
        $('#informationModal').modal('hide');
        $('#confirmationModal').modal('hide');

      }

    },
    error: function(jqXHR, textStatus, errorThrown) {
      // console.log("Request failed");
      console.warn(jqXHR.responseText)
    }
  });
}


/* Following from bootstrap-menu detail-smart-hide*/
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
