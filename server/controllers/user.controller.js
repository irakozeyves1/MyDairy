/* eslint-disable no-trailing-spaces */
/* eslint-disable import/prefer-default-export */
/* eslint-disable max-len */
// eslint-disable-next-line import/named
import { User, users } from '../models/user.model';
import { genToken } from '../helpers/token.helper';
import Respond from '../helpers/response';
export const signup = (req, res) => {
  const user = new User(users.length + 1, req.body.email, req.body.firstname, req.body.lastname, req.body.password);
  users.push(user);
  const token = genToken(user.userId, user.firstname, user.lastname, user.email);
  return res.status(201).json(new Respond(201, 'User is Successfully Created ', { token }, null).reply());
};

export const signin = (req, res) => {
  const token = genToken(req.body.email);
  return res.status(200).json(new Respond(200, 'User is successfully Logged in', { token }, null).reply());
};
