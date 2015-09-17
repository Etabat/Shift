var express = require('express');
var app = express();
//var user = require('./login.js');
var path = require('path');
//var emotions = require('./emotions.js');
var questions = require('./questions.js');
app.use(express.static(__dirname + '/public'));
app.get('/', function(req, res){
   res.sendFile(path.join(__dirname + '/index.html'));
});
//app.use('/login', user);
//app.use('/emotions-list', emotions);
app.use('/questions', questions);
app.listen(1337);
console.log('Server running. Port 1337');