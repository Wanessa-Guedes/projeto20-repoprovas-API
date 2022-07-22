import { prisma } from "../config/database.js";

async function findCategoryById(categoryId: number) {
    const category = await prisma.category.findUnique({where: {
        id: categoryId
    }})

    return category
}

async function findCategories() {
    const categories = await prisma.category.findMany();

    return categories
}

export const categoryRepository = {
    findCategoryById,
    findCategories
}