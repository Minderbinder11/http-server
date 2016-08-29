var http = require('http');
var settings = require('./settings');
var kiteboard = require('./kiteboard');
var httpMessages = require('./httpMessages');

http.createServer(function(req, resp){

  switch(req.method){

    case 'GET':
          if (req.url === '/'){

            console.log('root page ' + settings.httpMsgsFormat)
            httpMessages.showRoot(req, resp);

          } else if (req.url === "/kites") {

            console.log('In the /kites get');
            kiteboard.getList(req, resp);

          } else {
            var namePattern = "[0-9a-zA-Z]";
            var pattern = new RegExp("/kites/" + namePattern);

              if (pattern.test(req.url)) {


                  var patt = new RegExp(namePattern);
                  var kiteName = patt.exec(req.url);


                  console.log('The variable kiteNames value is : ' +  kiteName);
                  kiteboard.get(req, resp, "'North'");
              }
              else {
                  httpMessages.show404(req, resp);
              }
          }


      break;

    case 'POST':
      break;

    default:
      httpMessages.show405(req, resp);
      break;
  }
}).listen(settings.webPort, function(){console.log('My first webserver up and running on port; ' + settings.webPort);});
