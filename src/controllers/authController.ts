import { Request, Response } from "express";
import { CreateDataUser } from "../interfaces/createData.js";
import { authService } from "../services/authService.js";


export async function signUp(req: Request, res: Response) {
    
    const userInfo: CreateDataUser = {
        email: req.body.email,
        password: req.body.password
    }

    await authService.signUp(userInfo);

    res.sendStatus(201)
}

export async function signIn(req: Request, res: Response) {
    
    const userInfo: CreateDataUser = req.body;

    const token = await authService.signIn(userInfo);

    res.send(token).status(200);

}