/* eslint-disable no-shadow */
/* eslint-disable require-atomic-updates */
// eslint-disable-next-line import/no-unresolved
import bcrypt from 'bcrypt';
// eslint-disable-next-line import/named
import { users } from '../models/user.model';
import { StatusCodeUnauthorized, StatusCodeNotFound } from '../helpers/statusTemp';
import Respond from '../helpers/response';
// this function check if email of user is exist arleady into the system

// eslint-disable-next-line consistent-return
export const isEmailUsed = (req, res, next) => {
  const user = users.find(user => user.email === req.body.email);
  if (user) {
    return res.status(StatusCodeUnauthorized).json(new Respond(StatusCodeUnauthorized, 'Email already exist', req.body.email, null).reply());
  }
  next();
};

// this function helps in hashing password

export const hashPassword = async (req, res, next) => {
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(req.body.password, salt);
  req.body.password = hashPassword;
  next();
};

export const authanticate = async (req, res, next) => {
  const user = users.find(user => user.email == req.body.email);
  if (user) {
    const validPassword = await bcrypt.compare(req.body.password, user.password);

    if (validPassword) {
      req.body.userId = user.userId;
    } else {
      return res.status(StatusCodeNotFound).json(new Respond(StatusCodeNotFound, 'Password is not match, please try again.', null).reply());
    }
    next();
  } else {
    return res.status(StatusCodeNotFound).json(new Respond(StatusCodeNotFound, 'Email is not match, please try again.', null).reply());
  }
};
