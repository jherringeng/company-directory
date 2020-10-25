
export function getAllDepartments(callback) {
  $.ajax({
    url: "libs/php/getAllDepartments.php",
    type: 'POST',
    dataType: 'json',
    data: {

    },
    success: function(result) {

      if (result.status.name == "ok") {
        var departments = result['data'];
        callback(departments);
      }

    },
    error: function(jqXHR, textStatus, errorThrown) {
      console.log("Request failed");
    }
  });
}

export function getAllLocations(callback) {
  $.ajax({
    url: "libs/php/getAllLocations.php",
    type: 'POST',
    dataType: 'json',
    data: {

    },
    success: function(result) {

      if (result.status.name == "ok") {
        var locations = result['data'];
        callback(locations);
      }

    },
    error: function(jqXHR, textStatus, errorThrown) {
      console.log("Request failed");
    }
  });
}
