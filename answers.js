var express = require('express');
var router = express.Router();
var path = require("path");
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
var fs = require('fs');
var chokidar = require('chokidar');

router.get('/answers/:id/:submission', function(req, res) {
  var id = req.params.id;
  var submission = req.params.submission;
  var DIR_PATH = './' + id + '/' + submission;

  fs.readdir(DIR_PATH, function (err, files) {
    if (err) {
      console.log("Error reading files: ", err);
    } else {
      sendLogs(res, files, DIR_PATH);
    }
  });
});

router.post('/answers/:id/:submission', jsonParser, function (req, res) {
  var id = req.params.id;
  var submission = req.params.submission;
  var DIR_PATH = './' + id + '/' + submission;
  createDir(DIR_PATH, id);
  appendPath(id);
  createEntry(DIR_PATH, req);

  res.send('File received ' + req.body);
});

function sendLogs(res, files, DIR_PATH){
  var answers = [];
  for (var counter = 0; counter < files.length; counter++){
    var answer = fs.readFileSync(DIR_PATH + '/' + files[counter],  "utf-8");
    answers.push(JSON.parse(answer));
  }
  res.send(answers);
}

function createDir(DIR_PATH, id){
  fs.stat('./' + id, function (err) {
    if (err) {
      fs.mkdirSync('./' + id);
    }
  });
  fs.stat(DIR_PATH, function (err) {
    if (err) {
      fs.mkdirSync(DIR_PATH);
    }
  });
}

function createEntry(DIR_PATH, req){
  var random = Math.floor((Math.random() * 1000) + 1);
  var dateNow = Date.now();
  var file = DIR_PATH + '/' + dateNow + '-' + random + '.json';
  fs.writeFile(file, JSON.stringify(req.body), function (error) {
    if (error) {
      fs.writeFileSync(file, JSON.stringify(req.body));
    }
  });
}

function appendPath(id){
  var watcher = chokidar.watch('./' + id + '/' + 'stress-logs', {
    ignored: /[\/\\]\./, persistent: true, ignoreInitial: false
  });
  watcher.on('change', function(path) {
    var stressLog = fs.readFileSync(path,  "utf-8");
    var entryJSON = JSON.parse(stressLog);
    entryJSON["logEntry"] = path;
    var entry = JSON.stringify(entryJSON);
    fs.writeFileSync(path, entry);
    watcher.unwatch('./' + id + '/' + 'stress-logs');
  });
}

module.exports = router;