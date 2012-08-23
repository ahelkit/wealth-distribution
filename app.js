var request = require("request");
var express = require("express");
var app = express.createServer();
var fs = require("fs");

app.use(express.bodyParser());
app.use(express.logger({ format: ':method :url' }));

app.use('/', express.static(__dirname + '/')); 
var port = process.env.PORT || 3000;
app.listen(port, function() {
  console.log("Listening on " + port);
});



