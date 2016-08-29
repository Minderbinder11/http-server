var insert = require('./insert');
var httpMessages = require('./httpMessages');

// this is the same as the employee.js file from the example

exports.getList = function (req, resp){
        console.log('execting getlist');
    // inser call to insert.js here with the appropaiate SQL language
    insert.executeSql('SELECT * FROM brands', function(data, err){
          if (err) {
               // httpMessages - small library for calling the HTML and JSON responses
               httpMessages.showGetList(req, resp);
            }
            else {
              httpMessages.sendJson(req, resp, data);
            }
        });
};
