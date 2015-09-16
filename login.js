var express = require('express');
var loginRouter = express.Router();
loginRouter.get('/', function(req, res){
    res.send('This is where you login!');
});
module.exports = loginRouter;