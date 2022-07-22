import { Router } from "express";
import { getCategories } from "../controllers/categoriesController.js";
import { validateToken } from "../middlewares/tokenValidatorMiddleware.js";

const categoriesRouter = Router();

categoriesRouter.get("/categories", validateToken, getCategories)


export default categoriesRouter;