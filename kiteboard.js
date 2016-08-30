'use strict';

var insert = require('./insert');
var httpMessages = require('./httpMessages');
var util = require('util');

// this is the same as the employee.js file from the example

exports.showYelp = function (req, resp, reqBody){
  try {

    if (!reqBody) throw new Error("Input not valid");
    //var data = JSON.parse(reqBody);

    console.log('kiteboard' + reqBody);

    httpMessages.sendJson(req, resp, reqBody);
  }
  catch(ex) {
    httpMessages.show404 (req, resp, ex);
  }
};


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

      if (data.brand === ''){
             httpMessages.showError(req, resp);
      } else{
      var sqlCommand = `INSERT INTO brands (brand, designer, country, description)
                VALUES ('${data.brand}',
                        '${data.designer}',
                        '${data.country}',
                        '${data.description}');`;

      insert.executeSql (sqlCommand, function(data, err){

        if (err) {
             httpMessages.showError(req, resp);
          }
          else {
            httpMessages.sendJson(req, resp, data);
          }
      });
    }
  }  catch (ex) {
    httpMessages.show404(req, resp, ex);
    }
};

exports.delete = function (req, resp, reqBody){
  try {
      if (!reqBody) {
          throw new Error('Input Not Valid!');
      }

      var data = JSON.parse(reqBody);

      if (data.name === ''){
        httpMessages.showError(req, resp);
      } else {

        let sqlCommand = `DELETE FROM brands WHERE brand = '${data.brand}';`;

        insert.executeSql(sqlCommand, function(data, err){

          if (err) {
               httpMessages.showError(req, resp);
            }
            else {
              httpMessages.sendJson(req, resp, data);
            }
          });
      }
  } catch (ex) {
    httpMessages.show404 (req, resp, ex);
  }
};
