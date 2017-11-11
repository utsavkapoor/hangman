let server = require('../server.js');
//let app = require('../server.js').app;
let chai = require('chai');
let chaiHTTP = require('chai-http');
let should = chai.should();
chai.use(chaiHTTP);
require('dotenv').config({ path: '../.env'});
var agent = chai.request.agent(server);

describe('/GET Question', () => {
  it('it should get the question and User Stats', (done) => {
    chai.request(server)
      .get('/question/Utsav')
      .end((err,res) => {
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.property('answer');
        res.body.should.have.property('question');
        res.body.should.have.property('hint');
        res.body.should.have.property('name');
        res.body.should.have.property('win');
        res.body.should.have.property('loss');
        res.body.name.should.equal('Utsav');
        res.body.question.should.be.a('string');
      done();
    });
  });

  it('it should get the highscore data', (done) => {
    chai.request(server)
      .get('/highscore-data')
      .end((err,res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('status');
        res.body.should.have.property('pie_data');
        res.body.should.have.property('player_data');
        res.body.status.should.equal('success');
        res.body.player_data.should.be.a('array');
      done();
    });
  });

  it('should get a 404 error when no name sent', (done) => {
    chai.request(server)
      .get('/question/')
      .end((err,res) => {
      res.should.have.status(404);
    done();
    });
  });
});

describe('/POST letters', () => {
  it('it should return 400 when post happens before the GET request to question', (done) => {
    chai.request(server)
      .post('/key/a')
      .end((err,res) => {
      res.should.have.status(400);
    done();
    });
  });
  it('it should check if character is present and return the json accordingly', (done) => {
      agent.get('/question/Utsav')
      .then((res) => {
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.property('answer');
        res.body.should.have.property('question');
        res.body.should.have.property('hint');
        res.body.should.have.property('name');
        res.body.should.have.property('win');
        res.body.should.have.property('loss');
        res.body.name.should.equal('Utsav');
        res.body.question.should.be.a('string');
          agent.post('/key/a')
          .then((res2) => {
            res2.should.have.status(200);
            res2.should.be.json;
            res2.body.should.be.a('object');
            res2.body.should.have.property('gameStat');
            res2.body.should.have.property('attempt_left');
            res2.body.should.have.property('fillpositions');
            res2.body.should.have.property('status');
            res2.body.status.should.equal('ONGOING');
          done();
        });
    });
  });

  });