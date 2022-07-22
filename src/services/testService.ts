import { CreateDataTest } from "../interfaces/createData.js"
import { categoryRepository } from "../repositories/categoryRepository.js";
import { disciplinesRepository } from "../repositories/disciplinesRepository.js";
import { teacherRepository } from "../repositories/teachersRepository.js"
import { testsRepository } from "../repositories/testsRepository.js"


async function createTest(testInfo: CreateDataTest){

    const {name, pdfUrl, categoryId, disciplineId, teacherId}: CreateDataTest = testInfo;

    const teacher = await teacherRepository.findTeacherById(teacherId);
    if(!teacher){
        throw{
            type: "not_found",
            message: "Teacher not registered"
        }
    }

    const discipline = await disciplinesRepository.findDisciplineById(disciplineId);
    if(!discipline){
        throw {
            type: "not_found",
            message: "Discipline not registered"
        }
    }

    const category = await categoryRepository.findCategoryById(categoryId);
    if(!category){
        throw {
            type: "not_found", 
            message: "Category not registered"
        }
    }

    await testsRepository.creatTestData(testInfo)

}

async function getTestByDiscipline(){

}

export const testService = {
    createTest,
    getTestByDiscipline
}