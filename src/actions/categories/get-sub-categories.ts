import prisma from "@/lib/prisma"


export const getSubCategories = async() => {
    const subCategories = await prisma.sub_cagegorias.findMany({
        include: {
            categoria: {
                select: {
                    nombre: true
                }
            }
        }
    });

    return subCategories;
}

export const getSubCategoryWithId = async({ id }: { id: string }) => {
    const subCategory = await prisma.sub_cagegorias.findUnique({
        where: {
            id: id
        },
        include: {
            categoria: {
                select: {
                    nombre: true
                }
            }
        }
    });

    return subCategory;
}