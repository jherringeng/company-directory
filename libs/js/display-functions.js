export function displayEmployeeInfoModal(employee) {

    $("#informationModalLabel").html('Employee Information');
    $("#informationModalBody").html("");
    $("#informationModalBody").append('<table id="employeeTable" class="table">');
    $("#employeeTable").append('<tr><td>First Name</td><td>' + employee['firstName'] + '</td></tr>');
    $("#employeeTable").append('<tr><td>Last Name</td><td>' + employee['lastName'] + '</td></tr>');
    $("#employeeTable").append('<tr><td>Job Title</td><td>' + employee['jobTitle'] + '</td></tr>');
    $("#employeeTable").append('<tr><td>Email</td><td>' + employee['email'] + '</td></tr>');
    $("#employeeTable").append('<tr><td>Department</td><td>' + employee['department'] + '</td></tr>');
    $("#employeeTable").append('<tr><td>Location</td><td>' + employee['location'] + '</td></tr>');

    // Add buttons to modal footer
    $('.modal-footer').html("");
    $('.modal-footer').append('<button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>')
    $('.modal-footer').append('<button type="button" class="btn btn-primary" id="employeeUpdateButton" data-id="' + employee['id'] + '">Update</button>')

    $('#informationModal').modal('show');

}

export function displayEmployeeUpdateModal(employee) {

}
