var express = require('express');
var app = express();
var answers = require('./answers');

app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/json'));
app.use('/secureFormData',  answers);

app.listen(1377);
console.log('Server running. Port 1337');