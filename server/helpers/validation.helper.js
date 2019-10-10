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


const paths = {
  '/auth/signup': signupSchema,
};

export default paths;
