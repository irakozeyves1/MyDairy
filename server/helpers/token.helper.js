/* eslint-disable import/prefer-default-export */
import jwt from 'jsonwebtoken';

export const genToken = (userId, firstName, lastName, email) => jwt.sign({
  userId, firstName, lastName, email,
}, process.env.TOKEN_KEY);
