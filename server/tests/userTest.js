import chai from 'chai';
import chaiHttp from 'chai-http';
import { describe, it } from 'mocha';
import dotenv from 'dotenv';
import server from '../app';

const { expect } = chai;
chai.use(chaiHttp);
dotenv.config();

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
