/* eslint-disable eqeqeq */
/* eslint-disable no-unused-vars */
/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable consistent-return */
/* eslint-disable no-tabs */
/* eslint-disable import/prefer-default-export */
import jwt from 'jsonwebtoken';
import { users } from '../models/user.model';

export function verifyToken(req, res, next) {
  const token = req.header('token');
  if (!token) {
    return res.status(401).send({
	  'status': 401,
	  'message': 'please sigin first.',
    });
  }
  try {
	  const verified = jwt.verify(token, process.env.TOKEN_KEY);
	  const u = users.find(u => u.email == verified.email);
	  req.user = {
		  token: verified,
		  email: verified.email,

	  };
	  next();
  } catch (error) {
    res.status(400).send({
	  'status': 400,
	  'error': 'Invalid token',
    });
  }
}
