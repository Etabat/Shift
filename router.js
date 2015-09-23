var express = require('express');
var router = express.Router();
var path = require("path");
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
var fs = require('fs');
var async = require('async');

router.get('/answers/:id', function(req, res){
    var id = req.params.id;
    console.log('Router.get received your request');
    fs.readdir('./' + id, function(err, files){
        if(err){
            console.log("Error reading files: ", err);
        } else {
            var setFiles = {
                firstFile: async.apply(fs.readFile, __dirname + '/5000/892:.json', "utf-8")
            };
            async.parallel(setFiles, function (error, results) {
                if (error) {
                    res.status(500).send(error);
                    return;
                }
                //for (var counter = 0; counter < files.length; counter++) {
                //}
                console.log(JSON.parse(results.firstFile));
                res.send(results.firstFile);
            });
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
    //var dateScan = new Date().toDateString();
    var PATH_NAME = __dirname;
    fs.writeFile(PATH_NAME + '/' + id + '/' + random + '.json', JSON.stringify(req.body), function (error) {
        if (error) {
            fs.writeFileSync(PATH_NAME + '/' + id + '/' + random  + '.json', JSON.stringify(req.body));
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
