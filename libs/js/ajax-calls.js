
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

export function getEmployee(employeeId, callback) {

  console.log("Getting employee")

  $.ajax({
    url: "libs/php/getEmployee.php",
    type: 'POST',
    dataType: 'json',
    data: {
      id: employeeId
    },
    success: function(result) {

      console.log(result)
      if (result.status.name == "ok") {

        var employee = result['data'][0];
        callback(employee);

      }

    },
    error: function(jqXHR, textStatus, errorThrown) {
      console.log("Request failed");
    }
  });

}

export function updateEmployee(employeeId, departments, locations) {

  console.log("Update employee")

  $.ajax({
    url: "libs/php/getEmployee.php",
    type: 'POST',
    dataType: 'json',
    data: {
      id: employeeId
    },
    success: function(result) {

      console.log(result)
      if (result.status.name == "ok") {

        var employee = result['data'][0];

    		$("#informationModalLabel").html('Employee Update');
        $("#informationModalBody").html("");
        $("#informationModalBody").append('<table id="employeeTable" class="table">');

        $("#employeeTable").append('<tr><td><label for="fname">First name</label></td><td><input type="text" id="fname" name="fname" value="' + employee['firstName'] + '"></td></tr>');
        $("#employeeTable").append('<tr><td><label for="lname">Last Name</td><td><input type="text" id="lname" name="lname" value="' + employee['lastName'] + '"></td></tr>');
        $("#employeeTable").append('<tr><td><label for="title">Job Title</td><td><input type="text" id="title" name="title" value="' + employee['jobTitle'] + '"></td></tr>');
        $("#employeeTable").append('<tr><td><label for="email">Email</td><td><input type="email" id="email" name="email" value="' + employee['email'] + '"></td></tr>');
        $("#employeeTable").append('<tr><td><label for="department">Department</td><td><select id="department" name="department" value="' + employee['departmentID']  + '"></td></tr>');
        departments.forEach(function(department) {
          $("#department").append('<option value="' + department['id'] + '">' + department['name'] + '</option>');
        });
        $("#department").val(employee['departmentID']).change();
        $("#employeeTable").append('<tr><td><label for="location">Location</td><td><select id="location" name="location" value="' + employee['locationID'] + '"></td></tr>');
        locations.forEach(function(location) {
          $("#location").append('<option value="' + location['id']  + '">' + location['name'] + '</option>');
        });
        $("#location").val(employee['locationID']).change();

        // Add buttons to modal footer
        $('.modal-footer').html("");
        $('.modal-footer').append('<button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>')
        $('.modal-footer').append('<button type="button" class="btn btn-primary" id="employeeSaveUpdateButton" data-id="' + employee['id'] + '">Save Changes</button>')

        $('#informationModal').modal('show');

      }
    },
    error: function(jqXHR, textStatus, errorThrown) {
      console.log("Request failed");
    }
  });

}
