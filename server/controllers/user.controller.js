/* eslint-disable no-trailing-spaces */
/* eslint-disable import/prefer-default-export */
/* eslint-disable max-len */
// eslint-disable-next-line import/named
import { User, users } from '../models/user.model';
import { genToken } from '../helpers/token.helper';
import Respond from '../helpers/response';
import { StatusCodeOk, StatusCodeCreated } from '../helpers/statusTemp';

export const signup = (req, res) => {
  const user = new User(users.length + 1, req.body.email, req.body.firstname, req.body.lastname, req.body.password);
  users.push(user);
  const token = genToken(user.userId, user.firstname, user.lastname, user.email);
  return res.status(StatusCodeCreated).json(new Respond(StatusCodeCreated, 'User is Successfully Created ', { token }, null).reply());
};

export const signin = (req, res) => {
  const token = genToken(req.body.email);
  return res.status(StatusCodeOk).json(new Respond(StatusCodeOk, 'User is successfully Logged in', { token }, null).reply());
};
