var express = require('express');
var app = express();

var port = 3003;

app.get((req, res)=>{
  res.send("response from lambda-three")
})

// Listen for requests
var server = app.listen(port, function() {
  console.log('Lambda Three API listening on port: ' + port);
});