import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { CreateDataUser } from "../interfaces/createData.js";
import { authRepository } from "../repositories/authRepository.js";


dotenv.config;

const hash = 10;

async function signUp(userData: CreateDataUser) {
    
    userData.email = userData.email.toLowerCase();
    const password = userData.password;
    const isEmailRegistered = await authRepository.checkRegisteredEmails(userData);
    if(isEmailRegistered){
        throw {
            type: "conflict",
            message: "Email already registered"
        }
    }

    userData.password = bcrypt.hashSync(password, hash);

    await authRepository.createUser(userData)
}


export const authService = {
    signUp
}