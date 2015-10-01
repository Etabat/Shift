var request = require('supertest');
var myApp = require('./server.js');

describe('GET /test', function(){
  it('respond with plain text', function(done){
      request(myApp)
        .get('/test')
        .expect(200)
        .end(done)
  })
});

describe('GET /emotions.json', function(){
  it('respond with json', function(done){
    request(myApp)
        .get('/emotions.json')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .end(done)
  })
});