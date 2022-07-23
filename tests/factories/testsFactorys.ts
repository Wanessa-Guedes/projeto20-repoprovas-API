import bcrypt from "bcrypt";
import { faker } from "@faker-js/faker";

import {prisma} from "../../src/config/database.js";

function createTestData () {

    return {
        name: faker.commerce.department(),
        pdfUrl:  `http://www.${faker.internet.domainName()}`,
        categoryId: 1,
        teacherId:  2,
        disciplineId: 4 
    }
}

export const testsFactory = {
    createTestData
}