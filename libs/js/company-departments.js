import { getAllTables, getEmployee, updateEmployee, employeeSaveUpdate} from './ajax-calls.js';
import { displayEmployeeInfoModal } from './display-functions.js';

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
    $('#' + departmentIdTag).append('<div class="department-name"><h3>' + department['name'] + '</h3></div>');

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
