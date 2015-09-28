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
        // YOU CAN ALSO DO THE WRITE TO FILE[INDEX] THE NAME OF THE FILE BY CALLING A METHOD
        // THAT LETS YOU ADD STRING TO A FILE
        // TRY FS APPENDFILE
        var answer = fs.readFileSync(__dirname + '/' + id + '/' + submission + '/' + files[counter],  "utf-8");
        console.log('answer[eventDate]' + answer['eventDate']);
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
        // *NEW*: GET THE PROPERTY "stress-logEntry" AND IT'S CORRESPONDING FILE NAME
        // READFILe here
        // DO SOMETHING ASSOCIATE THE STRESS OG FILE NAME WITH THE CHALLNGE EXERCISE ITS ASSOCUATED WITH
        var answer = fs.readFileSync(path,  "utf-8");
        console.log(answer);
        var configJSON = JSON.parse(answer);
        configJSON["logEntry"] = path;
        var mew = JSON.stringify(configJSON);
        fs.writeFileSync(path, mew);
        // GET THE PATH OF THE CHANGED FILE. IN THIS ON FUNCTION YOU CAN CREATEWRITESTREAM AND PIPE IT TO
        // COMPLETED SECTION AND ADD THE STRING "COMPLETED" TO THE STRESS LOG THEY USED TO COMPLETE IT
        // REMEBER THAT WHEN YOU FETCH THE STRESS LOG HISTORY IN HISTORY JS
        // YOU CAN ALSO GET THE FILE NAME ASSOCIATED WITH EACH INDIVIDUAL STRESS LOG
        // WHEN THE USER COMPLETES A CHALLENGE GET THE FILE NAME AND SEND IT TO THE BACK
        // STREAMWRITE INTO THAT FILE IN JSON FORMAT AND WRITE COMPLETED


        //  IDEA: YOU CAN ADD THE STRESS LOG FILE NAME INSIDE THE FILE WHEN YOU SEND IT BACK FROM A REQUEST
        // THEN WHEN IT IS ADDED IN HISTORY YOU CAN EXTRACT IN IN THE EXERCISE FILE
        // SINCE YOU ALREADY MAKE A REQUEST BUT YOU DONT ACTUALLY EXTARCT ANY OF THE JSON THINGS
        // THEN SINCE IT'S BY ORDER YOU KNOW AUTOMATICALLY WHICH ONE CORRESPONDS TO WHICH

        // SEE SAVED PICTURE IN PHONE. "PIPING STREAM IS TAKING THE OUTPUT OF ONE STREAM AND FEEDING IT
        // INTO THE INPUT OF ANOTHER"
        //var paths = [];
        fs.stat(path, function (err, stat) {
          // Replace error checking with something appropriate for your app.
          if (err) throw err;
          console.log('hi hi, this is the "stat" :' + stat);
          //setTimeout(checkEnd, end_timeout, path, stat);
        });
        watcher.unwatch('./' + id + '/' + 'stress-logs');
        //console.log(paths)
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
//chokidar.watch('.', {ignored: /[\/\\]\./}).on('all', function(event, path) {
//  console.log(event, path);
//});

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
