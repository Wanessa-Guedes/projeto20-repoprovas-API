import { Router } from "express";
import { createTest, getTestByDiscipline } from "../controllers/testController.js";
import { schemaValidator } from "../middlewares/schemaValidator.js";
import { validateToken } from "../middlewares/tokenValidatorMiddleware.js";
import { testSchema } from "../schemas/testSchema.js";


const testsRouter = Router();

testsRouter.post("/tests", validateToken, schemaValidator(testSchema.createTestSchema), createTest)
testsRouter.get("/tests", validateToken, getTestByDiscipline)


export default testsRouter;