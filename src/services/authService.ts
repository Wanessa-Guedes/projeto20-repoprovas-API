import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { CreateDataUser } from "../interfaces/createData.js";


dotenv.config;

const hash = 10;

async function signUp(userData: CreateDataUser) {
    
    userData.email = userData.email.toLowerCase()
}