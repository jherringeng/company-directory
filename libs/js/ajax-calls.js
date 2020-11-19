export function getAllTables(callback) {
  $.ajax({
    url: "libs/php/getAllTables.php",
    type: 'POST',
    dataType: 'json',
    data: {

    },
    success: function(result) {

      if (result.status.name == "ok") {
        console.log(result['data'])
        callback(result['data']);
      }

    },
    error: function(jqXHR, textStatus, errorThrown) {
      console.log("Request failed");
    }
  });
}

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

export function updateEmployee(employeeId, departments, locations, statuses) {

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

        var employeeBaseDepartment = $.grep(departments, function(department){return department.id ===  employee['departmentID'];})[0];

    		$("#informationModalLabel").html('Employee Update');
        $("#informationModalBody").html("");

        $('.modalForm').attr("id","updateEmployeeModalForm");
        $('.modalForm').attr("data-id", employee['id'] );

        $("#informationModalBody").append('<table id="employeeTable" class="table">');

          $("#employeeTable").append('<tr><td><label for="fname">First name</label></td><td><input type="text" id="fname" name="fname" value="' + employee['firstName'] + '" required></td></tr>');
          $("#employeeTable").append('<tr><td><label for="lname">Last Name</td><td><input type="text" id="lname" name="lname" value="' + employee['lastName'] + '" required></td></tr>');
          $("#employeeTable").append('<tr><td><label for="title">Job Title</td><td><input type="text" id="title" name="title" value="' + employee['jobTitle'] + '" required></td></tr>');
          $("#employeeTable").append('<tr><td><label for="email">Email</td><td><input type="email" id="email" name="email" value="' + employee['email'] + '" required></td></tr>');

          $("#employeeTable").append('<tr><td><label for="department">Department</td><td><select id="department" name="department" value="' + employee['departmentID']  + '"></td></tr>');
            departments.forEach(function(department) {
              $("#department").append('<option value="' + department['id'] + '">' + department['name'] + '</option>');
            });
          $("#department").val(employee['departmentID']).change();

          $("#employeeTable").append('<tr><td>Based at</td><td>' + employeeBaseDepartment['location']  + '</td></tr>');

          $("#employeeTable").append('<tr><td><label for="location">Location</td><td><select id="location" name="location" value="' + employee['locationID'] + '"></td></tr>');
            locations.forEach(function(location) {
              $("#location").append('<option value="' + location['id']  + '">' + location['name'] + '</option>');
            });
          $("#location").val(employee['currentLocationID']).change();

          $("#employeeTable").append('<tr><td><label for="status">Status</td><td><select id="status" name="status" value="' + employee['status'] + '"></td></tr>');
            statuses.forEach(function(status) {
              $("#status").append('<option value="' + status['id']  + '">' + status['name'] + '</option>');
            });
          $("#status").val(employee['status']).change();


        $("#location").val(employee['locationID']).change();

        // Add buttons to modal footer
        $('.modal-footer').html("").show();

          $(".modal-footer").append('<input type="submit" class="btn btn-primary float-right">');
          $('.modal-footer').append('<button id="promoteEmployeeModal" type="button" class="btn btn-secondary float-right" data-id="' + employee['id'] + '">Promote</button>');
          $(".modal-footer").append('<button type="button" class="btn btn-secondary float-right" data-dismiss="modal">Close</button>');

        $('#informationModal').modal('show');

      }
    },
    error: function(jqXHR, textStatus, errorThrown) {
      console.log("Request failed");
    }
  });

}


export function employeeSaveUpdate(employeeId, modalCallback, updateCallback, displayCallback) {
  console.log("Saving update to employee")
  console.log($('#location').val())

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
      locationId: $('#location').val(),
      status: $('#status').val(),
    },
    success: function(result) {

      if (result.status.name == "ok") {

        console.log("Updated Employee")
        var employee = result['data'][0];
        modalCallback(employee);

        // $('#employee' + employee['id']).html(employee['firstName'] + ' ' + employee['lastName'])
        updateCallback(displayCallback)

      }

    },
    error: function(jqXHR, textStatus, errorThrown) {
      console.log("Request failed");
    }
  });
}

export function promoteEmployeeModal(employeeId, departments, locations) {
  $("#informationModalLabel").html('Employee Promotion');
  $("#informationModalBody").html("");

  $('.modalForm').attr("id","promoteEmployeeModalForm");
  $('.modalForm').attr("data-id", employeeId );

  $("#informationModalBody").append('<table id="employeeTable" class="table">');

  $("#employeeTable").append('<tr><td><label for="managerTier">Promote to: </td><td><select id="managerTier" name="managerTier" value=""></td></tr>')

    $("#managerTier").append('<option value="depManager">Department Manager</option>');
    $("#managerTier").append('<option value="locManager">Location Manager</option>');

  $("#employeeTable").append('<tr id="locationManagerRow"><td><label for="locationManager">Available locations: </td><td><select id="locationManager" name="locationManager" value=""></td></tr>');
    locations.forEach(function(location) {
      if (location['manager'] == null && location['id'] > 0) {
        $("#locationManager").append('<option value="' + location['id']  + '" name="' + location['name'] + '" required>' + location['name'] + '</option>');
      }

    });

  $('#locationManagerRow').hide();

  $("#employeeTable").append('<tr id="departmentManagerRow"><td><label for="departmentManager">Available Departments: </td><td><select id="departmentManager" name="departmentManager" value=""></td></tr>');
    departments.forEach(function(department) {
      if (department['departmentManager'] == null) {
        $("#departmentManager").append('<option value="' + department['id']  + '" name="' + department['name'] + '" required>' + department['name'] + '</option>');
      }

    });

  $('.modal-footer').html("").show();

    $(".modal-footer").append('<input type="submit" class="btn btn-primary float-right">');
    $(".modal-footer").append('<button type="button" class="btn btn-secondary float-right" data-dismiss="modal">Close</button>');

  $('#informationModal').modal('show');

}

export function promoteEmployee(employeeId, modalCallback, updateCallback, displayCallback) { //
  console.log("Promoting employee")

  var jobTier;

  if ( $('#managerTier').val() == 'depManager') {
    jobTier = 3;
  } else {
    jobTier = 2;
  }

  var departmentName = $('#departmentManager').find('option:selected').attr("name");
  var locationName = $('#locationManager').find('option:selected').attr("name");

  var department = parseInt($('#departmentManager').val());
  var location = parseInt($('#locationManager').val());

  $.ajax({
    url: "libs/php/promoteEmployee.php",
    type: 'POST',
    dataType: 'json',
    data: {
      id: employeeId,
      promoteTo: $('#managerTier').val(),
      department: department,
      location: location,
      departmentName: departmentName,
      locationName: locationName,
      jobTier: jobTier
    },
    success: function(result) {

      if (result.status.name == "ok") {

        console.log("Promoted Employee")
        console.log(result)
        var employee = result['data'][0];
        console.log(employee)
        // getEmployee(employeeId, modalCallback)
        modalCallback(employee)

        updateCallback(displayCallback)

      }

    },
    error: function(jqXHR, textStatus, errorThrown) {
      console.log("Request failed: " + textStatus + ' ' + errorThrown);
      console.warn(jqXHR.responseText)
    }
  });
}

export function deleteEmployee(employeeId, updateCallback, displayCallback) {
  console.log("Deleting employee")

  $.ajax({
    url: "libs/php/deleteEmployeeByID.php",
    type: 'POST',
    dataType: 'json',
    data: {
      id: employeeId
    },
    success: function(result) {

      if (result.status.name == "ok") {

        console.log("Deleted Employee")

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
