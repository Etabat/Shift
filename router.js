var express = require('express');
var router = express.Router();
var path = require("path");
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
var fs = require('fs');
router.get('/answers/:id', function(req, res) {
  var id = req.params.id;
  console.log('Router.get received your request');
  fs.readdir('./' + id, function (err, files) {
    if (err) {
      console.log("Error reading files: ", err);
    } else {
      var answers = [];
      files.forEach(function(file){
        console.log(file);
      });
      for (var counter = 0; counter < files.length; counter++){
        var answer = fs.readFileSync(__dirname + '/' + id + '/' + files[counter],  "utf-8");
        answers.push(JSON.parse(answer))
      }
      res.send(answers);
    }
  });
});
router.post('/answers/:id', jsonParser, function (req, res) {
  console.log('hello world');
  var id = req.params.id;
  fs.stat('./' + id, function (err, stats) {
    if (err) {
      fs.mkdirSync('./' + id);
    }
    console.log(stats);
  });
  var random = Math.floor((Math.random() * 1000) + 1);
  var dateNow = Date.now();
  //var dateScan = new Date().toDateString();
  var PATH_NAME = __dirname;
  fs.writeFile(PATH_NAME + '/' + id + '/' + dateNow + ':' + random + '.json', JSON.stringify(req.body), function (error) {
    if (error) {
      fs.writeFileSync(PATH_NAME + '/' + id + '/' + dateNow + ':' + random + '.json', JSON.stringify(req.body));
    }
  });
  res.send('File received ' + req.body);
});
router.get('/', function(req, res){
  res.send("GOT IT");
});
module.exports = router;
//// piping the data
//var readable = getReadableStreamSomehow();
//readable.on('data', function(chunk) {
//    console.log('got %d bytes of data', chunk.length);
//});
//readable.on('end', function() {
//    console.log('there will be no more data.');
//});

// watch stream and see any changes
// get the file changes and send the captured file path to redirect
// check out https://www.npmjs.com/package/send
