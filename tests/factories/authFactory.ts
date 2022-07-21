import bcrypt from "bcrypt";
import { faker } from "@faker-js/faker";

import {prisma} from "../../src/config/database.js";
import { CreateDataUser } from "../../src/interfaces/createData.js";

function createSignUp(email = "teste@gmail.com"){
    let password = faker.internet.password(10);
    return {
        email,
        password: password,
        confirmPassword: password
    }
}

async function createUser(userData: CreateDataUser) {
    const user = await prisma.user.create({data: {
        email: userData.email,
        password: bcrypt.hashSync(userData.password, 10)
    }})

    return user
}

export const authFactory = {
    createSignUp,
    createUser
}