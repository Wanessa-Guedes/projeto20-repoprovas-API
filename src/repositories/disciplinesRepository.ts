import { prisma } from "../config/database.js";

async function findDisciplineById(disciplineId: number){
    const discipline = await prisma.discipline.findUnique({where:{
        id: disciplineId
    }})

    return discipline
}



export const disciplinesRepository = {
    findDisciplineById
}