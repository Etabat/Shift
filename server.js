var express = require('express');
var app = express();
var path = require('path');
var myRoute = require('./router');
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/json'));
app.use('/secureFormData',  myRoute, function(req, res){
  res.send(req.url);
});
app.get('/', function(req, res){
  res.sendFile(path.join(__dirname + '/index.html'));
});
app.listen(1337);
console.log('Server running. Port 1337');
