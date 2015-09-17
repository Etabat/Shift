var express = require('express');
var emotionsRouter = express.Router();
var emotions = {
    uneasy: ['nervous', 'tense',  'anxious', 'flustered', 'insecure', 'angry',
            'cross', 'confused', 'bored', 'flat', 'apathetic', 'weak'],
    angry: ['frustrated', 'cross', 'irritated', 'annoyed', 'furious', 'livid',
        'enraged', 'hurt', 'inadequate', 'trapped', 'tired', 'scared'],
    frightened: ['uneasy', 'weak', 'insecure', 'inadequate', 'tense', 'anxious',
        'nervous', 'scared', 'petrified', 'threatened', 'trapped', 'horrified'],
    happy: ['pleased', 'glad', 'wonderful', 'elated', 'excited', 'content',
        'surprised', 'proud', 'relieved', 'satisfied', 'confident'],
    negative: ['distrustful', 'suspicious', 'scornful', 'disdain', 'bitter',
        'stupid', 'shame', 'worthless'],
    positive: ['determined', 'forgiving', 'hopeful', 'motivated', 'inspired',
        'daring', 'energetic', 'loving', 'eager', 'eager', 'excited', 'receptive', 'happy'],
    unhappy: ['hurt', 'upste', 'lonely', 'guilty', 'miserable', 'beret', 'despairing',
        'devastated', 'lost down'],
    upset: ['angry', 'frustrated', 'sad', 'tearful', 'hurt', 'miserable', 'weepy'],
    confused: ['hurt', 'upset', 'lonely', 'inadequate', 'cross', 'miserable',
        'shocked', 'mixed-up', 'nervous', 'scared', 'discontented', 'foolish']
};
emotionsRouter.get('/', function(req, res){
    res.send(emotions);
});
module.exports = emotionsRouter;