var express = require('express');
var router = express.Router();
var path = require('path');
var pg = require('pg');
var bodyParser = require('body-parser');
var urlEncodedParser = bodyParser.urlencoded({extended:true});

var connectionString = 'postgres://localhost:5432/eight_bit_database';

router.post('/addEmployee', urlEncodedParser, function(req, res){
  console.log('In addEmployee. Employee to add: ', req.body);
  //connect to db
  pg.connect(connectionString, function(err, client, done) {
    if (err) {
      console.log(err);
    } else {
      console.log('Connected to database from addEmployee.');
      client.query('INSERT INTO employees (first_name, last_name) VALUES ($1, $2);', [req.body.first_name, req.body.last_name]);
      done();
      res.send({response: 'addEmployee Complete.'});
    }
  });
});

router.get('/allEmployees', function(req, res){
  var allEmployees = [];
  console.log('In GETallEmployees.');
  //connect to db
  pg.connect(connectionString, function(err, client, done) {
    if (err) {
      console.log(err);
    } else {
      console.log('Connected to database from GETallEmployees.');
      var query = client.query('SELECT * FROM employees');
      query.on('row', function(row){
        allEmployees.push(row);
      }); // end query
      query.on('end', function(){
        done();
        console.log(allEmployees);
        //send a response
        res.send({employeeArray: allEmployees});
      });
    }
  });
});

module.exports = router;
