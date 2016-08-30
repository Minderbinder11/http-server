//'use strict';

var http = require('http');
var settings = require('./settings');
var kiteboard = require('./kiteboard');
var httpMessages = require('./httpMessages');
var URL = require('url-parse');
var yelp = require('./apiOpenYelp');
var request = require('request');

http.createServer(function(req, resp){

  switch(req.method){

    case 'GET':
          if (req.url === '/yelp'){

            var reqBody = '';

            var urlYelp =   yelp({ term: 'food', location: 'Montreal', limit: 3 }, function (error, resp, data){
              if (error){
                httpMessages.showError(req, resp, error);
              }
            });

            request.get(urlYelp, function (err, res, body){
                if (err){
                  httpMessages.showError(req, resp, error);
                }else{
                  kiteboard.showYelp(req, response, body);
                  console.log(body);
                }
              });

            });
            .on('error', function(err){console.error(err);})
            .on('data', function(data){
                reqBody += data;
                console.log('on data'); //
                  if (reqBody.length > 1e7) { //10MB
                      httpMessages.show413(req, resp);
                    }
                  })
              .on('end', function(){
                console.log('in switch on server ' + reqBody );
                kiteboard.showYelp(req, resp, reqBody);
            });

          }

          if (req.url === '/'){
            httpMessages.showRoot(req, resp);
          } else if (req.url === "/kites") {
            kiteboard.getList(req, resp);
          } else {
            let patt2 = /^[a-z0-9\/]+$/;

            if (!req.url.search(patt2)) {
                var split = req.url.split('/');
                var name = split[split.length - 1];
                name = name.toLowerCase();
                name = name.charAt(0).toUpperCase() + name.slice(1);
                kiteboard.get(req, resp, name);
              } else {
                  httpMessages.show404(req, resp);
              }
            }
      break;

    case 'POST':

      if(req.url === '/kites'){
        let reqBody = '';

        req.on('data', function (data) {
            reqBody += data;
            if (reqBody.length > 1e7) { //10MB
                httpMessages.show413(req, resp);
            }
        });

        req.on('end', function () {
            kiteboard.add(req, resp, reqBody);
        });

      } else {
        httpMessages.show404(req, resp);
      }
      break;

    case 'DELETE':
      if(req.url === '/kites'){
        let reqBody = '';

        req.on('data', function (data) {
            reqBody += data;
            if (reqBody.length > 1e7) { //10MB
                httpMessages.show413(req, resp);
            }
        });

        req.on('end', function () {
            kiteboard.delete(req, resp, reqBody);
        });
      } else {
        httpMessages.show404(req, resp);
      }
      break;
    default:
      console.log('bottom one');
      httpMessages.show405(req, resp);
      break;
  }
}).listen(settings.webPort, function(){console.log('My first webserver up and running on port; ' + settings.webPort);});
