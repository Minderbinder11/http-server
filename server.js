'use strict';

var http = require('http');
var settings = require('./settings');
var kiteboard = require('./kiteboard');
var httpMessages = require('./httpMessages');
var URL = require('url-parse');

http.createServer(function(req, resp){



  switch(req.method){

    //console.log(req);

    case 'GET':
          if (req.url === '/'){

            console.log('root page ' + settings.httpMsgsFormat)
            httpMessages.showRoot(req, resp);



          } else if (req.url === "/kites") {

            console.log('In the /kites get');
            kiteboard.getList(req, resp);

          } else {

            var namePattern = "/_~`-.,!@#$%^&*();\/{}[]|<>'/";
            var pattern = new RegExp("/kites/" + namePattern);

            console.log()
            if (! pattern.test(req.url)) {
                var split = req.url.split('/');
                var name = split[split.length - 1];
                name = name.toLowerCase();
                name = name.charAt(0).toUpperCase() + name.slice(1);

                  console.log('The variable kiteNames value is : ' +  name);
                  kiteboard.get(req, resp, name);
              }
              else {

                  httpMessages.show404(req, resp);
              }
          }


      break;

    case 'POST':
      break;

    default:
      console.log('bottom one');
      httpMessages.show405(req, resp);
      break;
  }
}).listen(settings.webPort, function(){console.log('My first webserver up and running on port; ' + settings.webPort);});
