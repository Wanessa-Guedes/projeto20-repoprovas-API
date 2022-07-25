import { prisma } from "../src/config/database.js";
import supertest from "supertest";
import { authFactory } from "./factories/authFactory.js";
import app from "./../src/app.js";

beforeEach(async () => {
    await prisma.$executeRaw`TRUNCATE TABLE users;`;
})

describe("Auth tests", () => {
    
    it("Create User Success - Email, Password and CofirmPassword", async () => {
        const userData = authFactory.createSignUp();
        const response = await supertest(app).post('/sign-up').send(userData);
        expect(response.status).toBe(201);
    })

    it("Create User Fail - ConfirmPassword different from Password", async() => {
        const userData = authFactory.createSignUp();
        userData.passwordConfirmation = 'senhaerrada';
        const response = await supertest(app).post('/sign-up').send(userData);
        expect(response.status).toBe(422);
    })

    it("Create User Fail - Email already registered", async() => {
        const userData = authFactory.createSignUp();
        const result = await supertest(app).post('/sign-up').send(userData);
        const response = await supertest(app).post('/sign-up').send(userData);
        expect(response.status).toBe(409);
    }) 

    it("Sign In success - given an email and password registered", async () => {
        const userData = authFactory.createSignUp();
        const result = await supertest(app).post('/sign-up').send(userData);
        delete userData.passwordConfirmation;
        const response = await supertest(app).post("/sign-in").send(userData);
        const token = response.body.token;
        expect(token).not.toBeNull();
        expect(response.status).toBe(200);
    })

    it("Sign In fail - Email registered but wrong password", async () => {
        const userData = authFactory.createSignUp();
        const result = await supertest(app).post('/sign-up').send(userData);
        delete userData.passwordConfirmation;
        const userWrongPassword = {...userData, password: 'senhaIncorretaa'};
        const response = await supertest(app).post("/sign-in").send(userWrongPassword);
        expect(response.status).toBe(401);
    })

    it("Sign In fail - Email not registered", async () => {
        const userData = authFactory.createSignUp();
        const result = await supertest(app).post('/sign-up').send(userData);
        delete userData.passwordConfirmation;
        userData.email = 'incorreto@incorreto.com';
        const response = await supertest(app).post("/sign-in").send(userData);
        expect(response.status).toBe(404);
    })
})

afterAll(async () => {
    await prisma.$disconnect();
});