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

function setTableData(tablesInput) {
  locations = tablesInput['locations'];
  departments = tablesInput['departments'];
  employees = tablesInput['employees'];
  locations.forEach(function(location) {
    $('#company-locations').append('<div id="location-' + location['name'] + '" class="border border-primary location"><div class="location-name"><h3>' + location['name'] + '</h3></div></div>');
    var locationIdTag = '#location-' + location['name'];
    departments.forEach(function(department){
      if (department['locationID'] === location['id']) {
        $(locationIdTag).append('<div id="department-' + department['id'] + '" class="location-department"><h4>' + department['name'] + '</h4>');
        var departmentIdTag = '#department-' + department['id'];
        employees.forEach(function(employee) {
          if (employee['departmentID'] === department['id']) {
            $(departmentIdTag).append( '<div class="employee-name" data-id=' + employee['id'] + '>' + employee['firstName'] + ' ' + employee['lastName'] + '</div>');
          }
        });
      }
    })
  })
}

$( document ).ready(function() {

  // getAllLocations(setLocations);
  //
  // getAllDepartments(setDepartments);

  getAllTables(setTableData)

});

export function getAllTables(callback) {
  $.ajax({
    url: "libs/php/getAllTables.php",
    type: 'POST',
    dataType: 'json',
    data: {

    },
    success: function(result) {

      if (result.status.name == "ok") {
        callback(result['data']);
        // var departments = result['data'];
        // callback(departments);
      }

    },
    error: function(jqXHR, textStatus, errorThrown) {
      console.log("Request failed");
    }
  });
}
