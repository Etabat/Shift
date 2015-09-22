var express = require('express');
var router = express.Router();
var path = require("path");
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
var fs = require('fs');
router.get('/answers:id', function(req, res){
    var id = req.params.id;
    console.log(id);
    console.log('Router.get received your request');
    res.send('This is the response for parameter' + id + '. Send a JSON file')
});
router.post('/answers/:id', jsonParser ,function (req, res) {
    var id = req.params.id;
    res.send(JSON.stringify(req.body));
    if(!fs.statSync('./' + id)){
        fs.mkdirSync('./' + id)
    }
    var random = ((Math.random() * 1000) + 1);
    fs.writeFile('./' + id + '/' + random , JSON.stringify(req.body), function(error){
        if (error){throw error}
        console.log('success writing file to ' + req.url);
    });
    res.send('File received');
});
router.get('/', function(req, res){
    res.send("GOT IT");
});
module.exports = router;