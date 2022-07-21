import { User } from "@prisma/client";
import { prisma } from "../config/database.js";
import { CreateDataUser } from "../interfaces/createData.js";

async function createUser(userData: CreateDataUser ) {
    await prisma.user.create({data: userData})
}

async function checkRegisteredEmails(userData: CreateDataUser) {
    const isEmailRegistered = await prisma.user.findUnique({where: {
        email: userData.email
    }})

    return isEmailRegistered
}

export const authRepository = {
    createUser,
    checkRegisteredEmails
}