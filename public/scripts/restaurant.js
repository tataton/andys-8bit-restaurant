console.log('js');

//-- GLOBAL ARRAYS --//

var tables = [];
var employees = [];

var refreshDisplay = function(){
  var getAllEmployees = $.get('/employees/allEmployees', function(responseObject){
    console.log('Employee AJAX GET success. Employees: ', responseObject);
    employees = responseObject.employeeArray;
  });
  var getAllTables = $.get('/tables/allTables', function(responseObject){
    console.log('Table AJAX GET success. Tables: ', responseObject);
    tables = responseObject.tableArray;
  });
  $.when(getAllEmployees, getAllTables).done(function(){
    displayEmployees();
    displayTables();
  });
};

$(document).ready(function(){
  console.log('JQ');
  refreshDisplay();
});

var displayEmployees = function(){
  console.log('In displayEmployees. employees:', employees);
  document.getElementById('employeesOutput').innerHTML = '<ul>';
  // loop through the tables array and display each table
  for(i = 0; i < employees.length; i++){
    var line = employees[i].first_name + " " + employees[i].last_name + ', id: ' + employees[i].id;
    // add line to output div
    document.getElementById('employeesOutput').innerHTML += '<li>' + line + '</li>';
  }
  document.getElementById('employeesOutput').innerHTML += '</ul>';
}; // end listEmployees

var displayTables = function(){
  console.log("In displayTables. Tables:", tables);
  // target our output div
  document.getElementById('tablesOutput').innerHTML = '';
  // loop through the tables array and display each table
  // select to assign a server to this table
  var selectText = '<select>';
  for (var i = 0; i < employees.length; i++) {
    selectText+= '<option value=' + i + '>'+ employees[i].first_name + ' ' + employees[i].last_name + '</option>';
  }
  selectText += '</select>';
  // display employees
  for(i = 0; i < tables.length; i++){
    // status is a button that, when clicked runs cycleStatus for this table
    var line = tables[i].name + " - capacity: " + tables[i].capacity + ', server: ' + selectText + ', status: <button onClick="cycleStatus(' + i + ')">' + tables[i].status + "</button>";
    // add line to output div
    document.getElementById('tablesOutput').innerHTML += '<p>' + line + '</p>';
  }
}; // end listTables

var createEmployee = function(){
  console.log('In createEmployee.');
  // get user input
  var employeeFirstName = document.getElementById( 'employeeFirstNameIn' ).value;
  var employeeLastName = document.getElementById( 'employeeLastNameIn' ).value;
  // create object for employee
  var newEmployee = {
    first_name: employeeFirstName,
    last_name: employeeLastName
  }; // end object
  // Send to employee database
  $.post('/employees/addEmployee', newEmployee, function(){
    console.log('Employee AJAX POST success.');
  }).done(refreshDisplay);
}; // end createEmployee

var createTable = function(){
  console.log('In createTable.');
  // get user input
  var tableName = document.getElementById('nameIn').value;
  var tableCapacity = document.getElementById('capacityIn').value;
  // table object for new table
  var newTable = {
    name: tableName,
    capacity: tableCapacity,
    employee_id: -1,
    status: 'empty'
  };
  // push new obejct into tables array
  $.post('/tables/addTable', newTable, function(){
    console.log('Employee AJAX POST success.');
  }).done(refreshDisplay);
}; // end createTable

/*

var cycleStatus = function( index ){
  console.log( 'in cycleStatus: ' + index );
  // move table status to next status
  switch( tables[index].status ){
    case  'empty':
        tables[index].status = 'seated';
        break;
    case  'seated':
        tables[index].status = 'served';
        break;
    case  'served':
        tables[index].status = 'dirty';
        break;
    default:      // includes case 'dirty'
      tables[index].status = 'empty';
  }
  // show tables on DOM
  listTables();
}; // end cycleStatus

*/
