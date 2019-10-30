/* eslint-disable no-trailing-spaces */
/* eslint-disable import/prefer-default-export */
/* eslint-disable max-len */
// eslint-disable-next-line import/named
import { User, users } from '../models/user.model';
import { genToken } from '../helpers/token.helper';

export const signup = (req, res) => {
  const user = new User(req.body.email, req.body.firstname, req.body.lastname, req.body.password);
  users.push(user);
  const token = genToken(user.email);
  return res.status(201).send({
    status: 201,
    message: 'User created successfully',
    data: {
      token, 
      
    },
  });
};

export const signin = (req, res) => {
  const token = genToken(req.body.email);
  return res.status(200).send({
    status: 200,
    message: 'User is successfully logged in',
    data: {
      token: token,
    },
  });
};
