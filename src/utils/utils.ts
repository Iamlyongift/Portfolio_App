import Joi from "joi";

export const RegisterSchema = Joi.object({
  userName: Joi.string().required(),
  passWord: Joi.string()
    .min(6)
    .regex(/^[a-zA-Z0-9]{3,30}$/)
    .required(),
  confirm_password: Joi.string()
    .valid(Joi.ref("passWord"))
    .required()
    .label("confirm_password")
    .messages({ "any.only": "{{#label}} does not match" }),
  email: Joi.string().email().required(),
  age: Joi.string().required(),
  skills: Joi.string().required(),
  profilePhoto: Joi.string().required(),
  careerGoals: Joi.string().required(), // Changed to string to match Mongoose schema
});

export const LoginSchema = Joi.object({
  userName: Joi.string().required(),
  passWord: Joi.string()
    .min(6)
    .regex(/^[a-zA-Z0-9]{3,30}$/)
    .required(),
});

export const option = {
  abortearly: false,
  errors: {
    wrap: {
      label: "",
    },
  },
};

export const updateprofileSchema = Joi.object({
  skills: Joi.string(),
  careerGoals: Joi.string(),
  // Changed to string to match Mongoose schema
});

export const createProgramSchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().required(),
  duration: Joi.string().required(),
  scholarship_available: Joi.boolean().required(),
});

export const updateProgramSchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().required(),
  duration: Joi.string().required(),
  scholarship_available: Joi.boolean().required(),
});
