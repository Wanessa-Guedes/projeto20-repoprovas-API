import { User } from "@prisma/client";
import { prisma } from "../config/database.js";
import { CreateDataUser } from "../interfaces/createData.js";

async function createUser(userData: CreateDataUser ) {
    await prisma.user.create({data: userData})
}


export const authRepository = {
    createUser
}