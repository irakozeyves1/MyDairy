/* eslint-disable import/prefer-default-export */
import jwt from 'jsonwebtoken';

export function genToken(email) {
  return jwt.sign({ email : email }, process.env.TOKEN_KEY);
}
