import chai from 'chai';
import chaiHttp from 'chai-http';
import { describe, it } from 'mocha';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import server from '../app';
import { newEntry, remEntry } from './mochaData/entryMocha';

const { expect } = chai;
chai.use(chaiHttp);
dotenv.config();

const Token = jwt.sign({ email: 'anymail@gmail.com' }, process.env.TOKEN_KEY, { expiresIn: '1D' });
describe('post entry', () => {
  it('should create an entry', (done) => {
    chai.request(server)
      .post('/api/v1/entries')
      .set('token', Token)
      .send(newEntry)
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res).to.be.an('object');
        expect(res.body).to.have.property('data');
        done();
      });
  });
});
describe('update entry', () => {
  it('should an entry be integer', (done) => {
    chai.request(server)
      .patch('/api/v1/entries/:entryId')
      .set('token', Token)
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res).to.be.an('object');
        expect(res.body).to.have.property('message');
        done();
      });
  });
  it('should enter an exist entry', (done) => {
    chai.request(server)
      .patch('/api/v1/entries/12')
      .set('token', Token)
      .end((err, res) => {
        expect(res).to.have.status(404);
        expect(res).to.be.an('object');
        expect(res.body).to.have.property('message');
        done();
      });
  });
  it('should be able to edit entry', (done) => {
    chai.request(server)
      .patch('/api/v1/entries/1')
      .set('token', Token)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res).to.be.an('object');
        expect(res.body).to.have.property('data');
        done();
      });
  });
});

describe('Remove Entry', () => {
  it('should be able to remove entry', (done) => {
    chai.request(server)
      .patch('/api/v1/entries/1')
      .set('token', Token)
      .send(remEntry)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res).to.be.an('object');
        expect(res.body).to.have.property('message');
        done();
      });
  });
});
describe('Get all entries', () => {
  it('it should see all entries', (done) => {
    chai.request(server)
      .get('/api/v1/entries')
      .set('token', Token)
      .end((req, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('data');
        expect(res.body).to.have.property('status').eql(200);
        done();
      });
  });
});
describe('Get entries by specif id', () => {
  it('should allow user to get entries by its specific id', (done) => {
    chai.request(server)
      .get('/api/v1/entries/1')
      .set('token', Token)
      .end((req, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('data');
        expect(res.body).to.have.property('status').eql(200);
        done();
      });
  });
  it('No record found', (done) => {
    chai.request(server)
      .get('/api/v1/entries/999990')
      .set('token', Token)
      .end((req, res) => {
        expect(res).to.have.status(404);
        expect(res).to.be.an('object');
        expect(res.body).to.have.property('message');
        done();
      });
  });
});
