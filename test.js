var should = require('should');
var agent =  require('supertest')('http://localhost:1337');

describe('GET /test', function(){
  it('respond with plain text', function(done){
      agent
        .get('/test')
        .expect(200)
        .end(done)
  })
});

describe('GET /emotions.json', function(){
  it('respond with json', function(done){
    agent
        .get('/emotions.json')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .end(done)
  })
});