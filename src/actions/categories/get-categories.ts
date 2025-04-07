import prisma from "@/lib/prisma";

export const getCategories = async () => { 
    
    const categories = await prisma.categorias.findMany();
    
    return categories;
}