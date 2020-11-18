import { getAllTables, getEmployee, updateEmployee, employeeSaveUpdate, promoteEmployeeModal, promoteEmployee} from './ajax-calls.js';
import { displayEmployeeInfoModal } from './display-functions.js';

var employees, departments, locations, statuses;

$( document ).ready(function() {

  getAllTables(displayLocationPageData)

});

// Callback for getAllTables sets and displays locations, departments and employees
function displayLocationPageData(tablesInput) {

  $('#company-locations').html('');

  // Set global variables
  locations = tablesInput['locations'];
  console.log(locations)
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
    $(locationIdTag).append('<div class="location-name" data-id="' + location['id'] + '"><h3>' + location['name'] + '<img src="./libs/icons/ellipses.svg" class="icon btn btn-warning ml-2"></h3></div>');
    var managerName;
    if (location['firstName'] == null || location['firstName'] == null) {
      managerName = "Open Position";
    } else {
      managerName = location['firstName'] + ' ' + location['lastName'];
    }
    $(locationIdTag).append('<div><h5>Manager: <span class="branchManager btn btn-lg btn-outline-dark"  data-id="' + location['manager'] + '">' + managerName + '</span></h5></div>');
    $(locationIdTag).append('<div><h5>' + location['address'] +', ' + location['name'] + ', ' + location['postcode'] + '</h5></div>');
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
        $('#' + departmentIdTag).append('Manager: <span class="employee-name btn btn-outline-dark"  data-id="' + department['departmentManager'] + '">' + managerName + '</span>');
        $('#' + departmentIdTag).append('<button data-toggle="collapse" data-target="#' + departmentEmployeesIdTag + '" class="btn btn-info location-show-employees">Show Employees</button>');
        $('#' + departmentIdTag).append('<div id="' + departmentEmployeesIdTag + '" class="location-department collapse">');
        console.log(departmentEmployeesIdTag)
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

        console.log("Showing Location")
        var location = result['data'][0];
        console.log(location)
        displayInfoModal(location);

      }

    },
    error: function(jqXHR, textStatus, errorThrown) {
      console.log("Request failed");
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
    } else {
      managerName = location['managerFirstName'] + ' ' + location['managerLastName'];
    }
    $("#infoTable").append('<tr><td>Manager</td><td>' + managerName + '</td></tr>');

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

        console.log("Showing Location")
        var location = result['data'][0];
        console.log(location)
        displayInfoModal(location);

      }

    },
    error: function(jqXHR, textStatus, errorThrown) {
      console.log("Request failed");
      console.warn(jqXHR.responseText)
    }
  });
}

function editLocationModal(location) {
  $("#informationModalLabel").html('Edit Location');
  $("#informationModalBody").html("");

  // Constructs HTML for modal form
  $('.modalForm').attr("id","editLocationModal");
  $('.modalForm').attr("data-id", location['id'] );

  $("#informationModalBody").append('<table id="inputTable" class="table">');

    $("#inputTable").append('<tr><td><label for="locationNameInput">Location Name</label></td><td><input type="text" id="locationNameInput" name="locationNameInput" value="' + location['name'] + '" pattern="[A-Za-z ]+" required></td></tr>');
    $("#inputTable").append('<tr><td><label for="addressInput">Address</td><td><input type="text" id="addressInput" name="addressInput" value="' + location['address'] + '" pattern="[0-9A-Za-z ]+" required></td></tr>');
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
  console.log("Editing location")

  $.ajax({
    url: "libs/php/editLocation.php",
    type: 'POST',
    dataType: 'json',
    data: {
      locationId: locationId,
      locationName: $('#locationNameInput').val(),
      address: $('#addressInput').val(),
      postcode: $('#postcodeInput').val(),
    },
    success: function(result) {

      if (result.status.name == "ok") {

        console.log("Saved Location")
        var location = result['data'][0];
        console.log(location)
        displayInfoModal(location);

        updateCallback(displayCallback);

      }

    },
    error: function(jqXHR, textStatus, errorThrown) {
      console.log("Request failed");
      console.warn(jqXHR.responseText)
    }
  });
}

// Event listener for new employee modal - adds employee to database
$(document).on('submit', '#newLocationModal', function () {
  saveNewLocation(showNewLocationModal, getAllTables, displayLocationPageData);
});

function saveNewLocation(displayInfoModal, updateCallback, displayCallback) {
  console.log("Saving location")

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

        console.log("Saved Location")
        var location = result['data'][0];
        displayInfoModal(location);

        updateCallback(displayCallback);

      }

    },
    error: function(jqXHR, textStatus, errorThrown) {
      console.log("Request failed");
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

function deleteLocationModal(locationId, locationName) {
  $("#confirmationModalLabel").html('Delete ' + locationName + ' location?');
  $("#confirmationModalBody").html("");

  // Add buttons to modal footer
  $('#confirmationModalFooter').html("");
  $("#confirmationModalFooter").append('<button id="confirmDeleteLocation" type="button" class="btn btn-danger float-right" data-dismiss="modal" data-id="' + locationId + '">Confirm</button>');
  $("#confirmationModalFooter").append('<button type="button" class="btn btn-secondary float-right" data-dismiss="modal">Cancel</button>');
  $('#modal-footer').show();

  $('#confirmationModal').modal('show');
}

// Event listener for new employee modal - adds employee to database
$(document).on('click', '#confirmDeleteLocation', function () {
  var locationId = $(this).data('id');
  deleteLocation(locationId, getAllTables, displayLocationPageData);
});

function deleteLocation(locationId, updateCallback, displayCallback) {
  console.log("Deleting location")

  $.ajax({
    url: "libs/php/deleteLocationByID.php",
    type: 'POST',
    dataType: 'json',
    data: {
      locationId: locationId
    },
    success: function(result) {



      if (result.status.name == "ok") {

        console.log("Deleted Location")

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
