var settings = require('./settings');


// This file is the list of messages that are sent to the client side

exports.showGetList = function (req, resp) {
    if (settings.httpMsgsFormat === "HTML") {
        resp.writeHead(200, { "Content-Type": "text/html" });
        resp.write("<html><html><head><title>Home</title></head><body>Valid endpoints:<br> /employees - GET - Made by PSB to fill in data</body></html>");
    } else {
        resp.writeHead(200, "Valid EndPoints", { "Content-Type": "application/json" });
        resp.write(JSON.stringify([{ url: "/kites", operation: "GET all kites", description: "Made by PSB to fill in data"}]));
    }
    resp.end();
};

// sends the data requested via JSON

exports.sendJson = function (req, resp, data) {
    resp.writeHead(200, { "Content-Type": "application/json" });

    if(data) {

      resp.writeHead(200, { "Content-Type": "text/html" });
      resp.write("<html><html><head><title>Home</title></head><body>Valid endpoints:<br> /kites - GET - Made by PSB to fill in data</body></html>");


  //    console.log(data);
  //    resp.write(JSON.stringify(data));
    }

    resp.end();
};
