import { Router } from "express";
import { schemaValidator } from "../middlewares/schemaValidator.js";
import { authSchema } from "../schemas/authSchema.js";

const authRouter = Router();

authRouter.post("/signup", schemaValidator(authSchema.signUpSchema))


export default authRouter;