import { prisma } from "../src/config/database.js";
import { CreateDataCategory, CreateDataDiscipline, CreateDataTeacher, CreateDataTeacherDiscipline, CreateDataTerm, CreateDataTest } from "../src/interfaces/createData.js";

async function main() {
    
    const termData: CreateDataTerm[] =  [
        {
            number: 1
        }, 
        {
            number: 2
        }, 
        {
            number: 3
        }, 
        {
            number: 4
        }, 
        {
            number: 5
        }, 
        {
            number: 6
        }
    ];

    const categoriesData: CreateDataCategory[] = [
        {
            name: 'Projeto'
        },
        {
            name: "Prática"
        },
        {
            name: "Recuperação"
        }
    ];

    const teacherData: CreateDataTeacher[] = [
        {
            name: "Diego Pinho"
        },
        {
            name: "Bruna Hamori"
        }
    ];

    const disciplineData: CreateDataDiscipline[] = [
        {
            name: "HTML e CSS",
            termId: 1
        },
        {
            name: "JavaScript",
            termId: 2
        },
        {
            name: "React",
            termId: 3
        },
        {
            name: "Humildade",
            termId: 1
        },
        {
            name: "Planejamento",
            termId: 2
        },
        {
            name: "Autoconfiança",
            termId: 3
        }
];

    const teacherDisciplineData: CreateDataTeacherDiscipline[] =[
        {
            teacherId: 1,
            disciplineId: 1
        },
        {
            teacherId: 1,
            disciplineId: 2
        },
        {
            teacherId: 1,
            disciplineId: 3
        },
        {
            teacherId: 2,
            disciplineId: 4
        },
        {
            teacherId: 2,
            disciplineId: 5
        },
        {
            teacherId: 2,
            disciplineId: 6
        }
]; 

    await prisma.term.createMany({data: termData, skipDuplicates: true});
    await prisma.category.createMany({data: categoriesData, skipDuplicates: true});
    await prisma.teacher.createMany({data: teacherData, skipDuplicates: true});
    await prisma.discipline.createMany({data: disciplineData, skipDuplicates: true});
    await prisma.teacherDiscipline.createMany({data: teacherDisciplineData, skipDuplicates: true});
}

main().catch(e => {
    console.log(e);
    process.exit(1);
}).finally(async () => {
    await prisma.$disconnect();
})