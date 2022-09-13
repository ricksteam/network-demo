var express = require('express');
var path = require('path');
var app = express();

var port = 3000;

app.get("/one", (req, res)=>{
  res.send({response:"Response from one"});
})

app.use(express.static(path.join(__dirname, 'static')));

// Listen for requests
var server = app.listen(port, function() {
  console.log('HTML Server Loaded on Port: ' + port);
});