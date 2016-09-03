'use strict';

var settings = require('./settings');
var apiYelp = require('./apiOpenYelp');

// Greeting at the entry point to the database
exports.showRoot = function(req, resp){

  if (settings.httpMsgsFormat === "HTML") {
      resp.writeHead(200, { "Content-Type": "text/html" });
      resp.write(`<html>
                      <head>
                        <title>Kite Home Page</title>
                      </head>
                      <body>Welcome to my Kite Database Homepage:<br>
                            Here are some places you can go to work with the database: <br>
                            /kites - GET - gets a list of all of the data in the site
                            /kites - POST - puts a new record into the databaseS
                      </body>
                  </html>`);
  } else {
      resp.writeHead(200, "Valid EndPoints", { "Content-Type": "application/json" });
      resp.write(JSON.stringify([{ url: "/kites", operation: "GET all kites", description: "Made by PSB to fill in data"}]));
  }
  resp.end();

};

// This file is the list of messages that are sent to the client side
exports.showError = function (req, resp) {
    if (settings.httpMsgsFormat === "HTML") {
        resp.writeHead(200, { "Content-Type": "text/html" });
        resp.write(`<html>
                        <head>
                          <title>Kite Home Page</title>
                        </head>
                        <body>This is the error message:<br> Something went wrong with the SQL statement
                        </body>
                    </html>`);
    } else {
        resp.writeHead(200, "Valid EndPoints", { "Content-Type": "application/json" });
        resp.write(JSON.stringify([{ url: "/kites", operation: "Error Message", description: "Something went wrong with the SQL statement"}]));
    }
    resp.end();
};

// sends the data requested via JSON
exports.sendJson = function (req, resp, data) {

    resp.writeHead(200, "Valid EndPoints", { "Content-Type": "application/json" });
    console.log('(10) In the httpMessages');
    resp.write(JSON.stringify(data));
    resp.end();
  };






// This in the case that a request gets sent to the server that is not currently supported, and I need to call an error on it.
exports.show404 = function (req, resp) {
    if (settings.httpMsgsFormat === "HTML") {
        resp.writeHead(404, "Resource Not Found", { "Content-Type": "text/html" });
        resp.write(`<html>
                      <head>
                        <title> 404 Resource Not Found </title>
                        </head>
                      <body> 404 Resource Not Found </body>
                    </html>`);
    } else {
        resp.writeHead(404, "Resource Not Found", { "Content-Type": "application/json" });
        resp.write(JSON.stringify({ data: "Resource Not Found." }));
    }

    resp.end();
};

// This in the case that a request gets sent to the server that is not currently supported, and I need to call an error on it.
exports.show405 = function (req, resp) {
    if (settings.httpMsgsFormat === "HTML") {
        resp.writeHead(405, "Method not supported", { "Content-Type": "text/html" });
        resp.write(`<html>
                      <head>
                        <title> 405 Method Not supported </title>
                      </head>
                      <body>405: Method not supported </body>
                    </html>`);
    } else {
        resp.writeHead(405, "Method not supported", { "Content-Type": "application/json" });
        resp.write(JSON.stringify({ data: "Method not supported." }));
    }

    resp.end();
};

// This in the case that a request gets sent to the server that is not currently supported, and I need to call an error on it.
exports.show413 = function (req, resp) {
    if (settings.httpMsgsFormat === "HTML") {
        resp.writeHead(413, "Request Too Large" , { "Content-Type": "text/html" });
        resp.write(`<html>
                      <head>
                        <title> 413 Resource Too Large </title>
                        </head>
                      <body> 413 You have exceeded the size limit for data upload</body>
                    </html>`);
    } else {
        resp.writeHead(413, "Request Too Large", { "Content-Type": "application/json" });
        resp.write(JSON.stringify({ data: "413 Too Much Data" }));
    }

    resp.end();
};
