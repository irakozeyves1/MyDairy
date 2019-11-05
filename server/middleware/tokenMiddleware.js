/* eslint-disable eqeqeq */
/* eslint-disable no-unused-vars */
/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable consistent-return */
/* eslint-disable no-tabs */
/* eslint-disable import/prefer-default-export */
import jwt from 'jsonwebtoken';
import { users } from '../models/userModel';
import Respond from '../helpers/response';
import { StatusCodeBadRequest, StatusCodeUnauthorized } from '../helpers/statusTemp';
import Database from '../db/db';

export const verifyToken = async (req, res, next) => {
  const token = req.header('token');
  if (!token) {
    return res.status(StatusCodeUnauthorized).json(new Respond(StatusCodeUnauthorized, 'please sign in first.', null).reply());
  }
  try {
	  const verified = jwt.verify(token, process.env.TOKEN_KEY);
    // const u = users.find((u) => u.email == verified.email);
    const u = await Database.selectBy('users', 'email', verified.email);
    req.user = {
		  token: verified,
		  email: verified.email,

	  };
	  next();
  } catch (error) {
    res.status(StatusCodeBadRequest).json(new Respond(StatusCodeBadRequest, 'Invalid token', null).reply());
  }
};
