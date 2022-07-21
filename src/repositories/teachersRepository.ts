import { prisma } from "../config/database.js";

async function findTeacherById(teacherId: number){

    const teacher = await prisma.teacher.findUnique({where: {
        id: teacherId
    }})

    return teacher
}


export const teacherRepository = {
    findTeacherById
}