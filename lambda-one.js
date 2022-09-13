var express = require('express');
var app = express();

var port = 3001;

app.get((req, res)=>{
  res.send("response from lambda-one")
})

// Listen for requests
var server = app.listen(port, function() {
  console.log('Lambda One API listening on port: ' + port);
});