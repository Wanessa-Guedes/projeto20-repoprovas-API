import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { CreateDataTest, CreateDataUser } from "../interfaces/createData.js";
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

async function signIn(userData: CreateDataUser) {
    
    const user = await authRepository.checkRegisteredEmails(userData);
    if(!user){
        throw {
            type:"not_found",
            message: "User not registered!"
        }
    }

    if(!(bcrypt.compareSync(userData.password, user.password))){
        throw {
            type: "unauthorized",
            message: "Incorrect "
        }
    }

    const secretKey = process.env.JWT_SECRET_KEY;
    const token = jwt.sign({id: user.id, email: user.email}, secretKey);

    return token;
}


export const authService = {
    signUp, 
    signIn
}