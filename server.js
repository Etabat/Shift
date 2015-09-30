var express = require('express');
var should = require('should');
var request = require('supertest');

describe('request.agent(app)', function () {
  var app = express();
  var agent = request.agent(app);

  app.get('/', function (req, res) {
    res.send('hello world');
  });

  it('status code 200',  function(done){
    agent
        .get('/')
        .expect(200)
        .end(done)
  });

  describe('get json files',  function() {
    app.use(express.static(__dirname + '/json'));

    it('GET /emotions.json', function (done) {
      agent
          .get('/emotions.json')
          .set('Accept', 'application/json')
          //.expect('application/json')
          .expect(function (res) {
            res.bod = [
              "Aggravation",
              "Agitation",
              "Agony",
              "Alarm",
              "Alienation",
              "Anger",
              "Anguish",
              "Annoyance",
              "Anxiety",
              "Apprehension (fear)",
              "Bitter",
              "Contempt",
              "Crosspatch",
              "Defeatism",
              "Dejection",
              "Depression",
              "Despair",
              "Disappointment",
              "Disgust",
              "Dislike",
              "Dismay",
              "Displeasure",
              "Distress",
              "Dread",
              "Embarrassment",
              "Envy",
              "Exasperation",
              "Fear",
              "Ferocity",
              "Fright",
              "Frustration",
              "Fury",
              "Gloom",
              "Glumness",
              "Grief",
              "Grouchy",
              "Grumpy",
              "Guilt",
              "Hatred",
              "Homesickness",
              "Horror",
              "Hostility",
              "Humiliation",
              "Hurt",
              "Hysteria",
              "Insecurity",
              "Insult",
              "Irritability",
              "Isolation",
              "Jealousy",
              "Loathing",
              "Loneliness",
              "Melancholy",
              "Misery",
              "Mono no aware",
              "Mortification",
              "Neglect",
              "Nervousness",
              "Outrage",
              "Panic",
              "Pity",
              "Rage",
              "Regret",
              "Rejection",
              "Remorse",
              "Resentment",
              "Revulsion",
              "Sadness",
              "Scorn",
              "Shame",
              "Shock",
              "Sorrow",
              "Spite",
              "Suffering",
              "Suspense",
              "Sympathy",
              "Terror",
              "Torment",
              "Torment",
              "Uneasiness",
              "Unhappy",
              "Vengefulness",
              "Woe",
              "Worry",
              "Wrath"
            ]

          })
          .expect(200)
          .end(done)
    })
  });
});
