import { NextFunction, Request, Response } from "express";

export function errorHanddlingMiddleware(err, req: Request, res: Response, next: NextFunction) {
    //console.log(err);
    if(err.type) {
        return res.status(errorTypeToStatusCode(err.type)).send(err.message);
    }

    if(err.details){
        return res.status(422).send(`${err.message}`);
    }

    res.status(500).send(`${err.message}`);
}

function errorTypeToStatusCode(errorType: string) {
    if (errorType === "conflict") return 409;
    if (errorType === "not_found") return 404;
    if (errorType === "unauthorized") return 401;

    return 400;
}