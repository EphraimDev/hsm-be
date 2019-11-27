import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';

chai.use(chaiHttp);
chai.should();

let token, _id;

describe('Session', () => {
  it('should log in a user', done => {
    chai
      .request(app)
      .post('/api/v1/auth/login')
      .send({
        email: 'test@gmail.com',
        password: 'Password1!'
      })
      .then(res => {
        const body = res.body;

        token = body.data.token;
        _id = body.data.user.id;
        done();
      });
  });

  describe("Request session", () => {
    it('user should request a session', done => {
        chai
        .request(app)
        .put(`/api/v1/session/request?doctor=5dd7cbdd6121092514c71753&day=20-20-2020&time=15:45`)
        .set('authorization', `bearer ${token}`)
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('status');
            res.body.status.should.equal('success');
            res.body.should.have.property('data');
        });
        done();
    });

    
    it('session request should fail', done => {
        chai
        .request(app)
        .put(`/api/v1/session/request?doctor=5dd7cbdd6121092514c71753&time=15:45`)
        .set('authorization', `bearer ${token}`)
        .end((err, res) => {
            res.should.have.status(400);
            res.body.should.be.a('object');
            res.body.should.have.property('status');
            res.body.status.should.equal('error');
            res.body.error.should.equal('Session request was not successful')
        });
        done();
    });
  });
});
