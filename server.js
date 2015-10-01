var express = require('express');
var app = express();
var answers = require('./answers');

app.use(express.static(__dirname + '/public/dist'));
app.use(express.static(__dirname + '/json'));
app.use('/secureFormData',  answers);

app.get('/test', function (req, res) {
  res.send('res send test');
  console.log('testing console')
});

app.listen(1337);
console.log('Server running. Port 1337');

module.exports = app;