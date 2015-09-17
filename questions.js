var express = require('express');
var questions = express.Router();
var app = express();
var emotions = require('./emotions.js');
var userQuestions = [
    {
    id1: 1,
    title: 'stress log',
    subtitle1: 'When and Where',
    data: "",
    subtitle2: 'Situation',
    questions: [
        'Where were you?',
        'What were you doing?',
        'Who were you with?'],
    placeholder: 'Please describe the situation here.',
    subtitle3: 'Emotions',
    emotionsList: emotions.emotions,
    },
    {
    id1: 2,
    title: 'stress log',
    //data: new Date().now(),
    questions: [
        'Where were you?',
        'What were you doing?',
        'Who were you with?']
    }
    ];
questions.get('/', function(req, res){
    res.send(userQuestions);
});
module.exports = questions;