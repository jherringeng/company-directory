import { getAllTables, getEmployee, updateEmployee} from './ajax-calls.js';
import { displayEmployeeInfoModal } from './display-functions.js';

var employees, departments, locations;

$( document ).ready(function() {

  getAllTables(displayLocationPageData)

});

// Callback for getAllTables sets and displays locations, departments and employees
function displayLocationPageData(tablesInput) {
  // Set global variables
  locations = tablesInput['locations'];
  console.log(locations)
  departments = tablesInput['departments'];
  employees = tablesInput['employees'];

  // Adds locations then departments in that location then employees in that department
  locations.forEach(function(location) {
    var locationIdTag = '#location-' + location['id'];
    $('#company-locations').append('<div id="location-' + location['id'] + '" class="border border-primary location"></div>');
    $(locationIdTag).append('<div class="location-name"><h3>' + location['name'] + '</h3></div>');
    var managerName;
    if (location['firstName'] == null || location['firstName'] == null) {
      managerName = "Open Position";
    } else {
      managerName = location['firstName'] + ' ' + location['lastName'];
    }
    $(locationIdTag).append('<div class="location-name"><h5>Manager: <span class="branchManager"  data-id="' + location['manager'] + '">' + managerName + '</span></h5></div>');
    $(locationIdTag).append('<div class="location-name"><h5>' + location['address'] +', ' + location['name'] + ', ' + location['postcode'] + '</h5></div>');
    departments.forEach(function(department){

      if (department['locationID'] === location['id']) {
        var departmentIdTag = 'department-' + department['id'];
        var departmentEmployeesIdTag = 'department-employees' + department['id'];
        $(locationIdTag).append('<div id="' + departmentIdTag + '" class="location-department">');
        $('#' + departmentIdTag).append('<div class="location-department-name"><h4>' + department['name'] + '</h4></div>');
        $('#' + departmentIdTag).append('<button data-toggle="collapse" data-target="#' + departmentEmployeesIdTag + '" class="btn btn-info location-show-employees">Show Employees</button>');
        $('#' + departmentIdTag).append('<div id="' + departmentEmployeesIdTag + '" class="location-department collapse">');
        console.log(departmentEmployeesIdTag)
        employees.forEach(function(employee) {

          if (employee['departmentID'] === department['id']) {
            $('#' + departmentEmployeesIdTag).append( '<div id="employee' + employee['id'] + '" class="employee-name btn btn-outline-dark" data-id=' + employee['id'] + '>' + employee['firstName'] + ' ' + employee['lastName'] + '</div>');
          }
        });
      }
    })
  })
  $('.container').css('height', 'auto');
}

// Event listeners for displaying and updating employees - ADD TO EACH PAGE SCRIPT
$(document).on('click', '.employee-name', function () {
  getEmployee($(this).data("id"), displayEmployeeInfoModal);
});

$(document).on('click', '.branchManager', function () {
  getEmployee($(this).data("id"), displayEmployeeInfoModal);
});

$(document).on('click', '#employeeUpdateButton', function () {
  updateEmployee($(this).data("id"), departments, locations);
});

$(document).on('submit', '#updateEmployeeModalForm', function () {
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

        $('#employee' + employee['id']).html(employee['firstName'] + ' ' + employee['lastName'])

      }

    },
    error: function(jqXHR, textStatus, errorThrown) {
      console.log("Request failed");
    }
  });
}
