
import { User } from '../models/userModel';
import { genToken } from '../helpers/tokenHelper';
import Respond from '../helpers/response';
import { StatusCodeOk, StatusCodeCreated } from '../helpers/statusTemp';
import Database from '../db/db';

export const signup = async (req, res) => {
  const user = new User(req.body.firstname, req.body.lastname, req.body.email, req.body.password);
  await Database.addUser(user);
  const token = genToken(user.email);
  return res.status(StatusCodeCreated).json(new Respond(StatusCodeCreated, 'User is Successfully Created ', { token }, null).reply());
};

export const signin = (req, res) => {
  const token = genToken(req.body.email);
  return res.status(StatusCodeOk).json(new Respond(StatusCodeOk, 'User is successfully Logged in', { token }, null).reply());
};
