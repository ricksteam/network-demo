var express = require('express');
var app = express();

var port = 3002;

app.get((req, res)=>{
  res.send("response from lambda-two")
})

// Listen for requests
var server = app.listen(port, function() {
  console.log('Lambda Two API listening on port: ' + port);
});