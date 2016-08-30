var insert = require('./insert');
var httpMessages = require('./httpMessages');

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
  console.log(sqlCommand);

  insert.executeSql(sqlCommand, function(data, err){
        if (err) {
             httpMessages.showError(req, resp);
          }
          else {
            httpMessages.sendJson(req, resp, data);
          }
      });
};
