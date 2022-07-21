import Joi from "joi";

const signUpSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    passwordConfirmation: Joi.string().valid(Joi.ref("password")).required()
});

export const authSchema = {
    signUpSchema
}