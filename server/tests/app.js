import chai from 'chai';
import chaiHttp from 'chai-http';
import { describe, it } from 'mocha';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import server from '../app';

const { expect } = chai;
chai.use(chaiHttp);
dotenv.config();

const Token = jwt.sign({ email: 'anymail@gmail.com' }, process.env.TOKEN_KEY, { expiresIn: '1D' });

describe('Welcome message', () => {
  it('user should see welcome message', (done) => {
    chai.request(server)
      .get('/')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res).to.be.an('object');
        expect(res.body).to.have.property('status', 200);
        done();
      });
  });
});
// test app for routes that do not exist
describe('Routes do not exist', () => {
  it('Should get message of URL not found', (done) => {
    chai.request(server)
      .get('/tukykui')
      .end((err, res) => {
        expect(res).to.have.status(404);
        expect(res).to.be.an('object');
        expect(res.body).to.have.property('status', 404);
        done();
      });
  });
});
const newUser = {
  email: 'anymail@gmail.com',
  firstname: 'irakoze',
  lastname: 'yves',
  password: '123456',

};
// user sign up
describe('User signup', () => {
  it('expect to be created successfully', (done) => {
    chai.request(server)
      .post('/api/v1/auth/signup')
      .send(newUser)
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res).to.be.an('object');
        expect(res.body).to.have.property('data');
        done();
      });
  });
});
//  signin
const sign = {
  email: 'anymail@gmail.com',
  password: '123456',
};

describe('User signin', () => {
  it('User LoggedIn succesfuly', (done) => {
    chai.request(server)
      .post('/api/v1/auth/signin')
      .send(sign)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res).to.be.an('object');
        expect(res.body).to.have.property('data');
        done();
      });
  });
});
const newEntry = {
  id: 1,
  CreatedOn: '2019-10-19 9:56:55',
  title: 'The Hare and the Tortoise',
  description: 'A Hare was making fun of the Tortoise one day for being so slow.Do you ever get anywhere? he asked with a mocking laugh.',

};
describe('post entry', () => {
  it('should create an entry', (done) => {
    chai.request(server)
      .post('/api/v1/entries')
      .set('token', Token)
      .send(newEntry)
      .end((err, res) => {
        expect(res).to.have.status(200);
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
        expect(res.body).to.have.property('error');
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
        expect(res.body).to.have.property('error');
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
const remEntry = {
  id: 1,
  CreatedOn: '2019-10-19 9:56:55',
  title: 'The Hare and the Tortoise',
  description: 'A Hare was making fun of the Tortoise one day for being so slow.Do you ever get anywhere? he asked with a mocking laugh.',

};
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
