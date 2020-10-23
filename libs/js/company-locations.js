import {getAllDepartments, getAllLocations} from './ajax-calls.js';

var employees, departments, locations;

$( document ).ready(function() {

  locations = getAllLocations();

  departments = getAllDepartments();

});

function getAllDepartments() {
  $.ajax({
    url: "libs/php/getAllDepartments.php",
    type: 'POST',
    dataType: 'json',
    data: {

    },
    success: function(result) {

      if (result.status.name == "ok") {
        console.log(result['data']);
        departments = result['data'];

      }

    },
    error: function(jqXHR, textStatus, errorThrown) {
      console.log("Request failed");
    }
  });
}
