var http = require('http');
var settings = require('./settings');
var kiteboard = require('./kiteboard');
var httpMessages = require('./httpMessages');

http.createServer(function(req, resp){

  switch(req.method){

    case 'GET':
          if (req.url === "/kites") {
            console.log('In the /kites get');
            kiteboard.getList(req, resp);
            }
      break;
    case 'POST':
      break;
    default:
      break;
  }
}).listen(settings.webPort, function(){
  console.log('My first webserver up and running on port; ' + settings.webPort);
});
