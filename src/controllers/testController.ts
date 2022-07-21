import { Request, Response } from "express";
import { CreateDataTest } from "../interfaces/createData.js";
import { testService } from "../services/testService.js";

export async function createTest(req: Request, res: Response){

    const testInfo: CreateDataTest = req.body;

    await testService.createTest(testInfo);

    res.sendStatus(201)
}