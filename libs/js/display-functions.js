export function displayEmployeeInfoModal(employee) {

    $("#informationModalLabel").html('Employee Information');
    $("#informationModalBody").html("");
    $("#informationModalBody").append('<table id="employeeTable" class="table">');
    $("#employeeTable").append('<tr><td>First Name</td><td>' + employee['firstName'] + '</td></tr>');
    $("#employeeTable").append('<tr><td>Last Name</td><td>' + employee['lastName'] + '</td></tr>');
    $("#employeeTable").append('<tr><td>Job Title</td><td>' + employee['jobTitle'] + '</td></tr>');
    $("#employeeTable").append('<tr><td>Email</td><td>' + employee['email'] + '</td></tr>');
    $("#employeeTable").append('<tr><td>Department</td><td>' + employee['department'] + '</td></tr>');
    $("#employeeTable").append('<tr><td>Based at</td><td>' + employee['baseLocationName'] + '</td></tr>');
    $("#employeeTable").append('<tr><td>Location</td><td>' + employee['location'] + '</td></tr>');
    $("#employeeTable").append('<tr><td>Status</td><td>' + employee['statusName'] + '</td></tr>');

    var employeeName = employee['firstName'] + ' ' + employee['lastName'];

    // Add buttons to modal footer
    $('.modal-footer').html("").show();
    $('.modal-footer').append('<button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>');
    $('.modal-footer').append('<button type="button" class="btn btn-danger" id="employeeDeleteButton" data-id="' + employee['id'] + '" data-name="' + employeeName + '">Delete</button>');
    $('.modal-footer').append('<button type="button" class="btn btn-primary" id="employeeUpdateButton" data-id="' + employee['id'] + '">Update</button>')

    $('#informationModal').modal('show');

}

export function deleteEmployeeModal(employeeId, employeeName) {
  console.log("Confirm delete employee")
  $("#confirmationModalLabel").html('Delete employee ' + employeeName + ' ?');
  $("#confirmationModalBody").html("");

  // Add buttons to modal footer
  $('#confirmationModalFooter').html("");
  $("#confirmationModalFooter").append('<button id="confirmDeleteEmployee" type="button" class="btn btn-danger float-right" data-dismiss="modal" data-id="' + employeeId + '">Confirm</button>');
  $("#confirmationModalFooter").append('<button type="button" class="btn btn-secondary float-right" data-dismiss="modal">Cancel</button>');
  $('#modal-footer').show();

  $('#confirmationModal').modal('show');
}
