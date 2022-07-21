import { prisma } from "../config/database.js";

async function findCategoryById(categoryId: number) {
    const category = await prisma.category.findUnique({where: {
        id: categoryId
    }})

    return category
}

export const categoryRepository = {
    findCategoryById
}