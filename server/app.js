var express = require('express');
var app = express();
var path = require('path');
var port = process.env.PORT || 8080;

app.use(express.static('public'));

var index = require('../routers/index');
app.use('/', index);
var employees = require('../routers/employees');
app.use('/employees', employees);
var tables = require('../routers/tables');
app.use('/tables', tables);


// spin up server
app.listen(port, function(){
  console.log('Server up on', port);
});


// -- ROUTES -- //
