import { prisma } from "../config/database.js";
import { CreateDataTest } from "../interfaces/createData.js";

async function creatTestData(testData: CreateDataTest) {
    const {name, pdfUrl, categoryId, disciplineId, teacherId}: CreateDataTest = testData;

    const teacherAndDiscipline = await findTeacherAndDiscipline(testData);

    await prisma.test.create({data: {
        name,
        pdfUrl,
        categoryId,
        teacherDisciplineId: teacherAndDiscipline
    }})


}

async function findTeacherAndDiscipline(testData: CreateDataTest) {
    const {name, pdfUrl, categoryId, disciplineId, teacherId}: CreateDataTest = testData;
    
    const teacherAndDiscipline = await prisma.teacherDiscipline.findFirst({where: {
        disciplineId,
        teacherId
    }})

    if(!teacherAndDiscipline){
        throw {
            type: "not_found",
            message: "This discipline and teacher do not match"
        }
    }

    return teacherAndDiscipline.id
    
}


export const testsRepository = {
    creatTestData
}