import { getAllTables, getEmployee, updateEmployee, employeeSaveUpdate} from './ajax-calls.js';
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
    $(locationIdTag).append('<div class="location-name"><h3>' + location['name'] + '</h3></div>');
    var managerName;
    if (location['firstName'] == null || location['firstName'] == null) {
      managerName = "Open Position";
    } else {
      managerName = location['firstName'] + ' ' + location['lastName'];
    }
    $(locationIdTag).append('<div class="location-name"><h5>Manager: <span class="branchManager btn btn-lg btn-outline-dark"  data-id="' + location['manager'] + '">' + managerName + '</span></h5></div>');
    $(locationIdTag).append('<div class="location-name"><h5>' + location['address'] +', ' + location['name'] + ', ' + location['postcode'] + '</h5></div>');
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
