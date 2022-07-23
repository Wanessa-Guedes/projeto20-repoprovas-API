import express, { json } from "express";
import "express-async-errors";
import cors from "cors";

import { errorHanddlingMiddleware}  from "./middlewares/errorHandlerMiddleware.js";
import router from "./routes/index.js";

const app = express();
app.use(json());
app.use(cors());
app.use(router);
app.use(errorHanddlingMiddleware);

export default app;
