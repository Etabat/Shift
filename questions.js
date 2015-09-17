var express = require('express');
var questions = express.Router();
var app = express();
//var emotions = require('./emotions.js');
var userQuestions = {
    id1: [['title', 'Stress Log'], ['field1', new Date()],['description', ['Where were you?', 'What were you doing?',
        'Who were you with?']], ['placeholder', 'Please describe the situation here.']]
    //enterDate: new Date(),
    //situation: {
    //    title: 'Situation',
    //    description: ['Where were you?', 'What were you doing?', 'Who were you with?'],
    //    placeholder: 'Please describe the situation here.'
    //},
    //emotions: app.use('/', emotions),
    //thoughts: {
    //    title: 'Negative Automatic Thoughts',
    //    description: ['What thoughts were going through your mind?', 'What memories or images were in your mind?'],
    //    placeholder: 'Enter automatic thoughts'
    //}
};
questions.get('/', function(req, res){
    res.send(userQuestions);
});
module.exports = questions;