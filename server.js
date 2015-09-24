var express = require('express');
var app = express();
var path = require('path');
var myRoute = require('./router');
app.use(express.static(__dirname + '/public'));
app.use('/secureFormData',  myRoute, function(req, res){
  console.log('OOPS> STOPS HERE');
  res.send(req.url);
});
app.get('/emotions.json', function(req, res){
  console.log(JSON.stringify(req.body));
  res.sendFile(path.join(__dirname + '/emotions.json'));
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
