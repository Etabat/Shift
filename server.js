var express = require('express');
var app = express();
var path = require('path');
var myRoute = require('./router');
app.use(express.static(__dirname + '/public'));
app.use('/hithisisphone',  myRoute, function(req, res){
   res.send(req.url);
});
//app.use('/formDataSecure', myRoute, function(req, res){
//   res.send(req.url);
//});
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