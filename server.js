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

            console.log('(1) : before call to get Yelp URL');

            var urlYelp = yelp({location: 'San+Francisco', limit: '2' , category_filter: 'pizza'},  function(err, data){
              if (!err){
                  console.log('(2) : ' + data);
              }
            });

            console.log('(2) : after call to get Yelp URL. URL is : ' + urlYelp);

            request(urlYelp, function (error, response, htmlString) {
                if (!error && response.statusCode == 200) {

                console.log('(3) return from Yelp ' + htmlString); // Show the HTML for the Modulus homepage.
                resp.writeHead(200, "Valid EndPoints", { "Content-Type": "application/json" });
                resp.write(htmlString);
                resp.end();
                }
              });

              console.log('(4) After call to Yelp');
          }else if (req.url === '/'){
            httpMessages.showRoot(req, resp);
          } else if (req.url === "/kites") {
            kiteboard.getList(req, resp);
          } else {
            var patt2 = /^[a-z0-9\/]+$/;

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
        var reqBody = '';

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
        var reqBody = '';

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
