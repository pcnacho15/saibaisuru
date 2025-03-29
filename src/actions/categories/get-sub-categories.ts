import prisma from "@/lib/prisma"


export const getSubCategories = async() => {
    const subCategories = await prisma.sub_cagegorias.findMany();


    return subCategories;
}