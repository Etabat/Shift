var express = require('express');
var path = require('path');
var loginRouter = express.Router();
loginRouter.use(function(req, res, next) {
    console.log(req.method, req.url);
    next();
});
loginRouter.get('/', function(req, res){
    res.send('This is where you login!');
});
loginRouter.get('/user', function(req, res){
    res.send('HELLO USER!');
});
loginRouter.get('/user/:name', function(req, res) {
    res.send('Welcome back ' + req.params.name + '!');
});
module.exports = loginRouter;