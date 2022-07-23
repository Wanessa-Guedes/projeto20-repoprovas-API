import { Request, Response } from "express";
import { CreateDataTest } from "../interfaces/createData.js";
import { testService } from "../services/testService.js";

export async function createTest(req: Request, res: Response){

    const testInfo: CreateDataTest = req.body;

    await testService.createTest(testInfo);

    res.sendStatus(201)
}

export async function getTests(req: Request, res: Response){

    const group: any = req.query.groupBy; 
    
    if(group === "disciplines"){
        const tests = await testService.getTestByDiscipline();
        return res.send({tests}).status(200)
    }

    if(group === "teachers"){
        const tests = await testService.getTestByInstructor();
        return res.send({tests}).status(200)
    }

    const tests = await testService.getAllTests();
    return res.send({tests}).status(200)

}
