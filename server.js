var express = require('express');
var app = express();
var user = require('./login.js');
app.get('/', function(req, res){
   res.send('Hello World from server.js')
});
app.use(express.static(__dirname + '/public'));
app.use('/login', user());
app.listen(1337);
console.log('Server running. Port 1337');