var express = require('express');
var should = require('should');
var request = require('supertest');
var answers = require('./answers');

describe('GET stress-logs', function(){
  var app = express();

  app.use('/secureFormData', answers);

  var agent = request.agent(app);

  it('respond with json', function(done){
    agent
        .get('/secureFormData/answers/5000/stress-logs')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .end(done)
  });
});