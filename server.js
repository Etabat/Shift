var express = require('express');
var app = express();
var user = require('./login.js');
var path = require('path');
app.use(express.static(__dirname + '/public'));
app.use('/login', user);
app.get('/emotionList.json', function(req, res){
   console.log(JSON.stringify(req.body));
   res.sendFile(path.join(__dirname + '/emotionList.json'));
});
app.get('/worksheets.json', function(req, res){
   console.log(JSON.stringify(req.body));
   res.sendFile(path.join(__dirname + '/worksheets.json'));
});
app.get('/', function(req, res){
   res.sendFile(path.join(__dirname + '/index.html'));
});
app.listen(1337);
console.log('Server running. Port 1337');