import Joi from '@hapi/joi';

const signupSchema = Joi.object({
  email: Joi.string().strict().trim().min(3)
    .required()
    .email(),
  firstname: Joi.string().strict().trim().min(3)
    .required(),
  lastname: Joi.string().strict().trim().min(3)
    .required(),
  password: Joi.string().strict().trim().min(6)
    .required(),
});

const signinSchema = Joi.object({
  email: Joi.string().strict().trim().min(3)
    .required()
    .email(),
  password: Joi.string().strict().trim().min(6)
    .required(),
});
const paths = {
  '/auth/signup': signupSchema,
  '/auth/signin': signinSchema,

};

export default paths;
