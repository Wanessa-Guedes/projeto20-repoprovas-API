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

async function getTestByDiscipline(){

    const tests = await prisma.term.findMany({
            include: {
                disciplines: {
                    include: {
                        teacherDisciplines: {
                            include: {
                                teacher: true,
                                tests: {
                                    include: {
                                        category: true
                                    }
                                }
                            }
                        }
                    }
                }
            }
        })
    
        return tests
    }

async function getTestByInstructor() {
    const tests = await prisma.teacherDiscipline.findMany({
        include: {
            teacher: true,
            discipline: true,
            tests: {
                include: {
                    category: true
                }
            }
        }
    })

    return tests
}

async function  getAllTests() {
    const tests = await prisma.test.findMany({
        include: {
            teacherDiscipline: {
                include: {
                    teacher: true,
                    discipline: {
                        include: {
                            terms: {}
                        }
                    }
                }
            },
            category: true
        }
    })

    return tests
    
}


export const testsRepository = {
    creatTestData,
    getTestByDiscipline,
    getTestByInstructor,
    getAllTests
}