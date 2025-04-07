import prisma from "@/lib/prisma";

interface Props {
    category: string;
}

export const getCategoryWithId = async({ category }: Props) => {

    if (!category) return;

    const categoryDb = await prisma.categorias.findUnique({
      where: {
        nombre: category,
      },
    });

    return categoryDb;
}