'use strict';

var insert = require('./insert');
var httpMessages = require('./httpMessages');
var util = require('util');

// this is the same as the employee.js file from the example

exports.getList = function (req, resp){
        console.log('execting getlist');
    // insert call to insert.js here with the appropaiate SQL language

    insert.executeSql('SELECT * FROM brands', function(data, err){
          if (err) {
               httpMessages.showError(req, resp);
            }
            else {
              httpMessages.sendJson(req, resp, data);
            }
        });
};

exports.get = function (req, resp, name) {
  var sqlCommand = 'select * from brands where brand = "' + name + '";'

  insert.executeSql(sqlCommand, function(data, err){
        if (err) {
             httpMessages.showError(req, resp);
          }
          else {
            httpMessages.sendJson(req, resp, data);
          }
      });
};

exports.add = function (req, resp, reqBody) {
  try{
      if (!reqBody) throw new Error("Input not valid");
      var data = JSON.parse(reqBody);
      var sqlCommand = `INSERT INTO brands (brand, designer, country, description)
                VALUES ('${data.brand}',
                        '${data.designer}',
                        '${data.country}',
                        '${data.description}');`;

    //  console.log(sqlCommand);

      insert.executeSql (sqlCommand, function(data, err){

        if (err) {
             httpMessages.showError(req, resp);
          }
          else {
            httpMessages.sendJson(req, resp, data);
          }
      });

  }  catch (ex) {
    httpMessages.show404(req, resp, ex);
    }
};
