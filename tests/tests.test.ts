import { prisma } from "../src/config/database.js";
import supertest from "supertest";
import { authFactory } from "./factories/authFactory.js";
import app from "./../src/app.js";
import { testsFactory } from "./factories/testsFactorys.js";


beforeEach(async () => {
    await prisma.$executeRaw`TRUNCATE TABLE users;`;
    await prisma.$executeRaw`TRUNCATE TABLE tests;`;
});

afterEach(async () => {
    await prisma.$executeRaw`DELETE FROM users WHERE email = 'teste@teste.com';`
});

describe("Tests tests", () => {
    
    it("Create Test Success - name, pdfUrl, categoryId, teacherId, disciplineId correct insert", async () => {
        const userData = authFactory.createSignUp();
        const result = await supertest(app).post('/sign-up').send(userData);
        delete userData.passwordConfirmation;
        const responseAuth = await supertest(app).post("/sign-in").send(userData);
        const token = responseAuth.body.token;
        const testsData = testsFactory.createTestData();
        const responseTests = await supertest(app).post("/tests").send(testsData)
                                                    .set("Authorization", `Bearer ${token}`)
        expect(responseTests.status).toBe(201);
        const isTestRegistered = await prisma.test.findFirst({
            where: { name: testsData.name },
        });
        expect(isTestRegistered).not.toBeNull();
    })

    it("Create Test Fail - teacherId dont exist", async () => {
        const userData = authFactory.createSignUp();
        const result = await supertest(app).post('/sign-up').send(userData);
        delete userData.passwordConfirmation;
        const responseAuth = await supertest(app).post("/sign-in").send(userData);
        const token = responseAuth.body.token;
        const testsData = testsFactory.createTestData();
        testsData.teacherId= 3;
        const responseTests = await supertest(app).post("/tests").send(testsData)
                                                    .set("Authorization", `Bearer ${token}`);
        expect(responseTests.status).toBe(404);
        const isTestRegistered = await prisma.test.findFirst({
            where: { name: testsData.name },
        });
        expect(isTestRegistered).toBeNull();
    })

    it("Create Test Fail - categoryId dont exist", async () => {
        const userData = authFactory.createSignUp();
        const result = await supertest(app).post('/sign-up').send(userData);
        delete userData.passwordConfirmation;
        const responseAuth = await supertest(app).post("/sign-in").send(userData);
        const token = responseAuth.body.token;
        const testsData = testsFactory.createTestData();
        testsData.categoryId = 5;
        const responseTests = await supertest(app).post("/tests").send(testsData)
                                                    .set("Authorization", `Bearer ${token}`)
        expect(responseTests.status).toBe(404);
        const isTestRegistered = await prisma.test.findFirst({
            where: { name: testsData.name },
        });
        expect(isTestRegistered).toBeNull();
    })

    it("Create Test Fail - disciplineId dont exist", async () => {
        const userData = authFactory.createSignUp();
        const result = await supertest(app).post('/sign-up').send(userData);
        delete userData.passwordConfirmation;
        const responseAuth = await supertest(app).post("/sign-in").send(userData);
        const token = responseAuth.body.token;
        const testsData = testsFactory.createTestData();
        testsData.disciplineId = 7;
        const responseTests = await supertest(app).post("/tests").send(testsData)
                                                    .set("Authorization", `Bearer ${token}`)
        expect(responseTests.status).toBe(404);
        const isTestRegistered = await prisma.test.findFirst({
            where: { name: testsData.name },
        });
        expect(isTestRegistered).toBeNull();
    })

    it("Create Test Fail - disciplineId and teacherId dont match", async () => {
        const userData = authFactory.createSignUp();
        const result = await supertest(app).post('/sign-up').send(userData);
        delete userData.passwordConfirmation;
        const responseAuth = await supertest(app).post("/sign-in").send(userData);
        const token = responseAuth.body.token;
        const testsData = testsFactory.createTestData();
        testsData.disciplineId = 1;
        testsData.teacherId = 2;
        const responseTests = await supertest(app).post("/tests").send(testsData)
                                                    .set("Authorization", `Bearer ${token}`)
        expect(responseTests.status).toBe(404);
        const isTestRegistered = await prisma.test.findFirst({
            where: { name: testsData.name },
        });
        expect(isTestRegistered).toBeNull();
    })

    it("Create Test Fail - correct data but token not set", async () => {
        const userData = authFactory.createSignUp();
        const result = await supertest(app).post('/sign-up').send(userData);
        delete userData.passwordConfirmation;
        const responseAuth = await supertest(app).post("/sign-in").send(userData);
        const token = responseAuth.body.token;
        const testsData = testsFactory.createTestData();
        const responseTests = await supertest(app).post("/tests").send(testsData)
        expect(responseTests.status).toBe(401);
        const isTestRegistered = await prisma.test.findFirst({
            where: { name: testsData.name },
        });
        expect(isTestRegistered).toBeNull();
    })

    it("get tests by discipline - success", async () => {
        const userData = authFactory.createSignUp();
        const result = await supertest(app).post('/sign-up').send(userData);
        delete userData.passwordConfirmation;
        const responseAuth = await supertest(app).post("/sign-in").send(userData);
        const token = responseAuth.body.token;
        const testsData = testsFactory.createTestData();
        const responseTests = await supertest(app).get("/tests?groupBy=disciplines").send(testsData).set("Authorization", `Bearer ${token}`)
        expect(responseTests).not.toBeNull();
        expect(responseTests.status).toBe(200);
    })

    it("get tests by discipline - FAIL - Miss Token", async () => {
        const userData = authFactory.createSignUp();
        const result = await supertest(app).post('/sign-up').send(userData);
        delete userData.passwordConfirmation;
        const responseAuth = await supertest(app).post("/sign-in").send(userData);
        const token = responseAuth.body.token;
        const testsData = testsFactory.createTestData();
        const responseTests = await supertest(app).get("/tests?groupBy=disciplines").send(testsData)
        expect(responseTests.status).toBe(401);
    })
    
    it("get tests by instructor - success", async () => {
        const userData = authFactory.createSignUp();
        const result = await supertest(app).post('/sign-up').send(userData);
        delete userData.passwordConfirmation;
        const responseAuth = await supertest(app).post("/sign-in").send(userData);
        const token = responseAuth.body.token;
        const testsData = testsFactory.createTestData();
        const responseTests = await supertest(app).get("/tests?groupBy=teachers").send(testsData).set("Authorization", `Bearer ${token}`)
        expect(responseTests).not.toBeNull();
        expect(responseTests.status).toBe(200);
    })

    it("get tests by instructor - FAIL - Miss Token", async () => {
        const userData = authFactory.createSignUp();
        const result = await supertest(app).post('/sign-up').send(userData);
        delete userData.passwordConfirmation;
        const responseAuth = await supertest(app).post("/sign-in").send(userData);
        const token = responseAuth.body.token;
        const testsData = testsFactory.createTestData();
        const responseTests = await supertest(app).get("/tests?groupBy=teachers").send(testsData)
        expect(responseTests.status).toBe(401);
    })

    it("get categories - success", async () => {
        const userData = authFactory.createSignUp();
        const result = await supertest(app).post('/sign-up').send(userData);
        delete userData.passwordConfirmation;
        const responseAuth = await supertest(app).post("/sign-in").send(userData);
        const token = responseAuth.body.token;
        const testsData = testsFactory.createTestData();
        const responseTests = await supertest(app).get("/categories").send(testsData).set("Authorization", `Bearer ${token}`)
        expect(responseTests).not.toBeNull();
        expect(responseTests.status).toBe(200);
    })

    it("get categories - FAIL - Miss Token", async () => {
        const userData = authFactory.createSignUp();
        const result = await supertest(app).post('/sign-up').send(userData);
        delete userData.passwordConfirmation;
        const responseAuth = await supertest(app).post("/sign-in").send(userData);
        const token = responseAuth.body.token;
        const testsData = testsFactory.createTestData();
        const responseTests = await supertest(app).get("/categories").send(testsData)
        expect(responseTests.status).toBe(401);
    })

    it("get all tests - success", async () => {
        const userData = authFactory.createSignUp();
        const result = await supertest(app).post('/sign-up').send(userData);
        delete userData.passwordConfirmation;
        const responseAuth = await supertest(app).post("/sign-in").send(userData);
        const token = responseAuth.body.token;
        const testsData = testsFactory.createTestData();
        const responseTests = await supertest(app).get("/tests").send(testsData).set("Authorization", `Bearer ${token}`)
        expect(responseTests).not.toBeNull();
        expect(responseTests.status).toBe(200);
    })

    it("get all tests - FAIL - Miss Token", async () => {
        const userData = authFactory.createSignUp();
        const result = await supertest(app).post('/sign-up').send(userData);
        delete userData.passwordConfirmation;
        const responseAuth = await supertest(app).post("/sign-in").send(userData);
        const token = responseAuth.body.token;
        const testsData = testsFactory.createTestData();
        const responseTests = await supertest(app).get("/tests").send(testsData)
        expect(responseTests.status).toBe(401);
    })
})

afterAll(async () => {
    await prisma.$executeRaw`TRUNCATE TABLE tests;`;
    await prisma.$executeRaw`TRUNCATE TABLE users;`;
    await prisma.$disconnect();
});