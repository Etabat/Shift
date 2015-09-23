var express = require('express');
var router = express.Router();
var path = require("path");
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
var fs = require('fs');
router.get('/answers:id', function(req, res){
    var id = req.params.id;
    console.log('Router.get received your request');
    res.send('This is the response for parameter' + id + '. Send a JSON file')
});
router.post('/answers/:id', jsonParser ,function (req, res) {
    console.log('hello world');
    var id = req.params.id;
        fs.stat('./' + id, function(err, stats){
            if(err){
                fs.mkdirSync('./' + id);
            }
            console.log(stats);
        });
    var random = Math.floor((Math.random() * 1000) + 1);
    fs.writeFileSync(__dirname + '/' + id + '/' + random + '.json', JSON.stringify(req.body));
    res.send('File received ' + req.body );
});
router.get('/', function(req, res){
    res.send("GOT IT");
});
module.exports = router;