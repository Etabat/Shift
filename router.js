var express = require('express');
var router = express.Router();
var path = require("path");
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
var fs = require('fs');
router.get('/formData.json', function(req, res){
    console.log(JSON.stringify(req.body));
    res.sendFile(path.join(__dirname + '/formData.json'));
});
router.post('/formData.json', jsonParser ,function (req, res) {
    console.log(JSON.stringify(req.body));
    fs.writeFile('./formData.json' , JSON.stringify(req.body), function(error){
        // Create files?
        if (error){throw error}
        console.log('success writing file to ' + req.url);
    });
    res.send('welcome! ');
});
router.get('/', function(req, res){
    // maybe i can send the formData.js and they have to authenticate themselves
    res.send("GOT IT");
});
module.exports = router;