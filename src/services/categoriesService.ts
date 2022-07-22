import { categoryRepository } from "../repositories/categoryRepository.js";


async function getCategories(){
    const categories = await categoryRepository.findCategories();

    return categories
}


export const categoryService = {
    getCategories
}