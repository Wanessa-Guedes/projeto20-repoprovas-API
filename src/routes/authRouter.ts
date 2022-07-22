import { Router } from "express";
import { signIn, signUp } from "../controllers/authController.js";
import { schemaValidator } from "../middlewares/schemaValidator.js";
import { authSchema } from "../schemas/authSchema.js";

const authRouter = Router();

authRouter.post("/sign-up", schemaValidator(authSchema.signUpSchema), signUp)
authRouter.post("/sign-in", schemaValidator(authSchema.signInSchema), signIn)


export default authRouter;