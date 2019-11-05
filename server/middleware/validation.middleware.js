/* eslint-disable no-underscore-dangle */
/* eslint-disable import/prefer-default-export */
import Schemas from '../helpers/validation.helper';
import { StatusCodeNotFound } from '../helpers/statusTemp';

export const validate = (req, res, next) => {
  // enabled HTTP methods for request data validation
  const _supportedMethods = ['post', 'put', 'patch'];
  const route = req.route.path;
  const method = req.method.toLowerCase();

  if (_supportedMethods.includes(method) && Schemas[route] !== undefined) {
    // get schema for the current route
    const schema = Schemas[route];
    if (schema) {
      // Validate req.body using the schema and validation options
      try {
        schema.validate(req.body);
        next();
        return 0;
      } catch (error) {
        return res.status(StatusCodeNotFound).send({ status: StatusCodeNotFound, error: error.details[0].message });
      }
    }
  }
  next();
};
