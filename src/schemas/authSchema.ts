import Joi from "joi";

const signUpSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    passwordConfirmation: Joi.string().valid(Joi.ref("password")).required()
});

/* const signUpSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
}); */

const signInSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
})

export const authSchema = {
    signUpSchema,
    signInSchema
}