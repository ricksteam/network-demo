var express = require('express');
var axios = require('axios')
var bodyParser = require('body-parser')
var path = require('path');
var app = express();

var port = 3000;

app.use(bodyParser.json())

app.use("/one", (req, res) => {
  let ulLat = Math.max(req.body.startLat, req.body.endLat);
  let lrLat = Math.min(req.body.startLat, req.body.endLat);
  let ulLon = Math.max(req.body.startLon, req.body.endLon);
  let lrLon = Math.min(req.body.startLon, req.body.endLon);


  let upperLeftLat = ulLat + 10;
  let upperLeftLon = ulLon + 10;
  let lowerRightLat = lrLat - 10;
  let lowerRightLon = lrLon - 10
  let dummyBounds = {
    upperLeftLat,
    upperLeftLon,
    lowerRightLat,
    lowerRightLon
  }

  let mapData = {}
  let fullRequest = {};

  axios.post("http://localhost:3000/two", dummyBounds)
    .then(r => {
      console.log(r.data);
      mapData = r.data.mapData;
      fullRequest = {bounds:dummyBounds, mapData, vehicles:req.body.vehicles};
      return axios.post("http://localhost:3000/three", fullRequest)
    })
    .then(r=>{
      let fromThree = r.data
      res.send({ responseFromThree: fromThree, responseFromOne: dummyBounds, responseFromTwo: mapData, sentToThree:fullRequest});
    })
    .catch(error => {
      console.error(error);
    })

})

app.use("/two", (req, res) => {
  //Do some data fusion
  dummyMapData = {
    nodes: [
      { id: 0, lat: 100, lon: 200, type: "road", maxWeight: 1_000, speedLimit: 50 },
      { id: 1, lat: 50, lon: 100, type: "bridge", maxWeight: 20, speedLimit: 25 },
      { id: 2, lat: 75, lon: 75, type: "bridge", maxWeight: 5, speedLimit: 40 },
      { id: 3, lat: 0, lon: -50, type: "road", maxWeight: 1_000, speedLimit: 65 },
    ],
    edgeList:[
      [0,1,3],
      [0,2,3]
    ]
  }
  res.send({mapData:dummyMapData})

})

app.use("/three", (req, res) => {
  fullRequest = req.body;

  //Do our analysis here

  fullResponse = [
    {vehicleId: 0, path:[0,1,3]},
    {vehicleId: 1, path:[0,2,3]}
  ]

  res.send(fullResponse);



})

app.use(express.static(path.join(__dirname, 'static')));

// Listen for requests
var server = app.listen(port, function () {
  console.log('HTML Server Loaded on Port: ' + port);
});