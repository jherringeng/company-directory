import { getAllTables, getEmployee, updateEmployee, employeeSaveUpdate} from './ajax-calls.js';
import { displayEmployeeInfoModal } from './display-functions.js';

var employees, departments, locations;

$( document ).ready(function() {

  getAllTables(displayDepartmentPageData)

});

// Callback for getAllTables sets and displays locations, departments and employees
function displayDepartmentPageData(tablesInput) {
  // Set global variables
  locations = tablesInput['locations'];
  console.log(locations)
  departments = tablesInput['departments'];
  console.log(departments)
  employees = tablesInput['employees'];

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
    $('#' + departmentIdTag).append('<h5>Manager: ' + managerName + '</h5><h5>' + department['location'] + '</h5></div>');

    // Button to toggle dropdown
    $('#' + departmentIdTag).append('<button data-toggle="collapse" data-target="#' + departmentEmployeesIdTag + '" class="btn btn-info department-show-employees">Show Employees</button>');
    // Creates dropdown for containing employees
    var departmentEmployeesIdTag = 'department-employees' + department['id'];
    $('#' + departmentIdTag).append('<div id="' + departmentEmployeesIdTag + '" class="department-employees collapse">');
    employees.forEach(function(employee) {
      if (employee['departmentID'] === department['id']) {
        $('#' + departmentEmployeesIdTag).append( '<div id="employee' + employee['id'] + '" class="employee-name btn btn-outline-dark" data-id=' + employee['id'] + '>' + employee['firstName'] + ' ' + employee['lastName'] + '</div>');
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
  updateEmployee(employeeId, departments, locations);
});

$(document).on('submit', '#updateEmployeeModalForm', function () {
  var employeeId = $(this).data("id");
  employeeSaveUpdate(employeeId, displayEmployeeInfoModal);
});
