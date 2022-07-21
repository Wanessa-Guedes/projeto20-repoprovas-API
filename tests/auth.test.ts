import { prisma } from "../src/config/database.js";
import supertest from "supertest";
import { authFactory } from "./factories/authFactory.js";
import app from "./../src/app.js";

beforeEach(async () => {
    await prisma.$executeRaw`TRUNCATE TABLE users`;
    await prisma.$executeRaw`DELETE FROM users WHERE email='teste@gmail.com'`
});

describe("Auth tests", () => {
    it("Create User Success - Email, Password and CofirmPassword", async () => {
        const userData = authFactory.createSignUp();
        const response = await supertest(app).post('/signup').send(userData);
        expect(response.statusCode).toBe(201);
    })

    it("Create User Fail - ConfirmPassword different from Password", async() => {
        const userData = authFactory.createSignUp();
        userData.confirmPassword = 'senhaerrada';
        const response = await supertest(app).post('/signup').send(userData);
        expect(response.statusCode).toBe(422);
    })

    it("Create User Fail - Email already registered", async() => {
        const userData = authFactory.createSignUp();
        await authFactory.createUser(userData);
        const userDataSameEmail = authFactory.createSignUp();
        const response = await supertest(app).post('/signup').send(userDataSameEmail);
        expect(response.statusCode).toBe(409);
    })

    it("Sign In success - given an email and password registered", async () => {
        const userData = authFactory.createSignUp();
        await authFactory.createUser(userData);
        delete userData.confirmPassword;
        const response = await supertest(app).post("/signin").send(userData);
        const token = response.body.token;
        expect(token).not.toBeNull();
        expect(response.statusCode).toBe(200);
    })

    it("Sign In fail - Email registered but wrong password", async () => {
        const userData = authFactory.createSignUp();
        await authFactory.createUser(userData);
        delete userData.confirmPassword;
        userData.password = 'senhaincorreta';
        const response = await supertest(app).post("/signin").send(userData);
        expect(response.statusCode).toBe(401);
    })

    it("Sign In fail - Email not registered", async () => {
        const userData = authFactory.createSignUp();
        await authFactory.createUser(userData);
        delete userData.confirmPassword;
        userData.email = 'incorreto@incorreto.com';
        const response = await supertest(app).post("/signin").send(userData);
        expect(response.statusCode).toBe(404);
    })
})

afterAll(async () => {
    await prisma.$disconnect();
});