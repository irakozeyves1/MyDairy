import bcrypt from 'bcrypt';
import { StatusCodeUnauthorized, StatusCodeNotFound } from '../helpers/statusTemp';
import Respond from '../helpers/response';
import Database from '../db/db';

export const isEmailUsed = async (req, res, next) => {
  // const user = users.find(user => user.email === req.body.email);
  const result = await Database.selectCount('users', 'email', req.body.email);

  if (result.rows[0].count !== '0') {
    return res.status(StatusCodeUnauthorized).json(new Respond(StatusCodeUnauthorized, 'Email already exist', req.body.email, null).reply());
  }
  next();
};

export const hashPassword = async (req, res, next) => {
  const salt = await bcrypt.genSalt(10);
  // eslint-disable-next-line no-shadow
  const hashPassword = await bcrypt.hash(req.body.password, salt);
  req.body.password = hashPassword;
  next();
};

export const authanticate = async (req, res, next) => {
  // const user = users.find(user => user.email == req.body.email);
  const user = await Database.selectBy('users', 'email', req.body.email);
  if (user.rowCount > 0) {
    const validPassword = await bcrypt.compare(req.body.password, user.rows[0].password);

    if (validPassword) {
      next();
    } else {
      return res.status(StatusCodeNotFound).json(new Respond(StatusCodeNotFound, 'Password is not match, please try again.', null).reply());
    }
  } else {
    return res.status(StatusCodeNotFound).json(new Respond(StatusCodeNotFound, 'Email is not match, please try again.', null).reply());
  }
};
