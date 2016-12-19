var express = require('express');
var router = express.Router();
var path = require('path');
var pg = require('pg');

var connectionString = 'postgres://localhost:5432/eight_bit_database';

router.get('/allTables', function(req, res){
  var allTables = [];
  console.log('In GETallTables.');
  //connect to db
  pg.connect(connectionString, function(err, client, done) {
    if (err) {
      console.log(err);
    } else {
      console.log('Connected to database from GETallTables.');
      var query = client.query('SELECT * FROM tables');
      query.on('row', function(row){
        allTables.push(row);
      }); // end query
      query.on('end', function(){
        done();
        console.log(allTables);
        //send a response
        res.send({tableArray: allTables});
      });
    }
  });
});

module.exports = router;
