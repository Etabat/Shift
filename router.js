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
  console.log('Router.get received your request');
  fs.readdir('./' + id + '/' + submission, function (err, files) {
    if (err) {
      console.log("Error reading files: ", err);
    } else {
      var answers = [];
      files.forEach(function(file){
        console.log('this is the file: ' + file);
      });
      for (var counter = 0; counter < files.length; counter++){
        var answer = fs.readFileSync(__dirname + '/' + id + '/' + submission + '/' + files[counter],  "utf-8");
        console.log(answer);
        answers.push(JSON.parse(answer));
      }
      res.send(answers);
    }
  });
});
router.post('/answers/:id/:submission', jsonParser, function (req, res) {
  console.log('hello world');
  var id = req.params.id;
  var submission = req.params.submission;
  var DIR_PATH = './' + id + '/' + submission;
  console.log('this is the req.url ' + req.url);
  fs.stat('./' + id, function (err, stats) {
    if (err) {
      console.log('fs stat error: ' + err);
      fs.mkdirSync('./' + id);
    }
    console.log('fs stat user directory checked successfully. Here are the "stats": ' + stats);
  });
  fs.stat(DIR_PATH, function (err, stats) {
    if (err) {
      console.log('fs stat error: ' + err);
      fs.mkdirSync('./' + id + '/' + submission);
    }
    console.log('fs stat user directory -> submission checked successfully. Here are the "stats": ' + stats);
  });
  var watcher = chokidar.watch('./' + id + '/' + 'stress-logs', {
    ignored: /[\/\\]\./,
    persistent: true,
    ignoreInitial: false
  });
  watcher
      .on('change', function(path) {
        console.log('File', path, 'has been added');
        var stressLog = fs.readFileSync(path,  "utf-8");
        var entryJSON = JSON.parse(stressLog);
        entryJSON["logEntry"] = path;
        var entry = JSON.stringify(entryJSON);
        fs.writeFileSync(path, entry);
        fs.stat(path, function (err, stat) {
          if (err) throw err;
          console.log('This is the "stat" from watcher:' + stat);
        });
        watcher.unwatch('./' + id + '/' + 'stress-logs');
      });
  var random = Math.floor((Math.random() * 1000) + 1);
  var dateNow = Date.now();
  fs.writeFile(DIR_PATH + '/' + dateNow + '-' + random + '.json', JSON.stringify(req.body), function (error) {
    if (error) {
      fs.writeFileSync(DIR_PATH + '/' + dateNow + '-' + random + '.json', JSON.stringify(req.body));
    }
  });
   res.send('File received ' + req.body);
});
router.get('/', function(req, res){
  res.send("GOT IT");
});
module.exports = router;