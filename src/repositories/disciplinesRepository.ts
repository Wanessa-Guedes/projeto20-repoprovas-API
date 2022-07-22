import { prisma } from "../config/database.js";

async function findDisciplineById(disciplineId: number){
    const discipline = await prisma.discipline.findUnique({where:{
        id: disciplineId
    }})

    return discipline
}

/* async function separeteTestByTerm(){
    const tests = await prisma.term.findMany({
        include: {
            disciplines: {
                include: {
                    teacherDiscipline: {
                        include: {
                            tests: {
                                
                            }
                        }
                    }
                }
            }
        }
    })
} */

export const disciplinesRepository = {
    findDisciplineById
}